
import React from 'react';
import { cn } from '@/lib/utils';

interface MessageItemProps {
  id: string;
  text: string;
  sender: 'user' | 'other';
  time: string;
  isRead?: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ 
  text, 
  sender, 
  time, 
  isRead = false 
}) => {
  const isUser = sender === 'user';
  
  return (
    <div className={cn(
      "flex items-end mb-4", 
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-300 mr-2 flex-shrink-0" />
      )}
      <div>
        <div className={cn(
          "px-4 py-2 max-w-xs",
          isUser 
            ? "message-sent text-white" 
            : "message-received text-gray-800"
        )}>
          <p className="text-sm">{text}</p>
        </div>
        <div className={cn(
          "flex items-center mt-1 text-xs", 
          isUser ? "justify-end" : "justify-start"
        )}>
          <span className="text-gray-500">{time}</span>
          {isUser && (
            <span className="ml-1">
              {isRead ? (
                <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              ) : (
                <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              )}
            </span>
          )}
        </div>
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-300 ml-2 flex-shrink-0" />
      )}
    </div>
  );
};

export default MessageItem;
