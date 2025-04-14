
import React from 'react';
import MessageItem from '@/components/MessageItem';
import MessageComposer from '@/components/MessageComposer';
import { Message } from '../types';

interface ChatContentProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
}

const ChatContent: React.FC<ChatContentProps> = ({ messages, onSendMessage }) => {
  return (
    <>
      <div className="flex-1 overflow-y-auto p-4 pt-16">
        {messages.map((message) => (
          <MessageItem
            key={message.id}
            id={message.id}
            text={message.text}
            sender={message.sender}
            time={message.time}
            isRead={message.isRead}
          />
        ))}
      </div>
      
      <MessageComposer onSendMessage={onSendMessage} />
    </>
  );
};

export default ChatContent;
