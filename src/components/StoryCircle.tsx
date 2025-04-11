
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface StoryCircleProps {
  id: string;
  name: string;
  avatar: string;
  seen?: boolean;
  className?: string;
}

const StoryCircle: React.FC<StoryCircleProps> = ({ id, name, avatar, seen = false, className }) => {
  return (
    <Link to={`/story/${id}`} className="flex flex-col items-center space-y-1">
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
      </div>
      <span className="text-xs text-center font-medium truncate max-w-[64px]">
        {name}
      </span>
    </Link>
  );
};

export default StoryCircle;
