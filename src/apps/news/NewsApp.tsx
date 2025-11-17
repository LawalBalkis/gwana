import React, { useState, useEffect } from 'react';
import type { AppProps } from '@/src/system/types';
import LiveRadioPlayer from '@/src/components/LiveRadioPlayer';
import NewsDisplay from '@/src/components/NewsDisplay';
import { Radio, Newspaper } from 'lucide-react';

type NewsView = 'radio' | 'articles';

/**
 * News Application - AI news broadcaster
 * Fetches headlines and generates AI radio broadcasts
 */
const NewsApp: React.FC<AppProps> = ({ 
  appId, 
  systemServices, 
  initialIntent, 
  onNavigate, 
  isActive 
}) => {
  const [currentView, setCurrentView] = useState<NewsView>('radio');
  const [newsLocation, setNewsLocation] = useState<string>('global');
  const [newsCategory, setNewsCategory] = useState<string>('general');

  // Handle news-specific intents
  useEffect(() => {
    if (!initialIntent || !isActive) return;

    if (initialIntent.action === 'NEWS') {
      if (initialIntent.data?.location) {
        setNewsLocation(initialIntent.data.location);
      }
      if (initialIntent.data?.category) {
        setNewsCategory(initialIntent.data.category);
      }
    }
  }, [initialIntent, isActive]);

  return (
    <div className="h-full w-full flex flex-col bg-background">
      {/* View Switcher */}
      <div className="flex gap-2 p-2 border-b border-border/20 bg-background/50 backdrop-blur-sm">
        <button
          onClick={() => setCurrentView('radio')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            currentView === 'radio' ? 'bg-primary/20 text-primary' : 'hover:bg-primary/10'
          }`}
        >
          <Radio size={18} />
          <span className="text-sm font-medium">AI Radio</span>
        </button>
        <button
          onClick={() => setCurrentView('articles')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            currentView === 'articles' ? 'bg-primary/20 text-primary' : 'hover:bg-primary/10'
          }`}
        >
          <Newspaper size={18} />
          <span className="text-sm font-medium">Articles</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {currentView === 'radio' ? (
          <LiveRadioPlayer />
        ) : (
          <NewsDisplay
            location={newsLocation}
            category={newsCategory}
          />
        )}
      </div>
    </div>
  );
};

export default NewsApp;
