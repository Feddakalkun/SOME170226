import axios, { AxiosInstance } from 'axios';

export class FanvueClient {
    private client: AxiosInstance;
    private accessToken: string;

    constructor(accessToken: string) {
        this.accessToken = accessToken;
        const baseURL = 'https://api.fanvue.com';

        this.client = axios.create({
            baseURL,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'X-Fanvue-API-Version': '2025-06-26',
            },
        });
    }

    async getCurrentUser() {
        const response = await this.client.get('/users/me');
        return response.data;
    }

    async createPost(data: {
        content: string;
        mediaIds?: string[];
        scheduledFor?: Date;
        price?: number;
        isSubscriberOnly?: boolean;
    }) {
        const requestBody: any = {
            text: data.content,
            mediaUuids: data.mediaIds,
            audience: data.isSubscriberOnly ? 'subscribers' : 'followers-and-subscribers',
        };

        if (data.price !== undefined && data.price > 0) {
            requestBody.price = data.price * 100;
        }

        if (data.scheduledFor) {
            requestBody.scheduledAt = data.scheduledFor.toISOString();
        }

        const response = await this.client.post('/posts', requestBody);
        return response.data;
    }

    async uploadMedia(file: Buffer, filename: string): Promise<{ uuid: string }> {
        const sanitizedFilename = filename.split(/[/\\]/).pop()?.substring(0, 255) || 'image.png';

        try {
            const sessionRes = await this.client.post('/media/uploads', {
                name: sanitizedFilename.replace(/\.[^.]+$/, ''),
                filename: sanitizedFilename,
                mediaType: 'image',
            });

            const { mediaUuid, uploadId } = sessionRes.data;
            const urlRes = await this.client.get(`/media/uploads/${uploadId}/parts/1/url`);
            const uploadUrl = urlRes.data;

            const uploadRes = await axios.put(uploadUrl, file, {
                headers: { 'Content-Type': 'application/octet-stream' },
            });

            const etag = uploadRes.headers['etag'];

            await this.client.patch(`/media/uploads/${uploadId}`, {
                parts: [{ ETag: etag, PartNumber: 1 }]
            });

            return { uuid: mediaUuid };
        } catch (error: any) {
            console.error('Upload failed:', error.response?.data || error.message);
            throw error;
        }
    }
}
