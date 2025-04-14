
import React from 'react';
import DesktopMessagesSection from './DesktopMessagesSection';
import ChatHeader from './ChatHeader';
import EmptyChatPlaceholder from './EmptyChatPlaceholder';
import ChatContent from './ChatContent';
import { Chat, Message } from '../types';
import { SAMPLE_MESSAGES } from '../data';

interface DesktopLayoutProps {
  activeChat: string | null;
  messages: Message[];
  onChatClick: (chatId: string) => void;
  onSendMessage: (message: string) => void;
}

const DesktopLayout: React.FC<DesktopLayoutProps> = ({
  activeChat,
  messages,
  onChatClick,
  onSendMessage
}) => {
  const selectedChat = activeChat ? SAMPLE_MESSAGES.find(msg => msg.id === activeChat) : undefined;

  return (
    <div className="h-screen flex bg-gray-100">
      <DesktopMessagesSection 
        messages={SAMPLE_MESSAGES}
        activeChat={activeChat}
        onChatClick={onChatClick}
      />

      <div className="w-2/3 flex flex-col h-full bg-white">
        {activeChat ? (
          <>
            <ChatHeader chat={selectedChat} />
            <ChatContent 
              messages={messages}
              onSendMessage={onSendMessage}
            />
          </>
        ) : (
          <EmptyChatPlaceholder />
        )}
      </div>
    </div>
  );
};

export default DesktopLayout;
