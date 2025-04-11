
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X, MessageCircle, Heart, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Story {
  id: string;
  imageUrl: string;
  username: string;
  userAvatar: string;
  timestamp: string;
}

interface StoryViewerProps {
  stories: Story[];
  initialStoryIndex?: number;
  onClose: () => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({ 
  stories, 
  initialStoryIndex = 0,
  onClose 
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialStoryIndex);
  const [isPaused, setIsPaused] = useState(false);
  const [progressBars, setProgressBars] = useState<boolean[]>(
    stories.map((_, index) => index < initialStoryIndex)
  );
  
  const navigate = useNavigate();
  const storyTimeout = useRef<NodeJS.Timeout | null>(null);
  const story = stories[currentIndex];

  const resetTimeout = () => {
    if (storyTimeout.current) {
      clearTimeout(storyTimeout.current);
    }
  };

  const startStoryProgress = () => {
    resetTimeout();
    
    if (!isPaused) {
      storyTimeout.current = setTimeout(() => {
        goToNextStory();
      }, 5000);
    }
  };
  
  useEffect(() => {
    startStoryProgress();
    
    return () => resetTimeout();
  }, [currentIndex, isPaused]);

  const updateProgressBars = (index: number) => {
    setProgressBars((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  const goToPrevStory = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      updateProgressBars(currentIndex - 1);
    } else {
      // At first story, close viewer
      onClose();
    }
  };

  const goToNextStory = () => {
    if (currentIndex < stories.length - 1) {
      updateProgressBars(currentIndex);
      setCurrentIndex(currentIndex + 1);
    } else {
      // At last story, close viewer
      onClose();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touchX = e.touches[0].clientX;
    const screenWidth = window.innerWidth;
    
    setIsPaused(true);
    
    if (touchX < screenWidth / 3) {
      goToPrevStory();
    } else if (touchX > (screenWidth / 3) * 2) {
      goToNextStory();
    }
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
  };
  
  if (!story) return null;

  return (
    <div 
      className="fixed inset-0 bg-black z-50 flex flex-col"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute top-0 left-0 right-0 z-10 p-4">
        {/* Progress bars */}
        <div className="flex space-x-1 mb-3">
          {stories.map((_, index) => (
            <div 
              key={`progress-${index}`} 
              className="h-1 bg-gray-500 bg-opacity-50 flex-1 rounded-full overflow-hidden"
            >
              {index === currentIndex && !isPaused && (
                <div className="h-full bg-white animate-story-progress" />
              )}
              {index < currentIndex || progressBars[index] ? (
                <div className="h-full bg-white w-full" />
              ) : null}
            </div>
          ))}
        </div>
        
        {/* User info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src={story.userAvatar} 
              alt={story.username}
              className="w-8 h-8 rounded-full border-2 border-white" 
            />
            <div className="ml-2">
              <p className="text-white font-semibold text-sm">{story.username}</p>
              <p className="text-white text-opacity-70 text-xs">{story.timestamp}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white p-1">
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Main story content */}
      <div className="flex-1 flex items-center justify-center">
        <img 
          src={story.imageUrl} 
          alt="Story"
          className="max-w-full max-h-full object-contain"
        />
      </div>

      {/* Navigation buttons */}
      <button 
        onClick={goToPrevStory}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white p-1 opacity-0"
      >
        <ChevronLeft size={30} />
      </button>
      
      <button 
        onClick={goToNextStory}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white p-1 opacity-0"
      >
        <ChevronRight size={30} />
      </button>

      {/* Reply bar */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
        <div className="flex items-center bg-white bg-opacity-10 backdrop-blur-sm rounded-full p-2">
          <input 
            type="text" 
            placeholder="Reply to story..." 
            className="bg-transparent border-none flex-1 text-white placeholder-white placeholder-opacity-70 outline-none px-2"
          />
          <div className="flex items-center space-x-2">
            <button className="text-white p-1">
              <Heart size={20} />
            </button>
            <button className="text-white p-1">
              <MessageCircle size={20} />
            </button>
            <button className="text-white p-1">
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryViewer;
