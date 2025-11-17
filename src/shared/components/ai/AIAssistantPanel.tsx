import React from 'react';
import TalkingEmoji from '@/src/components/TalkingEmoji';
import { useLiveAPIContext } from '@/src/contexts/LiveAPIContext';
import type { Persona } from '@/src/lib/types';
import { Phone, PhoneOff, Mic, MicOff, Volume2, VolumeX, Sparkles, TrendingUp } from 'lucide-react';

interface SessionContext {
  topic?: string;
  progress?: number;
  timeSpent?: string;
  confidence?: 'Building' | 'Strong' | 'Mastered';
  [key: string]: any;
}

interface AIAssistantPanelProps {
  persona: Persona;
  setPersona: (persona: Persona) => void;
  sessionContext?: SessionContext;
  suggestions?: string[];
  onSuggestionClick?: (suggestion: string) => void;
  showStats?: boolean;
  stats?: {
    todayMinutes?: number;
    streak?: number;
  };
}

/**
 * AIAssistantPanel - Reusable AI Assistant Right Panel
 * Features: Vertical dual avatars, voice controls, context display, smart suggestions
 * Follows recommended 360px width with vertical organization
 */
const AIAssistantPanel: React.FC<AIAssistantPanelProps> = ({
  persona,
  setPersona,
  sessionContext,
  suggestions = [],
  onSuggestionClick,
  showStats = false,
  stats
}) => {
  const {
    callState,
    startCall,
    endCall,
    isMuted,
    toggleMute,
    isSpeakerOn,
    toggleSpeaker,
    speakingPersona
  } = useLiveAPIContext();

  const isSessionActive = ['ringing', 'connecting', 'connected', 'paused'].includes(callState);

  const handleCallButtonClick = () => {
    if (isSessionActive) {
      endCall('idle');
    } else {
      startCall();
    }
  };

  const handleSelectPersona = (selectedPersona: Persona) => {
    if (!isSessionActive) {
      setPersona(selectedPersona);
    }
  };

  const isZeroActive = persona === 'Agent Zero';
  const isZeroSpeaking = speakingPersona === 'Agent Zero';
  const isZaraSpeaking = speakingPersona === 'Agent Zara';

  return (
    <div className="h-full flex flex-col gap-6 p-6">
      {/* AI Avatars - Vertical Stack */}
      <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4">
        <div className="flex flex-col items-center space-y-4">
          {/* Primary Agent - Larger */}
          <div
            className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
              isZeroActive ? 'scale-105' : 'opacity-60 hover:opacity-80'
            }`}
            onClick={() => handleSelectPersona('Agent Zero')}
          >
            <div
              className={`relative transition-all duration-300 ${
                isZeroSpeaking ? 'animate-pulse' : ''
              }`}
              style={{
                filter: isZeroSpeaking
                  ? 'drop-shadow(0 0 20px hsl(var(--primary))) drop-shadow(0 0 40px hsl(var(--primary)))'
                  : isZeroActive
                  ? 'drop-shadow(0 0 10px hsl(var(--primary)))'
                  : 'none'
              }}
            >
              <TalkingEmoji persona="Agent Zero" activePersona={speakingPersona} size={120} />
            </div>
            <span className="mt-2 text-sm font-semibold text-primary">Agent Zero</span>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* Secondary Agent */}
          <div
            className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
              !isZeroActive ? 'scale-105' : 'opacity-60 hover:opacity-80'
            }`}
            onClick={() => handleSelectPersona('Agent Zara')}
          >
            <div
              className={`relative transition-all duration-300 ${
                isZaraSpeaking ? 'animate-pulse' : ''
              }`}
              style={{
                filter: isZaraSpeaking
                  ? 'drop-shadow(0 0 20px hsl(var(--accent))) drop-shadow(0 0 40px hsl(var(--accent)))'
                  : !isZeroActive
                  ? 'drop-shadow(0 0 10px hsl(var(--accent)))'
                  : 'none'
              }}
            >
              <TalkingEmoji persona="Agent Zara" activePersona={speakingPersona} size={80} />
            </div>
            <span className="mt-2 text-xs font-medium text-muted-foreground hover:text-accent transition-colors">
              Switch to Zara
            </span>
          </div>
        </div>
      </div>

      {/* Voice Controls */}
      <div className="bg-card/30 backdrop-blur-sm border border-border rounded-lg p-3">
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={toggleMute}
            disabled={!isSessionActive}
            className="w-11 h-11 rounded-full flex items-center justify-center bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <MicOff size={18} /> : <Mic size={18} />}
          </button>

          <button
            onClick={handleCallButtonClick}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
              isSessionActive
                ? 'bg-destructive hover:bg-destructive/90 animate-pulse'
                : 'bg-primary hover:bg-primary/90 text-primary-foreground'
            }`}
            title={isSessionActive ? 'End Session' : 'Start Session'}
          >
            {isSessionActive ? <PhoneOff size={20} /> : <Phone size={20} />}
          </button>

          <button
            onClick={toggleSpeaker}
            disabled={!isSessionActive}
            className="w-11 h-11 rounded-full flex items-center justify-center bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
            title={isSpeakerOn ? 'Mute Speaker' : 'Unmute Speaker'}
          >
            {isSpeakerOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
        </div>
      </div>

      {/* Session Context */}
      {sessionContext && (
        <div className="bg-card/40 backdrop-blur-sm border border-border rounded-lg p-4 flex-shrink-0">
          <h3 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
            <Sparkles size={16} />
            Session Context
          </h3>
          <div className="space-y-2 text-xs">
            {sessionContext.topic && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Topic:</span>
                <span className="text-foreground font-medium">{sessionContext.topic}</span>
              </div>
            )}
            {sessionContext.progress !== undefined && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Progress:</span>
                <span className="text-foreground font-medium">{sessionContext.progress}%</span>
              </div>
            )}
            {sessionContext.timeSpent && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time:</span>
                <span className="text-foreground font-medium">{sessionContext.timeSpent}</span>
              </div>
            )}
            {sessionContext.confidence && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Confidence:</span>
                <span className="text-foreground font-medium flex items-center gap-1">
                  {sessionContext.confidence} <TrendingUp size={12} />
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Smart Suggestions */}
      {suggestions.length > 0 && (
        <div className="bg-card/40 backdrop-blur-sm border border-border rounded-lg p-4 flex-1 overflow-y-auto">
          <h3 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
            <Sparkles size={16} />
            AI Suggestions
          </h3>
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => onSuggestionClick?.(suggestion)}
                className="w-full text-left px-3 py-2.5 rounded-md bg-secondary/50 hover:bg-secondary text-xs text-foreground transition-all duration-200 border border-border/50 hover:border-primary/40 hover:shadow-sm"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quick Stats */}
      {showStats && stats && (
        <div className="bg-card/40 backdrop-blur-sm border border-border rounded-lg p-4 flex-shrink-0">
          <div className="flex items-center justify-between text-xs">
            <div>
              <span className="text-muted-foreground">Today: </span>
              <span className="text-foreground font-semibold">{stats?.todayMinutes || 0} min</span>
            </div>
            <div>
              <span className="text-muted-foreground">Streak: </span>
              <span className="text-foreground font-semibold">{stats?.streak || 0} 🔥</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistantPanel;
