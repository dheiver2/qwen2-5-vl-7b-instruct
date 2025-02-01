import { client } from '@gradio/client';

interface MessageRequest {
  text: string;
  files?: File[];
}

export async function createQwenClient() {
  try {
    const gradioClient = await client("stzhao/Qwen2.5-VL-7B-Instruct");
    return gradioClient;
  } catch (error) {
    console.error("Error creating Qwen client:", error);
    throw error;
  }
}

export async function sendMessage({ text, files = [] }: MessageRequest): Promise<any> {
  try {
    const gradioClient = await createQwenClient();
    const result = await gradioClient.predict(
      {
        text,
        files
      },
      "/chat"
    );
    return result;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
}