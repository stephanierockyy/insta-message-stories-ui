import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Plus, Video, Paperclip, Mic, Smile, Phone, Search, ArrowLeft } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import StoryCircle from '@/components/StoryCircle';
import MessageItem from '@/components/MessageItem';
import MessageComposer from '@/components/MessageComposer';
import BottomNavigation from '@/components/BottomNavigation';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

// Sample data
const SAMPLE_STORIES = [
  {
    id: '1',
    name: 'Your story',
    avatar: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=50&h=50&fit=crop',
    isUser: true
  },
  {
    id: '2',
    name: 'foodie_adventures',
    avatar: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=50&h=50&fit=crop',
    seen: false
  },
  {
    id: '3',
    name: 'interior_design',
    avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=50&h=50&fit=crop',
    seen: false
  },
  {
    id: '4',
    name: 'cat_lover',
    avatar: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=50&h=50&fit=crop',
    seen: false
  },
  {
    id: '5',
    name: 'travel_junkie',
    avatar: 'https://images.unsplash.com/photo-1501286353178-1ec881214838?w=50&h=50&fit=crop',
    seen: true
  }
];

const SAMPLE_MESSAGES = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=50&h=50&fit=crop',
    lastMessage: 'Did you see my last story?',
    time: '2m ago',
    unread: true
  },
  {
    id: '2',
    name: 'Mike Peters',
    avatar: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=50&h=50&fit=crop',
    lastMessage: 'The concert was amazing! 🎸',
    time: '45m ago',
    unread: false
  },
  {
    id: '3',
    name: 'Emily Davis',
    avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=50&h=50&fit=crop',
    lastMessage: 'Let me know what you think about the new design',
    time: '2h ago',
    unread: false
  },
  {
    id: '4',
    name: 'James Wilson',
    avatar: 'https://images.unsplash.com/photo-1501286353178-1ec881214838?w=50&h=50&fit=crop',
    lastMessage: 'Check out these vacation photos!',
    time: '1d ago',
    unread: false
  }
];

