
import React from 'react';
import { Chat } from '../types';

interface SearchResultsProps {
  results: Chat[];
  query: string;
  onChatClick: (chatId: string) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ 
  results, 
  query, 
  onChatClick 
}) => {
  if (query.trim() === '') {
    return null;
  }

  return (
    <div className="p-4 border-b border-gray-200">
      <h3 className="text-sm font-medium text-gray-500 mb-2">Search Results</h3>
      {results.length > 0 ? (
        <div className="space-y-2">
          {results.map((chat) => (
            <button
              key={chat.id}
              className="flex items-center w-full p-2 hover:bg-gray-100 rounded-md text-left"
              onClick={() => onChatClick(chat.id)}
            >
              <img 
                src={chat.avatar} 
                alt={chat.name}
                className="w-8 h-8 rounded-full object-cover" 
              />
              <div className="ml-2">
                <p className="font-medium text-sm">{chat.name}</p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center py-3 text-gray-500">
          <p>No records found</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
