import React, { useEffect, useState } from 'react';
import type { AppProps } from '@/src/system/types';
import { ChatUI } from '@/src/components/ChatUI';

/**
 * Chat Application - Main conversational interface
 * Handles text and voice conversations with AI assistant
 */
const ChatApp: React.FC<AppProps> = ({ 
  appId, 
  systemServices, 
  initialIntent, 
  onNavigate, 
  isActive 
}) => {
  const [intentData, setIntentData] = useState<any>(null);

  // Handle incoming intents (SHARE, VIEW from other apps)
  useEffect(() => {
    if (!initialIntent || !isActive) return;

    switch (initialIntent.action) {
      case 'SHARE':
        if (initialIntent.data?.text) {
          setIntentData({
            type: 'shared-text',
            content: initialIntent.data.text,
            source: initialIntent.data.source
          });
        }
        break;
      
      case 'VIEW':
        if (initialIntent.data) {
          setIntentData({
            type: 'view-data',
            content: initialIntent.data
          });
        }
        break;
    }
  }, [initialIntent, isActive]);

  return (
    <div className="h-full w-full">
      <ChatUI 
        initialIntentData={intentData}
        onClearIntent={() => setIntentData(null)}
      />
    </div>
  );
};

export default ChatApp;
