import { NextRequest, NextResponse } from 'next/server';
import { generateCodeVerifier, generateCodeChallenge, generateState } from '@/lib/oauth-helpers';

export async function GET(request: NextRequest) {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = generateCodeChallenge(codeVerifier);
    const state = generateState();

    const issuerBaseUrl = process.env.OAUTH_ISSUER_BASE_URL || 'https://auth.fanvue.com';
    const authUrl = new URL(`${issuerBaseUrl}/oauth2/auth`);
    authUrl.searchParams.set('client_id', process.env.OAUTH_CLIENT_ID || '');
    authUrl.searchParams.set('redirect_uri', process.env.OAUTH_REDIRECT_URI || 'http://localhost:3000/api/auth/callback');
    authUrl.searchParams.set('response_type', 'code');
    // Fanvue's own scopes (from their OAuth settings page)
    authUrl.searchParams.set('scope', 'read:self read:chat read:media read:post write:chat write:media write:post');
    authUrl.searchParams.set('state', state);
    authUrl.searchParams.set('code_challenge', codeChallenge);
    authUrl.searchParams.set('code_challenge_method', 'S256');

    console.log('OAuth → Redirecting to:', authUrl.toString());

    const response = NextResponse.redirect(authUrl.toString());

    response.cookies.set('oauth_code_verifier', codeVerifier, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 600,
        path: '/',
    });

    response.cookies.set('oauth_state', state, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 600,
        path: '/',
    });

    return response;
}
