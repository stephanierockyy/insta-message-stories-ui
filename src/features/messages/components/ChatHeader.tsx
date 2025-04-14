
import React from 'react';
import { Search, Phone, ArrowLeft } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Chat } from '../types';

interface ChatHeaderProps {
  chat?: Chat;
  onBackClick?: () => void;
  showBackButton?: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  chat,
  onBackClick,
  showBackButton = false
}) => {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 shadow-sm">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          {showBackButton && (
            <button 
              onClick={onBackClick}
              className="mr-3"
              aria-label="Back"
            >
              <ArrowLeft size={24} className="text-gray-800" />
            </button>
          )}
          <Avatar className="h-10 w-10 bg-purple-400">
            <AvatarImage
              src={chat?.avatar}
              alt="Profile"
            />
            <AvatarFallback className="text-white font-semibold">
              {chat ? chat.name.charAt(0) : 'H'}
            </AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <h2 className="text-base font-medium">
              {chat ? chat.name : 'hey'}
            </h2>
            <p className="text-xs text-gray-500">{chat ? 'Active now' : '1 member'}</p>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <button className="text-gray-800" aria-label="Search">
            <Search size={24} />
          </button>
          <button className="text-gray-800" aria-label="Call">
            <Phone size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
