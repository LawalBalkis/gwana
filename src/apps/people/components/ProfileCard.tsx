import React from 'react';
import { User, MapPin, Briefcase } from 'lucide-react';

interface ProfileCardProps {
  name: string;
  title: string;
  location: string;
  category: string;
  imageUrl?: string;
  onClick: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  title,
  location,
  category,
  imageUrl,
  onClick
}) => {
  const getCategoryColor = (cat: string) => {
    const colors: Record<string, string> = {
      politicians: 'text-blue-400',
      activists: 'text-green-400',
      business: 'text-yellow-400',
      traditional: 'text-purple-400'
    };
    return colors[cat] || 'text-muted-foreground';
  };

  return (
    <button
      onClick={onClick}
      className="w-full p-4 bg-card border border-border rounded-lg hover:border-primary/50 hover:shadow-lg transition-all duration-200 text-left group"
    >
      <div className="flex items-start gap-4">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-16 h-16 rounded-full object-cover border-2 border-border group-hover:border-primary transition-colors"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-secondary border-2 border-border group-hover:border-primary transition-colors flex items-center justify-center">
            <User size={32} className="text-muted-foreground" />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
            <Briefcase size={14} />
            <span className="truncate">{title}</span>
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            <MapPin size={12} />
            {location}
          </p>
          <span className={`text-xs font-medium mt-2 inline-block ${getCategoryColor(category)}`}>
            {category}
          </span>
        </div>
      </div>
    </button>
  );
};

export default ProfileCard;
