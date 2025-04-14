
import React from 'react';
import { Edit } from 'lucide-react';

const EmptyChatPlaceholder: React.FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <Edit size={24} className="text-gray-500" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Click to start a conversation</h2>
        <p className="text-gray-500 mt-2">Select a chat from the sidebar</p>
      </div>
    </div>
  );
};

export default EmptyChatPlaceholder;
