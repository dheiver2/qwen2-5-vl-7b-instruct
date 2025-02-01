'use client';

import { Message } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = async (text: string, messageId: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(messageId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-4 px-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            "flex animate-fade-in",
            message.role === 'user' ? 'justify-end' : 'justify-start'
          )}
        >
          <div
            className={cn(
              "max-w-[80%] rounded-lg p-4 shadow-sm",
              message.role === 'user'
                ? 'bg-primary text-white'
                : 'bg-white'
            )}
          >
            {message.action && (
              <div className="text-xs opacity-75 mb-1">
                {message.action.replace('_', ' ')}
              </div>
            )}
            <div className="relative group">
              <div className="whitespace-pre-wrap">{message.content}</div>
              <button
                onClick={() => copyToClipboard(message.content, message.id)}
                className={cn(
                  "absolute -right-8 top-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity",
                  message.role === 'user' ? 'text-white' : 'text-gray-500'
                )}
              >
                {copiedId === message.id ? (
                  <Check size={16} />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            </div>
            
            {message.images?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="Content"
                className="mt-2 rounded-lg max-w-full"
                loading="lazy"
              />
            ))}
            
            {message.code && (
              <pre className="mt-2">
                <code>{message.code}</code>
              </pre>
            )}
            
            {message.videos?.map((video, idx) => (
              <video
                key={idx}
                src={video}
                controls
                className="mt-2 rounded-lg max-w-full"
              />
            ))}
            
            <div className="text-xs mt-2 opacity-75">
              {message.timestamp.toLocaleTimeString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}