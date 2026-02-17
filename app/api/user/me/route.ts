import { NextRequest, NextResponse } from 'next/server';
import { FanvueClient } from '@/lib/fanvue';

export async function GET(request: NextRequest) {
    const accessToken = request.cookies.get('fanvue_access_token')?.value;
    if (!accessToken) {
        return NextResponse.json({ success: false, error: 'Not connected' }, { status: 401 });
    }

    try {
        const fanvue = new FanvueClient(accessToken);
        const user = await fanvue.getCurrentUser();
        return NextResponse.json({ success: true, user });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
