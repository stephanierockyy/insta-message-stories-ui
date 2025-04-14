
import React from 'react';
import { Search } from 'lucide-react';

interface MessagesHeaderProps {
  title: string;
}

const MessagesHeader: React.FC<MessagesHeaderProps> = ({ title }) => {
  return (
    <header className="bg-white p-4 flex items-center">
      <h1 className="text-xl font-semibold flex-1">{title}</h1>
      <div className="flex items-center space-x-4">
        <button className="text-purple-500">
          <img 
            src="/lovable-uploads/19c823ce-69ef-4156-ac20-9171b69bd814.png" 
            alt="Camera" 
            className="w-6 h-6"
          />
        </button>
        <button className="text-black">
          <Search size={22} />
        </button>
      </div>
    </header>
  );
};

export default MessagesHeader;
