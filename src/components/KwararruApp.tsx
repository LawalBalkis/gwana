import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import type { Message, Settings, CallRecord, View, AiMode, CallState, WhiteboardElement, ProactiveAction, SearchFilterType, JobListing, ProactiveSuggestion, StudyHubItem, StudyProgress, Flashcard, ProactiveCalendarSuggestionContent, CalendarEvent, SharedSessionState, DataFileContent, Workflow, UserProfile, Persona, QuizContent, DebateContent, NewsArticle } from '@/src/lib/types';
import { DEFAULT_SETTINGS, AI_MODES } from '@/src/lib/constants';
import { ServiceContainer } from '@/src/system/ServiceContainer';
import { AppRegistryProvider } from '@/src/system/AppRegistry';
import { ALL_APP_MANIFESTS } from '@/src/apps/registry';
import { ChatUI } from './ChatUI';
import SettingsScreen from './SettingsScreen';
import DashboardScreen from './DashboardScreen';
import CalendarScreen from './CalendarScreen';
import { QuizShowUI } from './QuizConsole';
import DebateStageUI from './DebateStageUI';
import TranslatorConsole from './TranslatorConsole';
import AIWritingAssistant from './AIWritingAssistant';
import CodeHelper from './CodeHelper';
import VoiceJournal from './VoiceJournal';
import LiveRadioPlayer from './LiveRadioPlayer';
import AppDrawer from './AppDrawer';
import Taskbar from './Taskbar';
import MobileFooter from './MobileFooter';
import AgentPresence from './AgentPresence';
import { Loader } from 'lucide-react';

interface KwararruAppProps {
  currentUser: UserProfile | null;
  logout: () => void;
  isMobile: boolean;
  messages: Message[];
  settings: Settings;
  callHistory: CallRecord[];
  view: View;
  aiMode: AiMode;
  callState: CallState;
  persona: Persona;
  workflows: Workflow[];
  updateSettings: (key: keyof Settings, value: any) => void;
  setView: (view: View) => void;
  setAiMode: (mode: AiMode) => void;
  setPersona: (persona: Persona) => void;
  clearChat: () => void;
  exportChat: () => void;
  setShowStatsModal: (show: boolean) => void;
  setShowKeyboardShortcuts: (show: boolean) => void;
  togglePersona: () => void;
  onOpenWorkflowEditor: (workflow?: Workflow) => void;
  onDeleteWorkflow: (workflowId: string) => void;
  onRunWorkflow: (workflowId: string) => void;
  onToggleWorkflow: (workflowId: string, isEnabled: boolean) => void;
  setShowSubscriptionModal: (show: boolean) => void;
  setToastMessage: (message: string) => void;
}

/**
 * KwararruApp - Main application wrapper with ServiceContainer
 * Manages all app state and provides system services to child apps
 */
const KwararruApp: React.FC<KwararruAppProps> = ({
  currentUser,
  logout,
  isMobile,
  messages,
  settings,
  callHistory,
  view,
  aiMode,
  callState,
  persona,
  workflows,
  updateSettings,
  setView,
  setAiMode,
  setPersona,
  clearChat,
  exportChat,
  setShowStatsModal,
  setShowKeyboardShortcuts,
  togglePersona,
  onOpenWorkflowEditor,
  onDeleteWorkflow,
  onRunWorkflow,
  onToggleWorkflow,
  setShowSubscriptionModal,
  setToastMessage,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeApp, setActiveApp] = useState<string | null>(null);

  // State getters for ServiceContainer
  const getMessages = useCallback(() => messages, [messages]);
  const getSettings = useCallback(() => settings, [settings]);
  const getAiMode = useCallback(() => aiMode, [aiMode]);
  const getPersona = useCallback(() => persona, [persona]);
  const getCallState = useCallback(() => callState, [callState]);
  const getCurrentUser = useCallback(() => currentUser, [currentUser]);

  // Handle app navigation via intent system
  const handleIntentNavigation = useCallback((appId: string, intent?: any) => {
    const app = ALL_APP_MANIFESTS.find(a => a.id === appId);
    if (app && app.mode) {
      setAiMode(app.mode);
      setActiveApp(appId);
    }
  }, [setAiMode]);

  // Render current view based on aiMode
  const renderView = () => {
    switch (aiMode) {
      case 'dashboard':
        return (
          <DashboardScreen
            setView={setView}
            setAiMode={setAiMode}
            currentUser={currentUser}
          />
        );
      
      case 'settings':
        return (
          <SettingsScreen
            currentUser={currentUser}
            logout={logout}
            persona={persona}
            settings={settings}
            callHistory={callHistory}
            updateSettings={updateSettings}
            clearChat={clearChat}
            exportChat={exportChat}
            setView={setView}
            setShowStatsModal={setShowStatsModal}
            setShowKeyboardShortcuts={setShowKeyboardShortcuts}
            togglePersona={togglePersona}
            workflows={workflows}
            onOpenWorkflowEditor={onOpenWorkflowEditor}
            onDeleteWorkflow={onDeleteWorkflow}
            onRunWorkflow={onRunWorkflow}
            onToggleWorkflow={onToggleWorkflow}
            setShowSubscriptionModal={setShowSubscriptionModal}
            isDesktop={!isMobile}
          />
        );

      case 'calendar':
        return <CalendarScreen />;

      case 'study':
        // Study app now uses its own three-panel layout
        return null;

      case 'quiz':
        return <QuizShowUI />;

      case 'debate':
        return <DebateStageUI />;

      case 'translator':
        return <TranslatorConsole />;

      case 'writer':
        return <AIWritingAssistant />;

      case 'code':
        return <CodeHelper />;

      case 'voiceJournal':
        return <VoiceJournal />;

      case 'news':
        return <LiveRadioPlayer />;

      case 'chat':
      default:
        return <ChatUI />;
    }
  };

  return (
    <ServiceContainer
      getMessages={getMessages}
      getSettings={getSettings}
      getAiMode={getAiMode}
      getPersona={getPersona}
      getCallState={getCallState}
      getCurrentUser={getCurrentUser}
      setAiMode={setAiMode}
      setPersona={setPersona}
      updateSettings={updateSettings}
      setToastMessage={setToastMessage}
      onIntentNavigation={handleIntentNavigation}
    >
      <AppRegistryProvider
        apps={ALL_APP_MANIFESTS}
        onAppLaunch={(appId, intent) => {
          handleIntentNavigation(appId, intent);
        }}
      >
        <div className="h-full w-full flex flex-col relative">
          {/* Agent Presence - Always visible */}
          <AgentPresence persona={persona} callState={callState} />

          {/* Main Content Area */}
          <div className="flex-1 overflow-hidden">
            {renderView()}
          </div>

          {/* Navigation */}
          {isMobile ? (
            <MobileFooter
              aiMode={aiMode}
              setAiMode={setAiMode}
              setView={setView}
            />
          ) : (
            <>
              <Taskbar
                aiMode={aiMode}
                setAiMode={setAiMode}
                onOpenDrawer={() => setDrawerOpen(true)}
              />
              <AppDrawer
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                onSelectMode={setAiMode}
                currentMode={aiMode}
              />
            </>
          )}
        </div>
      </AppRegistryProvider>
    </ServiceContainer>
  );
};

export default KwararruApp;
