'use client';

import { useEffect, useState } from 'react';
import { Loader2, WifiOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConnectionStatusProps {
  isConnected: boolean;
}

export function ConnectionStatus({ isConnected }: ConnectionStatusProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isConnected) {
      const timer = setTimeout(() => setIsVisible(false), 3000);
      return () => clearTimeout(timer);
    }
    setIsVisible(true);
  }, [isConnected]);

  if (!isVisible) return null;

  return (
    <div 
      className={cn(
        "fixed top-4 right-4 rounded-lg px-4 py-2 flex items-center space-x-2 shadow-lg transition-all duration-300",
        isConnected ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      )}
    >
      {isConnected ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Connected to Qwen</span>
        </>
      ) : (
        <>
          <WifiOff className="w-4 h-4" />
          <span>Connecting to Qwen...</span>
        </>
      )}
    </div>
  );
}