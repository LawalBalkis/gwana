import React, { useState } from 'react';
import type { AppProps } from '@/src/system/types';
import type { Persona } from '@/src/lib/types';
import ThreePanelLayout from '@/src/components/layouts/ThreePanelLayout';
import AIAssistantPanel from '@/src/shared/components/ai/AIAssistantPanel';
import { AlertTriangle, Phone, MapPin, Siren } from 'lucide-react';

// Mock emergency contacts
const EMERGENCY_CONTACTS = {
  national: [
    { name: 'National Emergency', number: '112', description: '24/7 emergency response line' },
    { name: 'Police', number: '199', description: 'Nigeria Police Force' },
    { name: 'Fire Service', number: '111', description: 'Federal Fire Service' }
  ]
};

const EmergencyApp: React.FC<AppProps> = ({ appId, systemServices }) => {
  const [persona, setPersona] = useState<Persona>('Agent Zero');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Emergency', icon: AlertTriangle, color: 'text-red-500' },
    { id: 'medical', label: 'Medical', icon: Phone, color: 'text-green-500' },
    { id: 'security', label: 'Security', icon: Siren, color: 'text-blue-500' },
    { id: 'disaster', label: 'Disaster', icon: MapPin, color: 'text-orange-500' }
  ];

  const leftPanel = (
    <div className="h-full flex flex-col p-4">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="text-destructive" size={24} />
          <h2 className="text-xl font-bold text-foreground">Emergency</h2>
        </div>
        <p className="text-xs text-muted-foreground">24/7 Response Hub</p>
      </div>
      
      <nav className="space-y-2 flex-1">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-destructive/10 border border-destructive/40 shadow-lg'
                  : 'hover:bg-secondary border border-transparent'
              }`}
            >
              <Icon size={20} className={isActive ? cat.color : 'text-muted-foreground'} />
              <span className={`text-sm font-medium ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                {cat.label}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto pt-4 border-t border-border">
        <div className="bg-destructive/10 border border-destructive/40 rounded-lg p-3">
          <p className="text-xs font-semibold text-destructive mb-1">National Emergency</p>
          <a href="tel:112" className="text-lg font-bold text-foreground hover:text-destructive transition-colors">
            📞 112
          </a>
        </div>
      </div>
    </div>
  );

  const centerPanel = (
    <div className="h-full overflow-y-auto">
      <div className="bg-destructive/10 border-b border-destructive/20 p-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <AlertTriangle className="text-destructive" size={32} />
          <div>
            <h1 className="text-xl font-bold text-foreground">Emergency Response Directory</h1>
            <p className="text-sm text-muted-foreground">Quick access to emergency services nationwide</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {EMERGENCY_CONTACTS.national.map((contact, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg p-4 hover:border-destructive/40 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">{contact.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{contact.description}</p>
                </div>
                <a
                  href={`tel:${contact.number}`}
                  className="px-4 py-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <Phone size={16} />
                  {contact.number}
                </a>
              </div>
            </div>
          ))}

          <div className="mt-8 text-center text-muted-foreground text-sm">
            <p>State-specific contacts coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );

  const rightPanel = (
    <AIAssistantPanel
      persona={persona}
      setPersona={setPersona}
      suggestions={[
        'Find nearest hospital',
        'Show police stations',
        'Emergency protocols',
        'Disaster preparedness'
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

export default EmergencyApp;
