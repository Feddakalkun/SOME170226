import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
    try {
        const { clientId, clientSecret } = await request.json();

        if (!clientId || !clientSecret) {
            return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
        }

        // Write credentials to .env file
        const envPath = path.join(process.cwd(), '.env');
        let envContent = '';

        if (fs.existsSync(envPath)) {
            envContent = fs.readFileSync(envPath, 'utf-8');
        }

        // Update or add OAUTH_CLIENT_ID
        if (envContent.includes('OAUTH_CLIENT_ID=')) {
            envContent = envContent.replace(/OAUTH_CLIENT_ID=.*/, `OAUTH_CLIENT_ID=${clientId}`);
        } else {
            envContent += `\nOAUTH_CLIENT_ID=${clientId}`;
        }

        // Update or add OAUTH_CLIENT_SECRET
        if (envContent.includes('OAUTH_CLIENT_SECRET=')) {
            envContent = envContent.replace(/OAUTH_CLIENT_SECRET=.*/, `OAUTH_CLIENT_SECRET=${clientSecret}`);
        } else {
            envContent += `\nOAUTH_CLIENT_SECRET=${clientSecret}`;
        }

        // Ensure redirect URI and issuer are set
        if (!envContent.includes('OAUTH_REDIRECT_URI=')) {
            envContent += `\nOAUTH_REDIRECT_URI=http://localhost:3000/api/auth/callback`;
        }
        if (!envContent.includes('OAUTH_ISSUER_BASE_URL=')) {
            envContent += `\nOAUTH_ISSUER_BASE_URL=https://auth.fanvue.com`;
        }

        fs.writeFileSync(envPath, envContent.trim() + '\n');

        // Also set in process.env so the current session picks it up
        process.env.OAUTH_CLIENT_ID = clientId;
        process.env.OAUTH_CLIENT_SECRET = clientSecret;

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
