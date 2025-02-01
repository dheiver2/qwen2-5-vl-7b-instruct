'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  ImageIcon,
  Link2,
  FileCode,
  CalendarCheck,
  Image as ImageLucide,
  Globe,
  PlaySquare,
  Mic,
  ChevronDown,
  Camera,
  Settings,
  HelpCircle,
  Loader2,
  X,
} from 'lucide-react';
import { qwenService, type QwenAction, type QwenResponse } from '@/services/qwen-service';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  images?: string[];
  videos?: string[];
  code?: string;
  artifacts?: any[];
  action?: QwenAction;
}

const ChatInterface: React.FC = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentAction, setCurrentAction] = useState<QwenAction | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleAction = async (action: QwenAction, customInput?: string) => {
    if (isLoading) return;
    
    setCurrentAction(action);
    setIsLoading(true);
    setError(null);
    
    const textToSend = customInput || input || `Help me with ${action.replace('_', ' ')}`;

    try {
      const response = await qwenService.sendRequest({
        text: textToSend,
        action: action
      });

      // Add user message
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'user',
        content: textToSend,
        action: action
      }]);

      // Add assistant response
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text,
        images: response.images,
        videos: response.videos,
        code: response.code,
        artifacts: response.artifacts
      }]);

      setInput('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
      setCurrentAction(null);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleAction('image_generation', `Analyze this image: ${file.name}`);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() && !currentAction) return;
    
    await handleAction('more', input);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 border-b bg-white shadow-sm">
        <div className="flex items-center space-x-3">
          <span className="font-bold text-[#6C5CE7] text-lg tracking-wide">QWEN CHAT</span>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => handleAction('help')}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <HelpCircle size={20} />
          </button>
          <button 
            onClick={() => setShowTooltip(prev => prev === 'settings' ? '' : 'settings')}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Settings size={20} />
          </button>
          <button className="px-4 py-1.5 text-sm text-[#6C5CE7] hover:bg-[#6C5CE7]/10 rounded-full transition-colors">
            Log in
          </button>
          <button className="px-4 py-1.5 text-sm text-white bg-[#6C5CE7] rounded-full hover:bg-[#6C5CE7]/90 transition-colors shadow-md hover:shadow-lg">
            Sign up
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center mb-12">
            <div className="mb-8 transform hover:scale-105 transition-transform duration-300">
              <img 
                src="/logo.png" 
                alt="Qwen Logo" 
                style={{
                  maxWidth: '280px',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain'
                }}
                className="drop-shadow-xl"
              />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Ask Qwen, Know More.</h1>
            <p className="text-gray-500 text-center max-w-2xl">
              Your intelligent assistant for web search, image generation, and more.
            </p>
          </div>
        ) : (
          <div className="w-full max-w-4xl mb-8 space-y-4 pt-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] p-4 rounded-xl ${
                  message.role === 'user' 
                    ? 'bg-[#6C5CE7] text-white' 
                    : 'bg-white shadow-md'
                }`}>
                  {message.action && (
                    <div className="text-xs opacity-75 mb-1">
                      Action: {message.action.replace('_', ' ')}
                    </div>
                  )}
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  {message.images?.map((img, idx) => (
                    <img key={idx} src={img} alt="Generated" className="mt-2 rounded-lg" />
                  ))}
                  {message.videos?.map((video, idx) => (
                    <video key={idx} src={video} controls className="mt-2 rounded-lg" />
                  ))}
                  {message.code && (
                    <pre className="mt-2 p-4 bg-gray-800 text-white rounded-lg overflow-x-auto">
                      <code>{message.code}</code>
                    </pre>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
        
        {/* Input Area */}
        <div className="w-full max-w-3xl">
          {error && (
            <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg flex items-center justify-between">
              <span>{error}</span>
              <button onClick={() => setError(null)}><X size={20} /></button>
            </div>
          )}
          
          <div className="relative mb-6">
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="How can I help you today?"
                className="w-full p-4 pr-24 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#6C5CE7] focus:border-transparent resize-none bg-white shadow-md"
                rows={1}
                disabled={isLoading}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                {isLoading ? (
                  <Loader2 className="w-6 h-6 text-[#6C5CE7] animate-spin" />
                ) : (
                  <>
                    <button 
                      onClick={() => handleAction('voice')}
                      className="p-2 text-gray-400 hover:text-[#6C5CE7] transition-colors"
                    >
                      <Mic size={20} />
                    </button>
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2 text-gray-400 hover:text-[#6C5CE7] transition-colors"
                    >
                      <Camera size={20} />
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button 
                      onClick={handleSubmit}
                      className="p-2 text-gray-400 hover:text-[#6C5CE7] transition-colors"
                    >
                      <ChevronDown size={20} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Feature Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <button 
              onClick={() => handleAction('web_search')}
              disabled={isLoading}
              className="flex flex-col items-center p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors shadow-sm hover:shadow-md disabled:opacity-50"
            >
              <Globe className="w-6 h-6 text-[#6C5CE7] mb-2" />
              <span className="text-sm">Web Search</span>
            </button>
            <button 
              onClick={() => handleAction('image_generation')}
              disabled={isLoading}
              className="flex flex-col items-center p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors shadow-sm hover:shadow-md disabled:opacity-50"
            >
              <ImageLucide className="w-6 h-6 text-[#6C5CE7] mb-2" />
              <span className="text-sm">Image Generation</span>
            </button>
            <button 
              onClick={() => handleAction('video_generation')}
              disabled={isLoading}
              className="flex flex-col items-center p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors shadow-sm hover:shadow-md disabled:opacity-50"
            >
              <PlaySquare className="w-6 h-6 text-[#6C5CE7] mb-2" />
              <span className="text-sm">Video Generation</span>
            </button>
            <button 
              onClick={() => handleAction('artifacts')}
              disabled={isLoading}
              className="flex flex-col items-center p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors shadow-sm hover:shadow-md disabled:opacity-50"
            >
              <Link2 className="w-6 h-6 text-[#6C5CE7] mb-2" />
              <span className="text-sm">Artifacts</span>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center justify-center flex-wrap gap-2">
            <button 
              onClick={() => handleAction('create_image')}
              disabled={isLoading}
              className="flex items-center px-4 py-2 rounded-full bg-white hover:bg-gray-50 transition-colors shadow-sm hover:shadow-md disabled:opacity-50"
            >
              <ImageIcon className="w-4 h-4 mr-2 text-[#6C5CE7]" />
              <span className="text-sm">Create image</span>
            </button>
            <button 
              onClick={() => handleAction('code')}
              disabled={isLoading}
              className="flex items-center px-4 py-2 rounded-full bg-white hover:bg-gray-50 transition-colors shadow-sm hover:shadow-md disabled:opacity-50"
            >
              <FileCode className="w-4 h-4 mr-2 text-[#6C5CE7]" />
              <span className="text-sm">Code</span>
            </button>
            <button 
              onClick={() => handleAction('plan')}
              disabled={isLoading}
              className="flex items-center px-4 py-2 rounded-full bg-white hover:bg-gray-50 transition-colors shadow-sm hover:shadow-md disabled:opacity-50"
            >
              <CalendarCheck className="w-4 h-4 mr-2 text-[#6C5CE7]" />
              <span className="text-sm">Make a plan</span>
            </button>
            <button 
              onClick={() => handleAction('news')}
              disabled={isLoading}
              className="flex items-center px-4 py-2 rounded-full bg-white hover:bg-gray-50 transition-colors shadow-sm hover:shadow-md disabled:opacity-50"
            >
              <span className="text-sm mr-1">💡</span>
              <span className="text-sm">News</span>
            </button>
            <button 
              onClick={() => handleAction('more')}
              disabled={isLoading}
              className="flex items-center px-4 py-2 rounded-full bg-white hover:bg-gray-50 transition-colors shadow-sm hover:shadow-md disabled:opacity-50"
            >
              <span className="text-sm">More</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatInterface;