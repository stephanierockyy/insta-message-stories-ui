import React, { useState } from 'react';
import { Clock, Smile, Frown, X, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';

// Define emoji categories and emojis - expanded with more emojis
const EMOJI_CATEGORIES = {
  "Smileys & Emotion": [
    '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', 
    '🙄', '🤤', '😊', '😇', '🙃', '😉', '❤️', '😍', '😘', 
    '😋', '😛', '😗', '😙', '😚', '🫢', '😶', '🤪', '😜',
    '😝', '💰', '😏', '🫣', '🫠', '😮', '😯', '😲', '🙄',
    '😑', '😐', '😑', '😶', '🫥', '💭', '😔', '😕', '🫤', 
    '😬', '🫨', '😮‍💨', '😪', '😴', '😌', '😔', '🤤', '😪',
    '😭', '🤯', '🫠', '😟', '😢', '🤧', '🤮', '🤢', '🫡',
    '😡', '🤬', '💀', '😵', '😵‍💫', '🤯', '🧐', '🤠', '🥸'
  ],
  "Animals & Nature": [
    '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐻‍❄️', 
    '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', 
    '🐦', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', 
    '🐝', '🪱', '🐛', '🦋', '🐌', '🐞', '🐜', '🪰', '🪲', 
    '🪳', '🦟', '🦗', '🕷️', '🕸️', '🦂', '🐢', '🐍', '🦎', 
    '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', 
    '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🦓', 
    '🦍', '🦧', '🦣', '🐘', '🦛', '🦏', '🐪', '🐫', '🦒'
  ],
  "Food & Drink": [
    '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐',
    '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆',
    '🥑', '🥦', '🥬', '🥒', '🌶️', '🫑', '🌽', '🥕', '🫒',
    '🧄', '🧅', '🥔', '🍠', '🥐', '🥯', '🍞', '🥖', '🥨',
    '🧀', '🥚', '🍳', '🧈', '🥞', '🧇', '🥓', '🥩', '🍗',
    '🍖', '🦴', '🌭', '🍔', '🍟', '🍕', '🫓', '🥪', '🥙',
    '🧆', '🌮', '🌯', '🫔', '🥗', '🥘', '🫕', '🥫', '🍝',
    '🍜', '🍲', '🍛', '🍣', '🍱', '🥟', '🦪', '🍤', '🍙'
  ]
};

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  onClose: () => void;
  isOpen: boolean;
  triggerRef?: React.RefObject<HTMLButtonElement>;
}

export const EmojiPickerContent: React.FC<{ 
  onEmojiSelect: (emoji: string) => void;
  onClose?: () => void;
  showHeader?: boolean;
  isMobileView?: boolean;
}> = ({ onEmojiSelect, onClose, showHeader = true, isMobileView = false }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<keyof typeof EMOJI_CATEGORIES>("Smileys & Emotion");
  
  // Keep mobile design the same
  if (isMobileView) {
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
            {EMOJI_CATEGORIES["Smileys & Emotion"].slice(0, 28).map((emoji, i) => (
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
  }
  
  // Updated desktop design with scrollable emoji area
  return (
    <div className="p-4 w-full bg-white rounded-lg">
      {/* Non-functional search div that looks like a search box */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <div className="pl-10 pr-3 py-2 w-full bg-gray-100 rounded-full text-sm text-gray-400">
          Search
        </div>
      </div>
      
      {/* Category tabs */}
      <div className="flex mb-3 space-x-2 overflow-x-auto hide-scrollbar">
        {Object.keys(EMOJI_CATEGORIES).map((category) => (
          <button 
            key={category}
            className={cn(
              "px-3 py-1.5 text-sm whitespace-nowrap rounded-md",
              activeCategory === category ? "bg-gray-100 font-medium" : "text-gray-500"
            )}
            onClick={() => setActiveCategory(category as keyof typeof EMOJI_CATEGORIES)}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Category title */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-base">{activeCategory}</h3>
      </div>
      
      {/* Emoji grid with scrolling container */}
      <ScrollArea className="h-[240px]">
        <div className="grid grid-cols-9 gap-1 pr-2">
          {EMOJI_CATEGORIES[activeCategory].map((emoji, i) => (
            <button 
              key={i}
              className="text-2xl hover:bg-gray-100 rounded p-1 flex items-center justify-center h-9 w-9"
              onClick={() => onEmojiSelect(emoji)}
            >
              {emoji}
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onEmojiSelect, onClose, isOpen, triggerRef }) => {
  const isMobile = useIsMobile();
  
  // For mobile: full-width bottom sheet style - keep this unchanged
  if (isMobile) {
    if (!isOpen) return null;
    
    return (
      <div 
        className={cn(
          "bg-gray-100 border-t border-gray-200 w-full",
          "flex flex-col animate-fade-in",
          "h-[280px]"
        )}
      >
        <EmojiPickerContent 
          onEmojiSelect={onEmojiSelect}
          onClose={onClose}
          showHeader={true}
          isMobileView={true}
        />
      </div>
    );
  }
  
  // For desktop: updated style to match the image
  return (
    <Popover open={isOpen}>
      <PopoverContent 
        className="w-[380px] p-0 bg-white border-gray-200 shadow-lg" 
        align="end"
        side="top"
        sideOffset={5}
        onInteractOutside={onClose}
      >
        <EmojiPickerContent 
          onEmojiSelect={onEmojiSelect}
          showHeader={false}
          isMobileView={false}
        />
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPicker;
