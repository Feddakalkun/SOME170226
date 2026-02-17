import { NextRequest, NextResponse } from 'next/server';
import { ComfyClient } from '@/lib/comfy';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { workflow } = body;

        const comfy = new ComfyClient();
        const { promptId } = await comfy.queuePrompt(workflow);
        const images = await comfy.getImages(promptId);

        return NextResponse.json({
            success: true,
            images: images.map(id => `/comfyui-output/${id}`)
        });
    } catch (error: any) {
        console.error('Generation failed:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
