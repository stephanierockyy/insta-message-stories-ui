
import React from 'react';
import { Clock, Smile, Frown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

// Define emoji categories
const EMOJIS = [
  // Row 1
  '😂', '😘', '❤️', '😍', '😊', '😄', '👍',
  // Row 2
  '😌', '😔', '😁', '😢', '💋', '😞', '😳',
  // Row 3
  '😜', '🙈', '😉', '😀', '😨', '😝', '😱',
  // Row 4
  '😠', '😏', '😒', '😂', '😗', '🙊', '😇'
];

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  onClose: () => void;
  isOpen: boolean;
  triggerRef?: React.RefObject<HTMLButtonElement>;
}

const EmojiPickerContent: React.FC<{ 
  onEmojiSelect: (emoji: string) => void;
  onClose?: () => void;
  showHeader?: boolean;
}> = ({ onEmojiSelect, onClose, showHeader = true }) => {
  return (
    <>
      {showHeader && (
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2">
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full text-gray-600">
              <Clock size={20} />
            </button>
            <button className="p-2 rounded-full text-gray-600 bg-gray-200">
              <Smile size={20} />
            </button>
          </div>
        </div>
      )}
      
      <div className="p-2 overflow-y-auto">
        <div className="grid grid-cols-7 gap-2 p-2">
          {EMOJIS.map((emoji, i) => (
            <button 
              key={i}
              className="text-2xl hover:bg-gray-200 rounded p-1"
              onClick={() => onEmojiSelect(emoji)}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
      
      {showHeader && (
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-2">
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full text-gray-600">
              <Smile size={20} />
            </button>
            <button className="p-2 rounded-full text-gray-600">
              <Frown size={20} />
            </button>
            <button className="p-2 rounded-full text-gray-600">
              <span className="text-sm font-medium">GIF</span>
            </button>
          </div>
          {onClose && (
            <button 
              className="p-2 rounded-full text-gray-600"
              onClick={onClose}
            >
              <X size={20} />
            </button>
          )}
        </div>
      )}
    </>
  );
};

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onEmojiSelect, onClose, isOpen, triggerRef }) => {
  const isMobile = useIsMobile();
  
  // For mobile: full-width bottom sheet style
  if (isMobile) {
    if (!isOpen) return null;
    
    return (
      <div 
        className={cn(
          "bg-gray-100 border-t border-gray-200 w-full",
          "flex flex-col animate-fade-in",
          isMobile ? "h-[280px]" : "h-[250px]"
        )}
      >
        <EmojiPickerContent 
          onEmojiSelect={onEmojiSelect}
          onClose={onClose}
          showHeader={true}
        />
      </div>
    );
  }
  
  // For desktop: compact popover
  return (
    <Popover open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <PopoverContent 
        className="w-[320px] p-0 bg-gray-100 border-gray-200" 
        align="start"
        side="top"
      >
        <EmojiPickerContent 
          onEmojiSelect={onEmojiSelect}
          showHeader={false} 
        />
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPicker;
