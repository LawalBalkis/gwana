import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

interface PeopleSearchProps {
  onSearch: (query: string, filters: any) => void;
}

const PeopleSearch: React.FC<PeopleSearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const handleSearch = () => {
    onSearch(query, { category });
  };

  return (
    <div className="p-4 border-b border-border">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search people..."
            className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All</option>
          <option value="politicians">Politicians</option>
          <option value="activists">Activists</option>
          <option value="business">Business Leaders</option>
          <option value="traditional">Traditional Rulers</option>
        </select>
      </div>
    </div>
  );
};

export default PeopleSearch;
