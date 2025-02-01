import { useState, useCallback } from 'react';
import { QwenAction, Message } from '@/lib/types';
import { qwenService } from '@/lib/qwen-service';

interface UseChatOptions {
  onError?: (error: Error) => void;
}

export function useChat(options: UseChatOptions = {}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (
    text: string,
    action: QwenAction = 'more',
    files?: File[]
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: text,
        action,
        timestamp: new Date()
      };

      if (files?.length) {
        const uploadedUrls = await Promise.all(
          files.map(file => qwenService.uploadFile(file))
        );
        userMessage.images = uploadedUrls;
      }

      setMessages(prev => [...prev, userMessage]);

      // Get response from Qwen
      const response = await qwenService.sendMessage({
        text,
        action,
        files
      });

      // Add assistant message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text,
        images: response.images,
        videos: response.videos,
        code: response.code,
        artifacts: response.artifacts,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      return assistantMessage;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      options.onError?.(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [options]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat
  };
}