import { QwenRequest, QwenResponse, QwenAction } from 'lib/types';

const API_URL = "https://stzhao-qwen2-5-vl-7b-instruct.hf.space";
const API_TIMEOUT = 30000;

class QwenService {
  private async fetchWithTimeout(
    resource: RequestInfo,
    options: RequestInit & { timeout?: number } = {}
  ): Promise<Response> {
    const { timeout = API_TIMEOUT } = options;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(resource, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(id);
      return response;
    } catch (error) {
      clearTimeout(id);
      throw error;
    }
  }

  private getPromptForAction(action: QwenAction, text: string): string {
    const prompts: Record<QwenAction, string> = {
      web_search: "Search the web for information about: ",
      image_generation: "Generate a detailed image of: ",
      video_generation: "Create a video that shows: ",
      artifacts: "Create artifacts related to: ",
      create_image: "Generate an artistic image of: ",
      code: "Write code for the following task: ",
      plan: "Create a detailed plan for: ",
      news: "Find recent news about: ",
      more: "",
      voice: "Transcribe and process this voice input: ",
      help: ""
    };

    return prompts[action] + text;
  }

  public async sendRequest(request: QwenRequest): Promise<QwenResponse> {
    try {
      const prompt = this.getPromptForAction(request.action, request.text);
      
      // For development/testing purposes, simulate API response
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate different responses based on action
      const response: QwenResponse = {
        text: `Processed "${prompt}"\n\nHere's what I found...`,
        images: request.action.includes('image') ? ['https://picsum.photos/400/300'] : undefined,
        videos: request.action.includes('video') ? ['https://example.com/video.mp4'] : undefined,
        code: request.action === 'code' ? 'console.log("Example code");' : undefined,
        artifacts: request.action === 'artifacts' ? [
          { type: 'document', url: 'https://example.com/doc.pdf' }
        ] : undefined
      };

      return response;

      // Real API implementation would be:
      /*
      const response = await this.fetchWithTimeout(`${API_URL}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: prompt }],
          files: request.files
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      return await response.json();
      */
    } catch (error) {
      console.error('Error in QwenService:', error);
      throw new Error(error instanceof Error ? error.message : 'An error occurred');
    }
  }

  public async uploadFile(file: File): Promise<string> {
    // For development/testing purposes
    return URL.createObjectURL(file);
    
    // Real implementation would be:
    /*
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.fetchWithTimeout(`${API_URL}/v1/upload`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to upload file');
    }

    const data = await response.json();
    return data.url;
    */
  }
}

export const qwenService = new QwenService();