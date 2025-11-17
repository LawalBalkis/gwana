import React, { useState } from 'react';
import type { AppProps } from '@/src/system/types';
import type { Persona } from '@/src/lib/types';
import ThreePanelLayout from '@/src/components/layouts/ThreePanelLayout';
import AIAssistantPanel from '@/src/shared/components/ai/AIAssistantPanel';
import { Building2, MapPin, FileText } from 'lucide-react';

// Mock states data
const NIGERIAN_STATES = [
  { code: 'la', name: 'Lagos' },
  { code: 'ab', name: 'Abuja FCT' },
  { code: 'ka', name: 'Kano' }
];

const GovernmentApp: React.FC<AppProps> = ({ appId, systemServices }) => {
  const [persona, setPersona] = useState<Persona>('Agent Zero');
  const [selectedState, setSelectedState] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'profile' | 'lgas' | 'services'>('profile');

  const tabs = [
    { id: 'profile' as const, label: 'State Profile', icon: Building2 },
    { id: 'lgas' as const, label: 'LGAs', icon: MapPin },
    { id: 'services' as const, label: 'Services', icon: FileText }
  ];

  const leftPanel = (
    <div className="h-full flex flex-col p-4">
      <h2 className="text-xl font-bold text-foreground mb-6">Government Hub</h2>
      
      <div className="mb-4">
        <label className="text-sm text-muted-foreground mb-2 block">Select State</label>
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">All States</option>
          {NIGERIAN_STATES.map((state) => (
            <option key={state.code} value={state.code}>
              {state.name}
            </option>
          ))}
        </select>
      </div>

      <nav className="space-y-2 flex-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-primary/10 border border-primary/40 text-primary'
                  : 'hover:bg-secondary border border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto pt-4 border-t border-border text-xs text-muted-foreground">
        <p>36 States + FCT</p>
        <p>774 LGAs</p>
      </div>
    </div>
  );

  const centerPanel = (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto">
        {!selectedState ? (
          <div className="text-center py-12">
            <Building2 size={64} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Select a State</h3>
            <p className="text-muted-foreground">
              Choose a state from the left panel to view its information
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {NIGERIAN_STATES.find(s => s.code === selectedState)?.name} State
            </h2>
            
            {activeTab === 'profile' && (
              <div className="space-y-4">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-4">State Information</h3>
                  <p className="text-muted-foreground">Detailed state profile coming soon...</p>
                </div>
              </div>
            )}
            
            {activeTab === 'lgas' && (
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4">Local Government Areas</h3>
                <p className="text-muted-foreground">LGA directory coming soon...</p>
              </div>
            )}
            
            {activeTab === 'services' && (
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4">Government Services</h3>
                <p className="text-muted-foreground">Service directory coming soon...</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const rightPanel = (
    <AIAssistantPanel
      persona={persona}
      setPersona={setPersona}
      suggestions={[
        'Show me Lagos LGAs',
        'Compare state budgets',
        'Find government services',
        'Show state governors'
      ]}
      onSuggestionClick={(suggestion) => systemServices.setToastMessage(suggestion)}
    />
  );

  return (
    <div className="h-full w-full bg-background">
      <ThreePanelLayout
        leftPanel={leftPanel}
        centerPanel={centerPanel}
        rightPanel={rightPanel}
      />
    </div>
  );
};

export default GovernmentApp;
