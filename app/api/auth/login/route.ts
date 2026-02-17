import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(request: NextRequest) {
    const state = crypto.randomBytes(32).toString('hex');
    const codeVerifier = crypto.randomBytes(32).toString('hex');
    const codeChallenge = crypto
        .createHash('sha256')
        .update(codeVerifier)
        .digest('base64url');

    const params = new URLSearchParams({
        response_type: 'code',
        client_id: process.env.OAUTH_CLIENT_ID!,
        redirect_uri: process.env.OAUTH_REDIRECT_URI!,
        scope: 'openid profile offline_access posts:create media:upload',
        state,
        code_challenge: codeChallenge,
        code_challenge_method: 'S256',
    });

    const authUrl = `${process.env.OAUTH_ISSUER_BASE_URL}/oauth2/auth?${params.toString()}`;
    const response = NextResponse.redirect(authUrl);

    response.cookies.set('oauth_state', state, { httpOnly: true, maxAge: 3600 });
    response.cookies.set('oauth_code_verifier', codeVerifier, { httpOnly: true, maxAge: 3600 });

    return response;
}
