
import React from 'react';
import { Clock, Smile, Frown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

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
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onEmojiSelect, onClose, isOpen }) => {
  const isMobile = useIsMobile();
  
  if (!isOpen) return null;
  
  return (
    <div 
      className={cn(
        "bg-gray-100 border-t border-gray-200 w-full",
        "flex flex-col animate-fade-in",
        isMobile ? "h-[280px]" : "h-[250px]"
      )}
    >
      {/* Emoji picker header */}
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
      
      {/* Emoji grid */}
      <div className="flex-1 p-2 overflow-y-auto">
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
      
      {/* Emoji picker footer */}
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
        <button 
          className="p-2 rounded-full text-gray-600"
          onClick={onClose}
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default EmojiPicker;
