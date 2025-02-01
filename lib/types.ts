import { z } from 'zod';

export const ActionSchema = z.enum([
  'web_search',
  'image_generation',
  'video_generation',
  'artifacts',
  'create_image',
  'code',
  'plan',
  'news',
  'more',
  'voice',
  'help'
]);

export type QwenAction = z.infer<typeof ActionSchema>;

export const MessageSchema = z.object({
  id: z.string(),
  role: z.enum(['user', 'assistant']),
  content: z.string(),
  images: z.array(z.string()).optional(),
  videos: z.array(z.string()).optional(),
  code: z.string().optional(),
  artifacts: z.array(z.any()).optional(),
  action: ActionSchema.optional(),
  timestamp: z.date()
});

export type Message = z.infer<typeof MessageSchema>;

export interface QwenRequest {
  text: string;
  action: QwenAction;
  files?: File[];
}

export interface QwenResponse {
  text: string;
  images?: string[];
  videos?: string[];
  code?: string;
  artifacts?: any[];
}