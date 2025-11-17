import React, { useState, useEffect } from 'react';
import type { AppProps } from '@/src/system/types';
import DebateStageUI from '@/src/components/DebateStageUI';
import { MessageSquare, History } from 'lucide-react';

type DebateView = 'stage' | 'history';

/**
 * Debate Application - Multi-AI debate stage
 * Watch AIs debate topics from different perspectives
 */
const DebateApp: React.FC<AppProps> = ({ 
  appId, 
  systemServices, 
  initialIntent, 
  onNavigate, 
  isActive 
}) => {
  const [currentView, setCurrentView] = useState<DebateView>('stage');
  const [debateTopic, setDebateTopic] = useState<string>('');
  const [debateHistory, setDebateHistory] = useState<any[]>([]);

  // Handle debate-specific intents
  useEffect(() => {
    if (!initialIntent || !isActive) return;

    if (initialIntent.action === 'DEBATE' && initialIntent.data?.topic) {
      setDebateTopic(initialIntent.data.topic);
      setCurrentView('stage');
    }
  }, [initialIntent, isActive]);

  // Handle debate completion
  const handleDebateComplete = (topic: string, winner: string, transcript: any[]) => {
    const debateRecord = {
      topic,
      winner,
      transcript,
      timestamp: new Date().toISOString(),
    };
    
    setDebateHistory(prev => [debateRecord, ...prev]);
    systemServices.setToastMessage(`Debate completed! Winner: ${winner}`);
  };

  return (
    <div className="h-full w-full flex flex-col bg-background">
      {/* View Switcher */}
      <div className="flex gap-2 p-2 border-b border-border/20 bg-background/50 backdrop-blur-sm">
        <button
          onClick={() => setCurrentView('stage')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            currentView === 'stage' ? 'bg-primary/20 text-primary' : 'hover:bg-primary/10'
          }`}
        >
          <MessageSquare size={18} />
          <span className="text-sm font-medium">Debate Stage</span>
        </button>
        <button
          onClick={() => setCurrentView('history')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            currentView === 'history' ? 'bg-primary/20 text-primary' : 'hover:bg-primary/10'
          }`}
        >
          <History size={18} />
          <span className="text-sm font-medium">History</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {currentView === 'stage' ? (
          <DebateStageUI 
            initialTopic={debateTopic}
            onDebateComplete={handleDebateComplete}
          />
        ) : (
          <div className="h-full overflow-auto p-4">
            <h2 className="text-xl font-bold text-primary mb-4">Debate History</h2>
            {debateHistory.length === 0 ? (
              <p className="text-muted-foreground">No debates yet. Start a debate to see the history!</p>
            ) : (
              <div className="space-y-3">
                {debateHistory.map((debate, idx) => (
                  <div
                    key={idx}
                    className="bg-card border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors cursor-pointer"
                    onClick={() => {
                      setDebateTopic(debate.topic);
                      setCurrentView('stage');
                    }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-foreground">{debate.topic}</h3>
                      <span className="text-xs text-muted-foreground">
                        {new Date(debate.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Winner:</span>
                      <span className="text-sm font-medium text-primary">{debate.winner}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DebateApp;
