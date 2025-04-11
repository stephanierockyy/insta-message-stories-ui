import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Paperclip, Smile, Mic, Search, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

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

  // For chat view navigation
  const ChatNavBar = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-16">
      <div className="h-full flex items-center px-4 justify-between">
        <Link to="/" className="p-2" aria-label="Back">
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-purple-400 flex items-center justify-center text-white font-semibold">
            H
          </div>
          <div className="ml-3">
            <div className="text-base font-medium">hey</div>
            <div className="text-xs text-gray-500">1 member</div>
          </div>
        </div>
        <div className="flex">
          <button className="p-2" aria-label="Search">
            <Search size={22} className="text-gray-800" />
          </button>
          <button className="p-2 ml-2" aria-label="Call">
            <Phone size={22} className="text-gray-800" />
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
