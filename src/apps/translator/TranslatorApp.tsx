import React, { useState, useEffect } from 'react';
import type { AppProps } from '@/src/system/types';
import TranslatorConsole from '@/src/components/TranslatorConsole';
import { Languages, History } from 'lucide-react';

type TranslatorView = 'translate' | 'history';

/**
 * Translator Application - Real-time translation
 * Translate text between languages with history tracking
 */
const TranslatorApp: React.FC<AppProps> = ({ 
  appId, 
  systemServices, 
  initialIntent, 
  onNavigate, 
  isActive 
}) => {
  const [currentView, setCurrentView] = useState<TranslatorView>('translate');
  const [sourceText, setSourceText] = useState<string>('');
  const [translationHistory, setTranslationHistory] = useState<any[]>([]);

  // Handle TRANSLATE intents from other apps
  useEffect(() => {
    if (!initialIntent || !isActive) return;

    if (initialIntent.action === 'TRANSLATE' && initialIntent.data?.text) {
      setSourceText(initialIntent.data.text);
      setCurrentView('translate');
    }
  }, [initialIntent, isActive]);

  // Handle translation completion
  const handleTranslationComplete = (source: string, target: string, sourceLang: string, targetLang: string) => {
    const record = {
      source,
      target,
      sourceLang,
      targetLang,
      timestamp: new Date().toISOString(),
    };
    
    setTranslationHistory(prev => [record, ...prev.slice(0, 49)]); // Keep last 50
  };

  return (
    <div className="h-full w-full flex flex-col bg-background">
      {/* View Switcher */}
      <div className="flex gap-2 p-2 border-b border-border/20 bg-background/50 backdrop-blur-sm">
        <button
          onClick={() => setCurrentView('translate')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            currentView === 'translate' ? 'bg-primary/20 text-primary' : 'hover:bg-primary/10'
          }`}
        >
          <Languages size={18} />
          <span className="text-sm font-medium">Translate</span>
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
        {currentView === 'translate' ? (
          <TranslatorConsole 
            initialText={sourceText}
            onTranslationComplete={handleTranslationComplete}
          />
        ) : (
          <div className="h-full overflow-auto p-4">
            <h2 className="text-xl font-bold text-primary mb-4">Translation History</h2>
            {translationHistory.length === 0 ? (
              <p className="text-muted-foreground">No translations yet. Start translating to see your history!</p>
            ) : (
              <div className="space-y-3">
                {translationHistory.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-card border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors cursor-pointer"
                    onClick={() => {
                      setSourceText(item.source);
                      setCurrentView('translate');
                    }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs text-muted-foreground">
                        {item.sourceLang} → {item.targetLang}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(item.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-foreground mb-2">{item.source}</p>
                    <p className="text-sm text-primary">{item.target}</p>
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

export default TranslatorApp;
