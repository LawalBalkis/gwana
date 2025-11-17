import React from 'react';
import { BookOpen } from 'lucide-react';
import type { StudyProgress } from '@/src/lib/types';

/**
 * LegacyStudyHubScreen - Fallback for old study-hub imports
 * This is a placeholder component for backwards compatibility
 */
const LegacyStudyHubScreen: React.FC = () => {
  return (
    <div className="h-full flex items-center justify-center bg-[var(--bg-primary)]">
      <div className="text-center">
        <BookOpen size={48} className="mx-auto mb-4 text-[var(--accent-cyan)]" />
        <p className="text-[var(--text-secondary)]">
          Study Hub has been refactored. Please use the Study App instead.
        </p>
      </div>
    </div>
  );
};

export const ProgressTracker: React.FC<{ progress: StudyProgress }> = ({ progress }) => {
  return (
    <div className="bg-black/30 border border-[var(--border-color)] p-4 rounded-md">
      <p className="text-sm text-[var(--text-secondary)]">Progress Tracker</p>
    </div>
  );
};

export default LegacyStudyHubScreen;
