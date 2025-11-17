import React, { useState } from 'react';
import type { AppProps } from '@/src/system/types';
import type { Persona } from '@/src/lib/types';
import ThreePanelLayout from '@/src/components/layouts/ThreePanelLayout';
import AIAssistantPanel from '@/src/shared/components/ai/AIAssistantPanel';
import PeopleSearch from './components/PeopleSearch';
import ProfileCard from './components/ProfileCard';
import { Users, TrendingUp, Award, Briefcase } from 'lucide-react';

const PeopleApp: React.FC<AppProps> = ({ appId, systemServices }) => {
  const [persona, setPersona] = useState<Persona>('Agent Zero');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All People', icon: Users },
    { id: 'politicians', label: 'Politicians', icon: Award },
    { id: 'activists', label: 'Activists', icon: TrendingUp },
    { id: 'business', label: 'Business', icon: Briefcase }
  ];

  // Mock data
  const mockProfiles = [
    { id: '1', name: 'Example Leader', title: 'Governor', location: 'Lagos State', category: 'politicians' },
    { id: '2', name: 'Example Activist', title: 'Civil Rights Advocate', location: 'Abuja', category: 'activists' },
    { id: '3', name: 'Example CEO', title: 'Tech Entrepreneur', location: 'Lagos State', category: 'business' }
  ];

  const handleSearch = (query: string, filters: any) => {
    systemServices.setToastMessage(`Searching: ${query}`);
  };

  const handleProfileClick = (profile: any) => {
    systemServices.setToastMessage(`Opening profile: ${profile.name}`);
  };

  const leftPanel = (
    <div className="h-full flex flex-col p-4">
      <h2 className="text-xl font-bold text-foreground mb-6">People Directory</h2>
      
      <nav className="space-y-2">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-primary/10 border border-primary/40 text-primary shadow-lg'
                  : 'hover:bg-secondary border border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{cat.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto pt-4 border-t border-border">
        <div className="text-xs text-muted-foreground space-y-1">
          <p>Total Profiles: 1,247</p>
          <p>Politicians: 423</p>
          <p>Activists: 198</p>
          <p>Business: 626</p>
        </div>
      </div>
    </div>
  );

  const centerPanel = (
    <div className="h-full flex flex-col">
      <PeopleSearch onSearch={handleSearch} />
      
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockProfiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              {...profile}
              onClick={() => handleProfileClick(profile)}
            />
          ))}
        </div>
        
        <div className="mt-8 text-center text-muted-foreground text-sm">
          <p>More profiles coming soon...</p>
        </div>
      </div>
    </div>
  );

  const rightPanel = (
    <AIAssistantPanel
      persona={persona}
      setPersona={setPersona}
      suggestions={[
        'Show me governors',
        'Find activists in Lagos',
        'Compare politicians',
        'Show business leaders'
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

export default PeopleApp;
