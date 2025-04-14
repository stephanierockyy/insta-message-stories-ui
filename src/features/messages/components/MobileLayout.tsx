
import React from 'react';
import MessagesHeader from './MessagesHeader';
import StoriesRow from './StoriesRow';
import MessagesList from './MessagesList';
import ChatHeader from './ChatHeader';
import ChatContent from './ChatContent';
import BottomNavigation from '@/components/BottomNavigation';
import { Chat, Message, Story } from '../types';
import { SAMPLE_MESSAGES } from '../data';

interface MobileLayoutProps {
  activeTab: 'messages' | 'chat';
  activeChat: string | null;
  messages: Message[];
  stories: Story[];
  onChatClick: (chatId: string) => void;
  onBackToMessages: () => void;
  onSendMessage: (message: string) => void;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ 
  activeTab,
  activeChat,
  messages,
  stories,
  onChatClick,
  onBackToMessages,
  onSendMessage
}) => {
  const selectedChat = activeChat ? SAMPLE_MESSAGES.find(msg => msg.id === activeChat) : undefined;

  return (
    <div className="mobile-container bg-white flex flex-col h-screen">
      {activeTab === 'messages' ? (
        <>
          <MessagesHeader title="Messages" />
          <StoriesRow stories={stories} />
          <MessagesList 
            messages={SAMPLE_MESSAGES}
            activeChat={activeChat} 
            onChatClick={onChatClick}
          />
        </>
      ) : (
        <>
          <ChatHeader 
            chat={selectedChat}
            onBackClick={onBackToMessages}
            showBackButton={true}
          />
          <ChatContent 
            messages={messages}
            onSendMessage={onSendMessage}
          />
          <div className="h-0">
            <BottomNavigation />
          </div>
        </>
      )}
      
      {activeTab === 'messages' && (
        <div className="h-14">
          <BottomNavigation />
        </div>
      )}
    </div>
  );
};

export default MobileLayout;
