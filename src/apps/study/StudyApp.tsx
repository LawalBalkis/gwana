import React, { useState, useEffect } from 'react';
import type { AppProps } from '@/src/system/types';
import StudyHubScreen from '@/src/components/StudyHubScreen';
import AnalyticsDashboard from '@/src/components/AnalyticsDashboard';
import FlashcardManager from '@/src/components/FlashcardManager';
import FlashcardReviewSession from '@/src/components/FlashcardReviewSession';
import { BookOpen, BarChart3, Brain, ArrowLeft } from 'lucide-react';

type StudyView = 'hub' | 'analytics' | 'flashcards' | 'review';

/**
 * Study Application - Learning and flashcards
 * Creates study guides, flashcards, and learning materials with analytics
 */
const StudyApp: React.FC<AppProps> = ({ 
  appId, 
  systemServices, 
  initialIntent, 
  onNavigate, 
  isActive 
}) => {
  const [currentView, setCurrentView] = useState<StudyView>('hub');
  const [reviewingDeck, setReviewingDeck] = useState<any>(null);

  // Handle study-specific intents
  useEffect(() => {
    if (!initialIntent || !isActive) return;

    switch (initialIntent.action) {
      case 'CREATE':
        if (initialIntent.type?.startsWith('flashcard/')) {
          setCurrentView('flashcards');
        }
        break;
      
      case 'STUDY':
        if (initialIntent.data?.document) {
          setCurrentView('hub');
          systemServices.setToastMessage('Opening study material...');
        }
        break;
    }
  }, [initialIntent, isActive, systemServices]);

  const renderView = () => {
    switch (currentView) {
      case 'analytics':
        return <AnalyticsDashboard onBack={() => setCurrentView('hub')} />;
      
      case 'flashcards':
        return (
          <FlashcardManager
            onBack={() => setCurrentView('hub')}
            onStartReview={(deck) => {
              setReviewingDeck(deck);
              setCurrentView('review');
            }}
          />
        );
      
      case 'review':
        return reviewingDeck ? (
          <FlashcardReviewSession
            deck={reviewingDeck}
            onComplete={() => {
              setReviewingDeck(null);
              setCurrentView('flashcards');
            }}
          />
        ) : null;
      
      case 'hub':
      default:
        return <StudyHubScreen />;
    }
  };

  return (
    <div className="h-full w-full flex flex-col bg-background">
      {/* Quick Nav Bar */}
      <div className="flex gap-2 p-2 border-b border-border/20 bg-background/50 backdrop-blur-sm">
        {currentView !== 'hub' && (
          <button
            onClick={() => setCurrentView('hub')}
            className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
            aria-label="Back to hub"
          >
            <ArrowLeft size={20} className="text-primary" />
          </button>
        )}
        <button
          onClick={() => setCurrentView('hub')}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
            currentView === 'hub' ? 'bg-primary/20 text-primary' : 'hover:bg-primary/10'
          }`}
        >
          <BookOpen size={18} />
          <span className="text-sm font-medium">Study Hub</span>
        </button>
        <button
          onClick={() => setCurrentView('analytics')}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
            currentView === 'analytics' ? 'bg-primary/20 text-primary' : 'hover:bg-primary/10'
          }`}
        >
          <BarChart3 size={18} />
          <span className="text-sm font-medium">Analytics</span>
        </button>
        <button
          onClick={() => setCurrentView('flashcards')}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
            currentView === 'flashcards' ? 'bg-primary/20 text-primary' : 'hover:bg-primary/10'
          }`}
        >
          <Brain size={18} />
          <span className="text-sm font-medium">Flashcards</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {renderView()}
      </div>
    </div>
  );
};

export default StudyApp;
