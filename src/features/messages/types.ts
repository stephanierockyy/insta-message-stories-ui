
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  time: string;
  isRead?: boolean;
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: boolean;
}

export interface Story {
  id: string;
  name: string;
  avatar: string;
  seen: boolean;
}
