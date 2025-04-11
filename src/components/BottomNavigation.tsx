
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Paperclip, Smile, Mic, Search, Phone, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const BottomNavigation: React.FC = () => {
  const location = useLocation();

  // For messages view navigation
  const MessagesNavBar = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-100 border-t border-gray-200 h-16">
      <div className="h-full flex items-center px-4 justify-between">
        <button className="p-2" aria-label="Attachment">
          <Paperclip size={26} className="text-gray-800" />
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

  // For chat view navigation - Updated to match the WhatsApp-style design
  const ChatNavBar = () => (
    <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 h-16 shadow-sm z-10">
      <div className="h-full flex items-center px-4 justify-between">
        <div className="flex items-center">
          <Link to="/" className="p-2 mr-2" aria-label="Back">
            <ArrowLeft size={24} className="text-gray-800" />
          </Link>
          <Avatar className="h-10 w-10 bg-purple-400">
            <AvatarFallback className="text-white font-semibold">H</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <div className="text-base font-medium">hey</div>
            <div className="text-xs text-gray-500">1 member</div>
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

  // This code is no longer in use after removing the footer navbar,
  // but we're keeping the file for reference
  return null;
};

export default BottomNavigation;
