export interface Talent {
  id: string;
  name: string;
  category: string;
  location: string;
  image: string;
  videoUrl?: string;
  bio: string;
  skills: string[];
  stats: {
    views: string;
    videoViews: string;
    likes: string;
    responseRate: string;
    earnings: string;
  };
  verified: boolean;
  isAvailable: boolean;
}

export interface Audition {
  id: string;
  title: string;
  category: string;
  location: string;
  payment: string;
  deadline: string;
  description: string;
  requirements: string[];
  image: string;
}

export interface CollabMatch {
  id: string;
  title: string;
  description: string;
  location: string;
  skillNeeded: string;
  image: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  time: string;
  videoPreview?: string;
}

export interface Chat {
  id: string;
  talentName: string;
  lastMessage: string;
  time: string;
  isLocked: boolean;
  avatar: string;
  messages: Message[];
}

export interface Notification {
  id: string;
  type: 'follower' | 'view' | 'audition' | 'message' | 'booking';
  text: string;
  time: string;
  read: boolean;
}

export interface Booking {
  id: string;
  talentId: string;
  date: string;
  time: string;
  eventType: string;
  location: string;
  status: 'pending' | 'accepted' | 'declined';
}