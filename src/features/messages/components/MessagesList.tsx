
import React from 'react';
import { cn } from '@/lib/utils';
import { Chat } from '../types';

interface MessagesListProps {
  messages: Chat[];
  activeChat: string | null;
  onChatClick: (chatId: string) => void;
}

const MessagesList: React.FC<MessagesListProps> = ({ 
  messages,
  activeChat,
  onChatClick
}) => {
  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((chat) => (
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
  );
};

export default MessagesList;
