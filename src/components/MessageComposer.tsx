
import React, { useState, useRef, useEffect } from 'react';
import { Camera, Mic, Send, Smile, Paperclip } from 'lucide-react';
import { cn } from '@/lib/utils';
import EmojiPicker from './EmojiPicker';
import { Textarea } from './ui/textarea';
import { useIsMobile } from '@/hooks/use-mobile';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';

interface MessageComposerProps {
  onSendMessage: (message: string) => void;
}

const MessageComposer: React.FC<MessageComposerProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);
  const isMobile = useIsMobile();

  // Focus the textarea when component mounts or emoji picker closes
  useEffect(() => {
    if (!isEmojiPickerOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isEmojiPickerOpen]);

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
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
    // On desktop, close the emoji picker after selection
    if (!isMobile) {
      setIsEmojiPickerOpen(false);
    }
  };

  const toggleEmojiPicker = () => {
    setIsEmojiPickerOpen(prev => !prev);
    // Focus the textarea when emoji picker is closed
    if (isEmojiPickerOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    // Close emoji picker on typing for mobile
    if (isMobile && isEmojiPickerOpen) {
      setIsEmojiPickerOpen(false);
    }
  };

  // Handler for when textarea receives focus
  const handleTextareaFocus = () => {
    if (isMobile && isEmojiPickerOpen) {
      setIsEmojiPickerOpen(false);
    }
  };

  return (
    <>
      <div className={cn(
        "bg-white border-t border-gray-200 p-2 flex items-center",
        isEmojiPickerOpen && isMobile ? "border-b-0" : ""
      )}>
        <button 
          className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
          aria-label="Attachment"
        >
          <Paperclip size={24} />
        </button>
        <div className={cn(
          "flex-1 bg-gray-100 rounded-full mx-2",
          "flex items-center px-3 py-1"
        )}>
          <Textarea
            ref={textareaRef}
            placeholder="Message"
            value={message}
            onChange={handleTextareaChange}
            onKeyPress={handleKeyPress}
            onFocus={handleTextareaFocus}
            className="flex-1 bg-transparent border-0 outline-none text-sm py-1 min-h-0 max-h-24 resize-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-500"
            style={{ 
              height: Math.min(60, Math.max(24, message.split('\n').length * 20)) + 'px'
            }}
          />
          {isMobile ? (
            <button 
              ref={emojiButtonRef}
              className={cn(
                "p-1 rounded-full hover:bg-gray-200 ml-1",
                isEmojiPickerOpen ? "bg-gray-200" : ""
              )}
              aria-label="Emoji"
              onClick={toggleEmojiPicker}
            >
              <Smile size={24} className="text-gray-500" />
            </button>
          ) : (
            <Popover open={isEmojiPickerOpen} onOpenChange={setIsEmojiPickerOpen}>
              <PopoverTrigger asChild>
                <button 
                  ref={emojiButtonRef}
                  className={cn(
                    "p-1 rounded-full hover:bg-gray-200 ml-1",
                    isEmojiPickerOpen ? "bg-gray-200" : ""
                  )}
                  aria-label="Emoji"
                >
                  <Smile size={24} className="text-gray-500" />
                </button>
              </PopoverTrigger>
              <PopoverContent 
                className="w-[320px] p-0 bg-gray-100 border-gray-200" 
                align="end"
                side="top"
                sideOffset={5}
              >
                <EmojiPickerContent 
                  onEmojiSelect={handleEmojiSelect}
                  showHeader={false} 
                />
              </PopoverContent>
            </Popover>
          )}
        </div>
        {!message.trim() ? (
          <button 
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Voice message"
          >
            <Mic size={24} className="text-gray-500" />
          </button>
        ) : (
          <button 
            className="p-2 rounded-full hover:bg-gray-100 bg-gray-100 text-purple-500"
            onClick={handleSend}
            aria-label="Send message"
          >
            <Send size={24} />
          </button>
        )}
      </div>
      
      {isMobile && (
        <EmojiPicker 
          isOpen={isEmojiPickerOpen} 
          onEmojiSelect={handleEmojiSelect}
          onClose={() => setIsEmojiPickerOpen(false)}
          triggerRef={emojiButtonRef}
        />
      )}
    </>
  );
};

export default MessageComposer;
