import { Talent, Audition, Chat, Notification, CollabMatch } from '../types';

export const MOCK_TALENTS: Talent[] = [
  {
    id: '1',
    name: 'Amara Blue',
    category: 'Musician',
    location: 'Johannesburg',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9ef4cf7c-85c7-4afd-b7de-db5241b7571d/talent-1-profile-a1d76ea1-1777892499036.webp',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-girl-singing-into-a-microphone-in-a-studio-42589-large.mp4',
    bio: 'Singer-songwriter with a passion for Amapiano and Soul. Performing live for 5 years across SA.',
    skills: ['Amapiano', 'Live Performer', 'Songwriter', 'Vocalist'],
    stats: {
      views: '12.4K',
      videoViews: '45.1K',
      likes: '2.1K',
      responseRate: '98%',
      earnings: 'R12,500'
    },
    verified: true,
    isAvailable: true
  },
  {
    id: '2',
    name: 'Neo Kinetic',
    category: 'Dancer',
    location: 'Cape Town',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9ef4cf7c-85c7-4afd-b7de-db5241b7571d/talent-2-profile-ad23a29b-1777892498693.webp',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-dancing-breakdance-4428-large.mp4',
    bio: 'Street dancer specializing in breakdance and contemporary fusion. High energy performances.',
    skills: ['Breakdance', 'Contemporary', 'Choreography'],
    stats: {
      views: '8.2K',
      videoViews: '32.5K',
      likes: '1.5K',
      responseRate: '95%',
      earnings: 'R8,200'
    },
    verified: false,
    isAvailable: true
  },
  {
    id: '3',
    name: 'Chris Jokes',
    category: 'Comedy',
    location: 'Durban',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9ef4cf7c-85c7-4afd-b7de-db5241b7571d/talent-3-profile-8fc6175f-1777892499413.webp',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-audience-clapping-after-a-show-4054-large.mp4',
    bio: 'Stand-up comedian with a knack for observational humor and satire.',
    skills: ['Stand-up', 'Improv', 'Writing'],
    stats: {
      views: '45.1K',
      videoViews: '120.4K',
      likes: '5.8K',
      responseRate: '92%',
      earnings: 'R25,000'
    },
    verified: true,
    isAvailable: false
  }
];

export const MOCK_AUDITIONS: Audition[] = [
  {
    id: 'a1',
    title: 'Lead Actor Needed',
    category: 'Acting',
    location: 'Johannesburg',
    payment: 'R5,000/Day',
    deadline: 'Oct 15, 2024',
    description: 'Looking for a charismatic lead for an upcoming Netflix original series filmed in SA.',
    requirements: ['Aged 20-30', 'Fluent in English', 'Previous acting experience preferred'],
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9ef4cf7c-85c7-4afd-b7de-db5241b7571d/audition-cover---acting-156e81ea-1777892818834.webp'
  },
  {
    id: 'a2',
    title: 'Session Drummer',
    category: 'Music',
    location: 'Remote/Cape Town',
    payment: 'R2,500/Session',
    deadline: 'Oct 20, 2024',
    description: 'Jazz fusion band looking for a tight drummer for a 3-track recording session.',
    requirements: ['High proficiency', 'Ability to read charts', 'Own equipment'],
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9ef4cf7c-85c7-4afd-b7de-db5241b7571d/audition-cover---music-273f6417-1777892818645.webp'
  }
];

export const MOCK_COLLABS: CollabMatch[] = [
  {
    id: 'm1',
    title: 'Band looking for drummer',
    description: 'We are a 4-piece rock band in Johannesburg looking for a skilled drummer for our upcoming tour.',
    location: 'Johannesburg',
    skillNeeded: 'Drummer',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9ef4cf7c-85c7-4afd-b7de-db5241b7571d/collab-request---band-looking-for-member-d8c7b3a3-1777892819430.webp'
  },
  {
    id: 'm2',
    title: 'Dance group collab',
    description: 'Looking for 2 more contemporary dancers for a music video shoot next month.',
    location: 'Cape Town',
    skillNeeded: 'Contemporary Dancer',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/9ef4cf7c-85c7-4afd-b7de-db5241b7571d/collab-request---dance-group-33483d54-1777892819519.webp'
  }
];

export const MOCK_CHATS: Chat[] = [
  {
    id: 'c1',
    talentName: 'Amara Blue',
    lastMessage: 'I would love to perform at your event!',
    time: '2m ago',
    isLocked: false,
    avatar: MOCK_TALENTS[0].image,
    messages: [
      { id: 'm1', senderId: 'user', text: 'Hi Amara, we are interested in booking you.', time: '10:00 AM' },
      { id: 'm2', senderId: '1', text: 'Hey! I would love to perform at your event!', time: '10:05 AM' }
    ]
  },
  {
    id: 'c2',
    talentName: 'Neo Kinetic',
    lastMessage: 'Hey! Are you available for a collab?',
    time: '1h ago',
    isLocked: true,
    avatar: MOCK_TALENTS[1].image,
    messages: []
  }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: 'follower',
    text: 'Sarah started following you',
    time: '5m ago',
    read: false
  },
  {
    id: 'n2',
    type: 'view',
    text: 'Your video reached 10,000 views!',
    time: '2h ago',
    read: true
  },
  {
    id: 'n3',
    type: 'booking',
    text: 'New booking request from Wedding Agency',
    time: '1d ago',
    read: false
  }
];