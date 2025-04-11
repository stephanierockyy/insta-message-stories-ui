
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Smile, Mic, Phone, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';

interface ChatNavBarProps {
  title: string;
  subtitle?: string;
  avatarSrc?: string;
  onBack?: () => void;
}

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  // For messages view navigation
  const MessagesNavBar = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-100 border-t border-gray-200 h-16">
      <div className="h-full flex items-center px-4 justify-between">
        <button className="p-2" aria-label="Attachment">
          <img 
            src="/lovable-uploads/19c823ce-69ef-4156-ac20-9171b69bd814.png" 
            alt="Camera" 
            className="w-6 h-6"
          />
        </button>
        <div className="flex-1 mx-4">
          <div className="bg-white border border-gray-300 rounded-full px-4 py-2 text-gray-400">
            Message
          </div>
        </div>
        <button className="p-2" aria-label="Emoji">
          <Smile size={26} className="text-gray-800" />
        </button>
        <button className="p-2 ml-2" aria-label="Voice">
          <Mic size={26} className="text-gray-800" />
        </button>
      </div>
    </div>
  );

  // Chat navigation bar component - can be used in both mobile and desktop
  const ChatNavBar: React.FC<ChatNavBarProps> = ({ title, subtitle, avatarSrc, onBack }) => (
    <div className={cn(
      "bg-white h-16 shadow-sm z-10",
      isMobile ? "fixed top-0 left-0 right-0" : ""
    )}>
      <div className="h-full flex items-center px-4 justify-between">
        <div className="flex items-center">
          {onBack && (
            <button onClick={onBack} className="p-2 mr-2" aria-label="Back">
              <ArrowLeft size={24} className="text-gray-800" />
            </button>
          )}
          <Avatar className="h-10 w-10 bg-purple-400">
            <AvatarImage src={avatarSrc} alt={title} />
            <AvatarFallback className="text-white font-semibold">{title?.[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <div className="text-base font-medium">{title}</div>
            <div className="text-xs text-gray-500">{subtitle || '1 member'}</div>
          </div>
        </div>
        <div className="flex space-x-6">
          <button className="p-1.5" aria-label="Search">
            <Search size={24} className="text-gray-800" />
          </button>
          <button className="p-1.5" aria-label="Call">
            <Phone size={24} className="text-gray-800" />
          </button>
        </div>
      </div>
    </div>
  );

  // This component now exports reusable navigation components that can be used in mobile and desktop layouts
  return null;
};

// Export the ChatNavBar as a named export so we can use it in other components
export const ChatNavBar: React.FC<ChatNavBarProps> = ({ title, subtitle, avatarSrc, onBack }) => {
  const isMobile = useIsMobile();
  return (
    <div className={cn(
      "bg-white h-16 shadow-sm z-10",
      isMobile ? "fixed top-0 left-0 right-0" : ""
    )}>
      <div className="h-full flex items-center px-4 justify-between">
        <div className="flex items-center">
          {onBack && (
            <button onClick={onBack} className="p-2 mr-2" aria-label="Back">
              <ArrowLeft size={24} className="text-gray-800" />
            </button>
          )}
          <Avatar className="h-10 w-10 bg-purple-400">
            <AvatarImage src={avatarSrc} alt={title} />
            <AvatarFallback className="text-white font-semibold">{title?.[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <div className="text-base font-medium">{title}</div>
            <div className="text-xs text-gray-500">{subtitle || '1 member'}</div>
          </div>
        </div>
        <div className="flex space-x-6">
          <button className="p-1.5" aria-label="Search">
            <Search size={24} className="text-gray-800" />
          </button>
          <button className="p-1.5" aria-label="Call">
            <Phone size={24} className="text-gray-800" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
