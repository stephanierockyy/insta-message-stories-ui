
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StoryViewer from '@/components/StoryViewer';

// Sample story data
const SAMPLE_STORIES = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
    username: 'foodie_adventures',
    userAvatar: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=50&h=50&fit=crop',
    timestamp: '2h ago'
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04',
    username: 'interior_design',
    userAvatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=50&h=50&fit=crop',
    timestamp: '4h ago'
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
    username: 'cat_lover',
    userAvatar: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=50&h=50&fit=crop',
    timestamp: '6h ago'
  }
];

const StoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Find initial index based on story id
  const initialIndex = SAMPLE_STORIES.findIndex(story => story.id === id) || 0;
  
  const handleClose = () => {
    navigate('/');
  };
  
  return (
    <StoryViewer 
      stories={SAMPLE_STORIES}
      initialStoryIndex={initialIndex}
      onClose={handleClose}
    />
  );
};

export default StoryPage;
