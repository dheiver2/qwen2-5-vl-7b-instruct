'use client';

import { QwenAction } from '@/lib/types';
import {
  ImageIcon,
  Link2,
  FileCode,
  CalendarCheck,
  Globe,
  PlaySquare,
} from 'lucide-react';

interface ChatActionsProps {
  onAction: (action: QwenAction) => void;
  isLoading: boolean;
}

export function ChatActions({ onAction, isLoading }: ChatActionsProps) {
  const mainActions = [
    { icon: Globe, label: 'Web Search', action: 'web_search' as QwenAction },
    { icon: ImageIcon, label: 'Image Generation', action: 'image_generation' as QwenAction },
    { icon: PlaySquare, label: 'Video Generation', action: 'video_generation' as QwenAction },
    { icon: Link2, label: 'Artifacts', action: 'artifacts' as QwenAction },
  ];

  const quickActions = [
    { icon: ImageIcon, label: 'Create image', action: 'create_image' as QwenAction },
    { icon: FileCode, label: 'Code', action: 'code' as QwenAction },
    { icon: CalendarCheck, label: 'Make a plan', action: 'plan' as QwenAction },
    { label: '💡 News', action: 'news' as QwenAction },
    { label: 'More', action: 'more' as QwenAction },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {mainActions.map(({ icon: Icon, label, action }) => (
          <button
            key={action}
            onClick={() => onAction(action)}
            disabled={isLoading}
            className="flex flex-col items-center p-4 bg-white rounded-xl hover:bg-gray-50 
                     transition-colors shadow-sm hover:shadow-md disabled:opacity-50"
          >
            <Icon className="w-6 h-6 text-primary mb-2" />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {quickActions.map(({ icon: Icon, label, action }) => (
          <button
            key={action}
            onClick={() => onAction(action)}
            disabled={isLoading}
            className="flex items-center px-4 py-2 bg-white rounded-full hover:bg-gray-50 
                     transition-colors shadow-sm hover:shadow-md disabled:opacity-50"
          >
            {Icon && <Icon className="w-4 h-4 mr-2 text-primary" />}
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}