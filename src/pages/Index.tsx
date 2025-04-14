
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { Message } from '@/features/messages/types';
import { SAMPLE_STORIES, SAMPLE_MESSAGES, CONVERSATION_MESSAGES } from '@/features/messages/data';
import MobileLayout from '@/features/messages/components/MobileLayout';
import DesktopLayout from '@/features/messages/components/DesktopLayout';

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'messages' | 'chat'>('messages');
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>(CONVERSATION_MESSAGES);
  const isMobile = useIsMobile();
  const [isInitialized, setIsInitialized] = useState(false);
  
  useEffect(() => {
    setIsInitialized(true);
  }, []);
  
  const handleSendMessage = (text: string) => {
    const newMessage = {
      id: `${messages.length + 1}`,
      text,
      sender: 'user' as const,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: false
    };
    
    setMessages([...messages, newMessage]);
  };

  const handleChatClick = (chatId: string) => {
    setActiveChat(chatId);
    if (isMobile) {
      setActiveTab('chat');
    }
  };

  const handleBackToMessages = () => {
    if (isMobile) {
      setActiveTab('messages');
    }
    setActiveChat(null);
  };

  if (!isInitialized) {
    return null;
  }

  if (!isMobile) {
    return (
      <DesktopLayout
        activeChat={activeChat}
        messages={messages}
        onChatClick={handleChatClick}
        onSendMessage={handleSendMessage}
      />
    );
  }

  return (
    <MobileLayout
      activeTab={activeTab}
      activeChat={activeChat}
      messages={messages}
      stories={SAMPLE_STORIES}
      onChatClick={handleChatClick}
      onBackToMessages={handleBackToMessages}
      onSendMessage={handleSendMessage}
    />
  );
};

export default Index;
