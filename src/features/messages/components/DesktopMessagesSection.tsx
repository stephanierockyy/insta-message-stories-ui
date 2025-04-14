
import React, { useState } from 'react';
import { Edit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Chat } from '../types';
import SearchBox from './SearchBox';
import SearchResults from './SearchResults';

interface DesktopMessagesSectionProps {
  messages: Chat[];
  activeChat: string | null;
  onChatClick: (chatId: string) => void;
}

const DesktopMessagesSection: React.FC<DesktopMessagesSectionProps> = ({ 
  messages,
  activeChat,
  onChatClick
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Chat[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    // Filter messages based on search query
    const results = messages.filter(chat => 
      chat.name.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(results);
  };

  // Show all messages if not searching
  const displayedMessages = searchQuery.trim() === '' ? messages : messages;

  return (
    <div className="w-1/3 border-r border-gray-200 bg-white flex flex-col h-full overflow-hidden">
      <header className="bg-white border-b border-gray-200 p-4 flex items-center">
        <h1 className="text-xl font-semibold flex-1">Messages</h1>
        <div className="flex items-center space-x-4">
          <button className="text-purple-500">
            <Edit size={22} />
          </button>
        </div>
      </header>

      <SearchBox onSearch={handleSearch} />
      
      {searchQuery.trim() !== '' && (
        <SearchResults 
          results={searchResults} 
          query={searchQuery} 
          onChatClick={onChatClick} 
        />
      )}

      <div className="flex-1 overflow-y-auto">
        {displayedMessages.map((chat) => (
          <button
            key={chat.id}
            className={cn(
              "w-full flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 text-left",
              activeChat === chat.id ? "bg-gray-100" : ""
            )}
            onClick={() => onChatClick(chat.id)}
          >
            <div className="relative">
              <img 
                src={chat.avatar} 
                alt={chat.name}
                className="w-12 h-12 rounded-full object-cover" 
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            </div>
            <div className="ml-3 flex-1">
              <h3 className={cn(
                "font-semibold",
                chat.unread ? "text-black" : "text-gray-900"
              )}>
                {chat.name}
              </h3>
              <p className={cn(
                "text-sm truncate",
                chat.unread ? "font-semibold text-black" : "text-gray-600"
              )}>
                {chat.lastMessage}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">{chat.time}</p>
              {chat.unread && (
                <span className="inline-block w-3 h-3 bg-purple-500 rounded-full mt-1" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DesktopMessagesSection;
