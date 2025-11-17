import React from 'react';

interface ThreePanelLayoutProps {
  leftPanel: React.ReactNode;
  centerPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  mobileView?: 'left' | 'center' | 'right';
}

/**
 * ThreePanelLayout - Reusable three-column desktop layout
 * Left: 280px navigation & controls
 * Center: Flexible main content
 * Right: 360px AI assistant & context
 * Mobile: Single panel view with bottom navigation
 */
const ThreePanelLayout: React.FC<ThreePanelLayoutProps> = ({
  leftPanel,
  centerPanel,
  rightPanel,
  mobileView = 'center'
}) => {
  return (
    <>
      {/* Desktop Layout - Three Panels (20% | 50% | 30%) */}
      <div className="hidden lg:flex h-full w-full">
        {/* Left Panel - Navigation & Controls (280px ~ 20%) */}
        <div className="w-[280px] flex-shrink-0 bg-background/50 backdrop-blur-sm border-r border-border overflow-y-auto">
          {leftPanel}
        </div>

        {/* Center Panel - Main Content (50%) */}
        <div className="flex-1 overflow-y-auto bg-background">
          {centerPanel}
        </div>

        {/* Right Panel - AI Assistant (360px ~ 30%) */}
        <div className="w-[360px] flex-shrink-0 bg-background/30 backdrop-blur-sm border-l border-border overflow-y-auto">
          {rightPanel}
        </div>
      </div>

      {/* Mobile Layout - Single Panel with Bottom Nav */}
      <div className="lg:hidden h-full w-full flex flex-col bg-background">
        {mobileView === 'left' && leftPanel}
        {mobileView === 'center' && centerPanel}
        {mobileView === 'right' && rightPanel}
      </div>
    </>
  );
};

export default ThreePanelLayout;
