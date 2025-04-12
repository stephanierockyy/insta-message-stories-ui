
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

// This component is now deprecated as stories lead directly to chats
const StoryViewer: React.FC<StoryViewerProps> = ({ 
  stories, 
  initialStoryIndex = 0,
  onClose 
}) => {
  // Navigate to chat instead of showing story viewer
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to chat page instead
    const story = stories[initialStoryIndex];
    if (story) {
      navigate(`/chat/${story.id}`);
    } else {
      onClose();
    }
  }, []);
  
  return null; // Don't render anything
};

export default StoryViewer;
