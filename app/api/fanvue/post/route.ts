import { NextRequest, NextResponse } from 'next/server';
import { FanvueClient } from '@/lib/fanvue';

export async function POST(request: NextRequest) {
    const accessToken = request.cookies.get('fanvue_access_token')?.value;
    if (!accessToken) {
        return NextResponse.json({ success: false, error: 'Not connected' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { content, imageUrl, price, isSubscriberOnly } = body;

        const fanvue = new FanvueClient(accessToken);
        const response = await fetch(imageUrl);
        const buffer = Buffer.from(await response.arrayBuffer());

        const { uuid } = await fanvue.uploadMedia(buffer, 'generation.png');

        const post = await fanvue.createPost({
            content,
            mediaIds: [uuid],
            price,
            isSubscriberOnly
        });

        return NextResponse.json({ success: true, post });
    } catch (error: any) {
        console.error('Post failed:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
