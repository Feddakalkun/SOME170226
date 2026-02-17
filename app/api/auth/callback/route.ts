import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    if (error) return NextResponse.redirect(new URL('/?error=' + error, request.url));

    const storedState = request.cookies.get('oauth_state')?.value;
    if (!state || !storedState || state !== storedState) {
        return NextResponse.redirect(new URL('/?error=invalid_state', request.url));
    }

    const codeVerifier = request.cookies.get('oauth_code_verifier')?.value;
    if (!codeVerifier) {
        return NextResponse.redirect(new URL('/?error=missing_verifier', request.url));
    }

    try {
        const credentials = Buffer.from(
            `${process.env.OAUTH_CLIENT_ID}:${process.env.OAUTH_CLIENT_SECRET}`
        ).toString('base64');

        const tokenResponse = await fetch(
            `${process.env.OAUTH_ISSUER_BASE_URL}/oauth2/token`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${credentials}`,
                },
                body: new URLSearchParams({
                    grant_type: 'authorization_code',
                    code: code!,
                    redirect_uri: process.env.OAUTH_REDIRECT_URI!,
                    code_verifier: codeVerifier,
                }),
            }
        );

        if (!tokenResponse.ok) return NextResponse.redirect(new URL('/?error=token_failed', request.url));

        const tokens = await tokenResponse.json();
        const response = NextResponse.redirect(new URL('/?connection=success', request.url));

        response.cookies.delete('oauth_code_verifier');
        response.cookies.delete('oauth_state');

        response.cookies.set('fanvue_access_token', tokens.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: tokens.expires_in || 3600,
            path: '/',
        });

        return response;
    } catch (error) {
        return NextResponse.redirect(new URL('/?error=server_error', request.url));
    }
}
