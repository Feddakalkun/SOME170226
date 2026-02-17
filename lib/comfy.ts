import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const COMFYUI_URL = process.env.COMFYUI_SERVER_ADDRESS || '127.0.0.1:8188';

export class ComfyClient {
    private server: string;

    constructor() {
        this.server = COMFYUI_URL;
    }

    async queuePrompt(workflow: any) {
        const clientId = uuidv4();
        const response = await axios.post(`http://${this.server}/prompt`, {
            prompt: workflow,
            client_id: clientId,
        });
        return { promptId: response.data.prompt_id, clientId };
    }

    async getHistory(promptId: string) {
        const response = await axios.get(`http://${this.server}/history/${promptId}`);
        return response.data[promptId];
    }

    async getImages(promptId: string) {
        let history = await this.getHistory(promptId);
        let attempts = 0;
        while (!history && attempts < 60) {
            await new Promise(r => setTimeout(r, 1000));
            history = await this.getHistory(promptId);
            attempts++;
        }
        if (!history) throw new Error('Generation timeout');
        const outputs = history.outputs;
        const resultImages: string[] = [];
        for (const nodeId in outputs) {
            const nodeOutput = outputs[nodeId];
            if (nodeOutput.images) {
                for (const img of nodeOutput.images) {
                    resultImages.push(img.filename);
                }
            }
        }
        return resultImages;
    }
}
