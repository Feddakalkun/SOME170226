import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    // Check for OAuth errors
    if (error) {
        console.error('OAuth error:', error, searchParams.get('error_description'));
        return NextResponse.redirect(new URL('/?error=' + error, request.url));
    }

    // Validate state
    const storedState = request.cookies.get('oauth_state')?.value;
    if (!state || !storedState || state !== storedState) {
        console.error('State mismatch');
        return NextResponse.redirect(new URL('/?error=invalid_state', request.url));
    }

    // Get code_verifier from cookie
    const codeVerifier = request.cookies.get('oauth_code_verifier')?.value;
    if (!codeVerifier) {
        console.error('Code verifier not found');
        return NextResponse.redirect(new URL('/?error=missing_verifier', request.url));
    }

    if (!code) {
        console.error('No authorization code');
        return NextResponse.redirect(new URL('/?error=no_code', request.url));
    }

    try {
        // Fanvue requires client_secret_basic (Authorization header)
        const credentials = Buffer.from(
            `${process.env.OAUTH_CLIENT_ID}:${process.env.OAUTH_CLIENT_SECRET}`
        ).toString('base64');

        const tokenResponse = await fetch(
            `${process.env.OAUTH_ISSUER_BASE_URL || 'https://auth.fanvue.com'}/oauth2/token`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${credentials}`,
                },
                body: new URLSearchParams({
                    grant_type: 'authorization_code',
                    code,
                    redirect_uri: process.env.OAUTH_REDIRECT_URI || 'http://localhost:3000/api/auth/callback',
                    code_verifier: codeVerifier,
                }),
            }
        );

        if (!tokenResponse.ok) {
            const errorData = await tokenResponse.text();
            console.error('Token exchange failed:', tokenResponse.status, errorData);
            return NextResponse.redirect(new URL('/?error=token_failed', request.url));
        }

        const tokens = await tokenResponse.json();
        console.log('✅ Fanvue OAuth Success!');

        const response = NextResponse.redirect(new URL('/?connected=true', request.url));

        // Clear OAuth cookies
        response.cookies.delete('oauth_code_verifier');
        response.cookies.delete('oauth_state');

        // Store access token
        response.cookies.set('fanvue_access_token', tokens.access_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: tokens.expires_in || 3600,
            path: '/',
        });

        if (tokens.refresh_token) {
            response.cookies.set('fanvue_refresh_token', tokens.refresh_token, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 30,
                path: '/',
            });
        }

        return response;
    } catch (error: any) {
        console.error('OAuth callback error:', error.message);
        return NextResponse.redirect(new URL('/?error=server_error', request.url));
    }
}
