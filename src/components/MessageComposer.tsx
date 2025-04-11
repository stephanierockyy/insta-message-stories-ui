
import React, { useState } from 'react';
import { Mic, Send, Smile } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MessageComposerProps {
  onSendMessage: (message: string) => void;
}

const MessageComposer: React.FC<MessageComposerProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 p-2 flex items-center">
      <button 
        className="p-2 rounded-full hover:bg-gray-100 text-purple-500"
        aria-label="Camera"
      >
        <img 
          src="/lovable-uploads/49ce606e-ce96-4fdb-86be-64a1b01bc088.png" 
          alt="Camera" 
          className="w-5 h-5"
        />
      </button>
      <div className={cn(
        "flex-1 border border-gray-300 rounded-full mx-2",
        "bg-gray-100 flex items-center px-3 py-1"
      )}>
        <input
          type="text"
          placeholder="Message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 bg-transparent outline-none text-sm py-1"
        />
        <button 
          className="p-1 rounded-full hover:bg-gray-200 ml-1"
          aria-label="Emoji"
        >
          <Smile size={20} className="text-gray-500" />
        </button>
        {!message.trim() ? (
          <button 
            className="p-1 rounded-full hover:bg-gray-200 ml-1"
            aria-label="Voice message"
          >
            <Mic size={20} className="text-gray-500" />
          </button>
        ) : (
          <button 
            className="p-1 rounded-full hover:bg-gray-200 ml-1 text-purple-500"
            onClick={handleSend}
            aria-label="Send message"
          >
            <Send size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default MessageComposer;
