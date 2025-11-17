import React, { useState, useEffect } from 'react';
import type { AppProps } from '@/src/system/types';
import { QuizShowUI } from '@/src/components/QuizConsole';
import { Trophy, History } from 'lucide-react';
import { studyDB } from '@/src/lib/studyDB';

type QuizView = 'game' | 'history';

/**
 * Quiz Application - Interactive quiz game show
 * Generate and play quiz games on any topic with performance tracking
 */
const QuizApp: React.FC<AppProps> = ({ 
  appId, 
  systemServices, 
  initialIntent, 
  onNavigate, 
  isActive 
}) => {
  const [currentView, setCurrentView] = useState<QuizView>('game');
  const [quizTopic, setQuizTopic] = useState<string>('');
  const [quizHistory, setQuizHistory] = useState<any[]>([]);

  // Load quiz history
  useEffect(() => {
    const loadHistory = async () => {
      const results = await studyDB.getQuizResults(20);
      setQuizHistory(results);
    };
    
    if (isActive) {
      loadHistory();
    }
  }, [isActive]);

  // Handle quiz-specific intents
  useEffect(() => {
    if (!initialIntent || !isActive) return;

    if (initialIntent.action === 'QUIZ' && initialIntent.data?.topic) {
      setQuizTopic(initialIntent.data.topic);
      setCurrentView('game');
    }
  }, [initialIntent, isActive]);

  // Handle quiz completion
  const handleQuizComplete = async (score: number, topic: string, correctCount: number, totalCount: number) => {
    await studyDB.addQuizResult({
      subject: topic,
      score,
      totalQuestions: totalCount,
      correctAnswers: correctCount,
      completedAt: new Date(),
    });
    
    systemServices.setToastMessage(`Quiz complete! Score: ${score}%`);
    
    // Reload history
    const results = await studyDB.getQuizResults(20);
    setQuizHistory(results);
  };

  return (
    <div className="h-full w-full flex flex-col bg-background">
      {/* View Switcher */}
      <div className="flex gap-2 p-2 border-b border-border/20 bg-background/50 backdrop-blur-sm">
        <button
          onClick={() => setCurrentView('game')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            currentView === 'game' ? 'bg-primary/20 text-primary' : 'hover:bg-primary/10'
          }`}
        >
          <Trophy size={18} />
          <span className="text-sm font-medium">Play Quiz</span>
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
        {currentView === 'game' ? (
          <QuizShowUI 
            initialTopic={quizTopic}
            onQuizComplete={handleQuizComplete}
          />
        ) : (
          <div className="h-full overflow-auto p-4">
            <h2 className="text-xl font-bold text-primary mb-4">Quiz History</h2>
            {quizHistory.length === 0 ? (
              <p className="text-muted-foreground">No quiz history yet. Start playing to see your results!</p>
            ) : (
              <div className="space-y-2">
                {quizHistory.map((result, idx) => (
                  <div
                    key={idx}
                    className="bg-card border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-foreground">{result.subject}</h3>
                        <p className="text-sm text-muted-foreground">
                          {result.correctAnswers}/{result.totalQuestions} correct
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{result.score}%</div>
                        <p className="text-xs text-muted-foreground">
                          {new Date(result.completedAt).toLocaleDateString()}
                        </p>
                      </div>
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

export default QuizApp;
