
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';

interface StoryCircleProps {
  id: string;
  name: string;
  avatar: string;
  seen?: boolean;
  className?: string;
  showAddButton?: boolean;
}

const StoryCircle: React.FC<StoryCircleProps> = ({ 
  id, 
  name, 
  avatar, 
  seen = false, 
  className,
  showAddButton = false 
}) => {
  return (
    <Link to={`/chat/${id}`} className="flex flex-col items-center space-y-1">
      <div 
        className={cn(
          "relative w-16 h-16 rounded-full p-[2px]",
          seen ? "bg-gray-300" : "story-gradient-border animate-pulse",
          className
        )}
      >
        <img 
          src={avatar} 
          alt={name} 
          className="w-full h-full object-cover rounded-full border-2 border-white"
        />
        {showAddButton && (
          <button 
            className="absolute bottom-0 right-0 bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center border-2 border-white"
            aria-label="Add story"
          >
            <Plus size={14} />
          </button>
        )}
      </div>
      <span className="text-xs text-center font-medium truncate max-w-[64px]">
        {name}
      </span>
    </Link>
  );
};

export default StoryCircle;