const CONVERSATION_MESSAGES = [
  {
    id: '1',
    text: 'Hey, how are you doing?',
    sender: 'other' as const,
    time: '10:30 AM'
  },
  {
    id: '2',
    text: 'I\'m good, thanks! Just saw your story. That food looks amazing!',
    sender: 'user' as const,
    time: '10:32 AM',
    isRead: true
  },
  {
    id: '3',
    text: 'Yeah, the restaurant was incredible. We should go there sometime!',
    sender: 'other' as const,
    time: '10:33 AM'
  },
  {
    id: '4',
    text: 'Definitely! Are you free this weekend?',
    sender: 'user' as const,
    time: '10:35 AM',
    isRead: true
  },
  {
    id: '5',
    text: 'Saturday works for me. Should we invite the others too?',
    sender: 'other' as const,
    time: '10:36 AM'
  }
];

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'messages' | 'chat'>('messages');
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messages, setMessages] = useState(CONVERSATION_MESSAGES);
  const isMobile = useIsMobile();
  
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

  // Desktop layout
  if (!isMobile) {
    return (
      <div className="h-screen flex bg-gray-100">
        {/* Left sidebar - conversations list */}
        <div className="w-1/3 border-r border-gray-200 bg-white flex flex-col h-full overflow-hidden">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 p-4 flex items-center">
            <h1 className="text-xl font-semibold flex-1">Messages</h1>
            <div className="flex items-center space-x-4">
              <button className="text-purple-500">
                <Edit size={22} />
              </button>
            </div>
          </header>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto">
            {SAMPLE_MESSAGES.map((chat) => (
              <button
                key={chat.id}
                className={cn(
                  "w-full flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 text-left",
                  activeChat === chat.id ? "bg-gray-100" : ""
                )}
                onClick={() => handleChatClick(chat.id)}
              >
                <div className="relative">
                  <img 
                    src={chat.avatar} 
                    alt={chat.name}
                    className="w-12 h-12 rounded-full object-cover" 
                  />
                  {/* Online indicator */}
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

        {/* Right side - chat area */}
        <div className="w-2/3 flex flex-col h-full bg-white">
          {activeChat ? (
            <>
              {/* Chat header */}
              <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 shadow-sm">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 bg-purple-400">
                      <AvatarImage
                        src={SAMPLE_MESSAGES.find(msg => msg.id === activeChat)?.avatar}
                        alt="Profile"
                      />
                      <AvatarFallback className="text-white font-semibold">
                        {SAMPLE_MESSAGES.find(msg => msg.id === activeChat)?.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <h2 className="text-base font-medium">
                        {SAMPLE_MESSAGES.find(msg => msg.id === activeChat)?.name}
                      </h2>
                      <p className="text-xs text-gray-500">Active now</p>
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

              {/* Chat messages */}
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
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

              {/* Message composer */}
              <MessageComposer onSendMessage={handleSendMessage} />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Edit size={24} className="text-gray-500" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Click to start a conversation</h2>
                <p className="text-gray-500 mt-2">Select a chat from the sidebar</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Mobile layout - existing code
  return (
    <div className="mobile-container bg-white flex flex-col">
      {/* Header */}
      {activeTab === 'messages' ? (
        <header className="bg-white border-b border-gray-200 p-4 flex items-center">
          <h1 className="text-xl font-semibold flex-1">Messages</h1>
          <div className="flex items-center space-x-4">
            <button className="text-purple-500">
              <Paperclip size={22} />
            </button>
            <button className="text-purple-500">
              <Edit size={22} />
            </button>
          </div>
        </header>
      ) : (
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 shadow-sm">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <button 
                onClick={handleBackToMessages}
                className="mr-3"
                aria-label="Back"
              >
                <ArrowLeft size={24} className="text-gray-800" />
              </button>
              <Avatar className="h-10 w-10 bg-purple-400">
                <AvatarImage
                  src={activeChat ? SAMPLE_MESSAGES.find(msg => msg.id === activeChat)?.avatar : undefined}
                  alt="Profile"
                />
                <AvatarFallback className="text-white font-semibold">H</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <h2 className="text-base font-medium">
                  {activeChat ? SAMPLE_MESSAGES.find(msg => msg.id === activeChat)?.name : 'hey'}
                </h2>
                <p className="text-xs text-gray-500">{activeChat ? 'Active now' : '1 member'}</p>
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
      )}
      
      {activeTab === 'messages' ? (
        <React.Fragment>
          {/* Stories row */}
          <div className="py-3 px-1 border-b border-gray-100">
            <div className="flex space-x-4 overflow-x-auto hide-scrollbar pl-4 pr-4">
              {SAMPLE_STORIES.map((story, index) => (
                <div key={story.id} className="flex-shrink-0">
                  {index === 0 ? (
                    <div className="relative">
                      <StoryCircle 
                        id={story.id}
                        name={story.name}
                        avatar={story.avatar}
                        seen={story.seen}
                      />
                      <button 
                        className="absolute bottom-5 right-0 bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center border-2 border-white"
                        aria-label="Add story"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  ) : (
                    <StoryCircle 
                      id={story.id}
                      name={story.name}
                      avatar={story.avatar}
                      seen={story.seen}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Messages list */}
          <div className="flex-1 overflow-y-auto">
            {SAMPLE_MESSAGES.map((chat) => (
              <button
                key={chat.id}
                className="w-full flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 text-left"
                onClick={() => handleChatClick(chat.id)}
              >
                <div className="relative">
                  <img 
                    src={chat.avatar} 
                    alt={chat.name}
                    className="w-12 h-12 rounded-full object-cover" 
                  />
                  {/* Online indicator */}
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="font-semibold text-gray-900">{chat.name}</h3>
                  <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
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
        </React.Fragment>
      ) : (
        <React.Fragment>
          {/* Chat view - adjusted with padding-top to account for fixed header */}
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
          
          {/* Message composer */}
          <MessageComposer onSendMessage={handleSendMessage} />
        </React.Fragment>
      )}
      
      {/* Bottom navigation - no longer used but kept for reference */}
      <div className="h-14">
        <BottomNavigation />
      </div>
    </div>
  );
};

export default Index;
