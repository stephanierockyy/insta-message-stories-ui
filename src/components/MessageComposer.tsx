
import React, { useState, useRef } from 'react';
import { Camera, Mic, Send, Smile } from 'lucide-react';
import { cn } from '@/lib/utils';
import EmojiPicker from './EmojiPicker';

interface MessageComposerProps {
  onSendMessage: (message: string) => void;
}

const MessageComposer: React.FC<MessageComposerProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleEmojiSelect = (emoji: string) => {
    setMessage(prev => prev + emoji);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const toggleEmojiPicker = () => {
    setIsEmojiPickerOpen(prev => !prev);
    // Focus the input when emoji picker is closed
    if (isEmojiPickerOpen && inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      <div className={cn(
        "bg-white border-t border-gray-200 p-2 flex items-center",
        isEmojiPickerOpen ? "border-b-0" : ""
      )}>
        <button 
          className="p-2 rounded-full hover:bg-gray-100 text-purple-500"
          aria-label="Camera"
        >
          <Camera size={20} />
        </button>
        <div className={cn(
          "flex-1 border border-gray-300 rounded-full mx-2",
          "bg-gray-100 flex items-center px-3 py-1"
        )}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 bg-transparent outline-none text-sm py-1"
          />
          <button 
            className={cn(
              "p-1 rounded-full hover:bg-gray-200 ml-1",
              isEmojiPickerOpen ? "bg-gray-200" : ""
            )}
            aria-label="Emoji"
            onClick={toggleEmojiPicker}
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
      
      <EmojiPicker 
        isOpen={isEmojiPickerOpen} 
        onEmojiSelect={handleEmojiSelect}
        onClose={() => setIsEmojiPickerOpen(false)}
      />
    </>
  );
};

export default MessageComposer;
