
import React from 'react';
import StoryCircle from '@/components/StoryCircle';
import { Story } from '../types';

interface StoriesRowProps {
  stories: Story[];
}

const StoriesRow: React.FC<StoriesRowProps> = ({ stories }) => {
  return (
    <div className="py-3 px-1 border-b border-gray-100">
      <div className="flex space-x-4 overflow-x-auto hide-scrollbar pl-4 pr-4">
        {stories.map((story) => (
          <div key={story.id} className="flex-shrink-0">
            <StoryCircle 
              id={story.id}
              name={story.name}
              avatar={story.avatar}
              seen={story.seen}
              showAddButton={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoriesRow;
