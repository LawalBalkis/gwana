import React, { useState, useEffect } from 'react';
import type { AppProps } from '@/src/system/types';
import type { StudyHubItem, StudyProgress } from '@/src/lib/types';
import ThreePanelLayout from '@/src/components/layouts/ThreePanelLayout';
import StudyLeftPanel from '@/src/components/study/StudyLeftPanel';
import StudyRightPanel from '@/src/components/study/StudyRightPanel';
import EnhancedStudyHub from '@/src/components/study/EnhancedStudyHub';
import StudySession from '@/src/components/study/StudySession';
import AnalyticsDashboard from '@/src/components/AnalyticsDashboard';
import FlashcardManager from '@/src/components/FlashcardManager';
import FlashcardReviewSession from '@/src/components/FlashcardReviewSession';

type StudyView = 'hub' | 'analytics' | 'flashcards' | 'review' | 'session';

/**
 * RefactoredStudyApp - Enhanced Study Application with Three-Panel Layout
 * Left: Navigation & Controls (280px)
 * Center: Main Content (flexible)
 * Right: AI Assistant & Context (360px)
 */
const RefactoredStudyApp: React.FC<AppProps> = ({
  appId,
  systemServices,
  initialIntent,
  onNavigate,
  isActive
}) => {
  const [currentView, setCurrentView] = useState<StudyView>('hub');
  const [reviewingDeck, setReviewingDeck] = useState<any>(null);
  const [activeSession, setActiveSession] = useState<StudyHubItem | null>(null);
  const [persona, setPersona] = useState<'Agent Zero' | 'Agent Zara'>('Agent Zero');
  
  // Mock data - replace with actual data fetching
  const [studyItems, setStudyItems] = useState<StudyHubItem[]>([]);
  const [studyProgress] = useState<StudyProgress>({
    studyDays: [],
    totalItems: 0
  });

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

  const handleRemoveItem = (id: string) => {
    setStudyItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleStartSession = (item: StudyHubItem) => {
    setActiveSession(item);
    setCurrentView('session');
  };

  // Session context for right panel
  const sessionContext = activeSession
    ? {
        topic: activeSession.type === 'learningPath' ? activeSession.goal : activeSession.topic,
        itemsReviewed: 0,
        correctAnswers: 0,
        currentStreak: 0
      }
    : undefined;

  // AI suggestions based on current view
  const suggestions =
    currentView === 'hub'
      ? [
          'Create new flashcards',
          'Start a practice quiz',
          'Review today\'s materials',
          'Set study goals'
        ]
      : currentView === 'session'
      ? [
          'Explain this concept deeper',
          'Create flashcard from this',
          'Quiz me on this topic',
          'Show related concepts'
        ]
      : [];

  // Render center panel based on current view
  const renderCenterPanel = () => {
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

      case 'session':
        return activeSession ? (
          <StudySession
            topic={
              activeSession.type === 'learningPath'
                ? activeSession.goal
                : activeSession.topic
            }
            onBack={() => {
              setActiveSession(null);
              setCurrentView('hub');
            }}
          />
        ) : null;

      case 'hub':
      default:
        return (
          <EnhancedStudyHub
            items={studyItems}
            onRemove={handleRemoveItem}
            studyProgress={studyProgress}
            onStartSession={handleStartSession}
          />
        );
    }
  };

  return (
    <div className="h-full w-full bg-[var(--bg-primary)]">
      <ThreePanelLayout
        leftPanel={
          <StudyLeftPanel
            currentView={currentView}
            onViewChange={setCurrentView}
            onCreateMaterial={() => {
              systemServices.setToastMessage('Create material feature coming soon!');
            }}
          />
        }
        centerPanel={renderCenterPanel()}
        rightPanel={
          <StudyRightPanel
            persona={persona}
            setPersona={setPersona}
            sessionContext={sessionContext}
            suggestions={suggestions}
          />
        }
      />
    </div>
  );
};

export default RefactoredStudyApp;
