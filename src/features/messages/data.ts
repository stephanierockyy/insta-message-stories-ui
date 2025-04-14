
import { Chat, Message, Story } from "./types";

export const SAMPLE_STORIES: Story[] = [
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
    avatar: 'https://images.unsplash.com/photo-1501286353178-1ec871214838?w=50&h=50&fit=crop',
    seen: true
  }
];

export const SAMPLE_MESSAGES: Chat[] = [
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
    id: '4',
    name: 'James Wilson',
    avatar: 'https://images.unsplash.com/photo-1501286353178-1ec871214838?w=50&h=50&fit=crop',
    lastMessage: 'Check out these vacation photos!',
    time: '1d ago',
    unread: false
  },
  {
    id: '6',
    name: 'Alex Thompson',
    avatar: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=50&h=50&fit=crop',
    lastMessage: 'Are we still meeting tomorrow?',
    time: '3h ago',
    unread: true
  },
  {
    id: '7',
    name: 'Taylor Kim',
    avatar: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=50&h=50&fit=crop',
    lastMessage: 'I found that book you were looking for!',
    time: '5h ago',
    unread: false
  },
  {
    id: '8',
    name: 'Jordan Lee',
    avatar: 'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?w=50&h=50&fit=crop',
    lastMessage: 'Thanks for the recommendation 👍',
    time: '2d ago',
    unread: false
  }
];

export const CONVERSATION_MESSAGES: Message[] = [
  {
    id: '1',
    text: 'Hey, how are you doing?',
    sender: 'other',
    time: '10:30 AM'
  },
  {
    id: '2',
    text: 'I\'m good, thanks! Just saw your story. That food looks amazing!',
    sender: 'user',
    time: '10:32 AM',
    isRead: true
  },
  {
    id: '3',
    text: 'Yeah, the restaurant was incredible. We should go there sometime!',
    sender: 'other',
    time: '10:33 AM'
  },
  {
    id: '4',
    text: 'Definitely! Are you free this weekend?',
    sender: 'user',
    time: '10:35 AM',
    isRead: true
  },
  {
    id: '5',
    text: 'Saturday works for me. Should we invite the others too?',
    sender: 'other',
    time: '10:36 AM'
  }
];
