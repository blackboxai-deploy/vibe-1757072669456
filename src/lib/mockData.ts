// Mock data for Instagram-like social media app development

import { User, Post, Comment, Story, Message, Chat, Notification } from '@/types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'johndoe',
    displayName: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://placehold.co/150x150?text=Professional+headshot+of+young+man+with+friendly+smile',
    bio: 'Photographer & Travel Enthusiast 📸✈️ Living life one adventure at a time',
    followers: ['2', '3', '4', '5'],
    following: ['2', '3'],
    postsCount: 12,
    verified: true,
    isPrivate: false,
    createdAt: new Date('2023-01-15'),
  },
  {
    id: '2',
    username: 'janecook',
    displayName: 'Jane Cook',
    email: 'jane@example.com',
    avatar: 'https://placehold.co/150x150?text=Professional+portrait+of+woman+chef+in+kitchen',
    bio: '👩‍🍳 Chef & Food Blogger | Sharing delicious recipes daily',
    followers: ['1', '3', '4'],
    following: ['1', '4', '5'],
    postsCount: 28,
    verified: true,
    isPrivate: false,
    createdAt: new Date('2023-02-20'),
  },
  {
    id: '3',
    username: 'mike_fitness',
    displayName: 'Mike Johnson',
    email: 'mike@example.com',
    avatar: 'https://placehold.co/150x150?text=Athletic+man+in+gym+workout+gear',
    bio: '💪 Personal Trainer | Helping you achieve your fitness goals',
    followers: ['1', '2'],
    following: ['1', '2', '4'],
    postsCount: 45,
    verified: false,
    isPrivate: false,
    createdAt: new Date('2023-03-10'),
  },
  {
    id: '4',
    username: 'sarah_art',
    displayName: 'Sarah Martinez',
    email: 'sarah@example.com',
    avatar: 'https://placehold.co/150x150?text=Creative+artist+with+paint+brushes+and+easel',
    bio: '🎨 Digital Artist | Commission work available | Art tutorials on YouTube',
    followers: ['1', '2', '3', '5'],
    following: ['1', '2'],
    postsCount: 67,
    verified: false,
    isPrivate: false,
    createdAt: new Date('2023-04-05'),
  },
  {
    id: '5',
    username: 'alex_tech',
    displayName: 'Alex Thompson',
    email: 'alex@example.com',
    avatar: 'https://placehold.co/150x150?text=Software+developer+working+on+laptop+with+code',
    bio: '💻 Software Developer | Tech Tips & Reviews | Building cool stuff',
    followers: ['2', '4'],
    following: ['1', '2', '3', '4'],
    postsCount: 23,
    verified: false,
    isPrivate: false,
    createdAt: new Date('2023-05-12'),
  },
];

// Mock Comments
export const mockComments: Comment[] = [
  {
    id: 'c1',
    userId: '2',
    postId: 'p1',
    content: 'Amazing shot! What camera did you use?',
    likes: ['1', '3'],
    replies: [],
    createdAt: new Date('2024-01-10T14:30:00'),
  },
  {
    id: 'c2',
    userId: '3',
    postId: 'p1',
    content: 'This is incredible! 🔥',
    likes: ['1', '2', '4'],
    replies: [],
    createdAt: new Date('2024-01-10T15:45:00'),
  },
  {
    id: 'c3',
    userId: '4',
    postId: 'p2',
    content: 'That looks absolutely delicious! Recipe please? 😍',
    likes: ['2', '5'],
    replies: [],
    createdAt: new Date('2024-01-09T12:20:00'),
  },
];

// Mock Posts
export const mockPosts: Post[] = [
  {
    id: 'p1',
    userId: '1',
    images: [
      'https://placehold.co/600x600?text=Stunning+mountain+landscape+at+golden+hour+sunset',
      'https://placehold.co/600x600?text=Close+up+detail+of+mountain+rocks+and+vegetation',
    ],
    caption: 'Golden hour magic at the mountains! 🏔️ Sometimes you just have to stop and appreciate the beauty around us. This hike was challenging but so worth it for views like these. #mountains #goldenhour #hiking #nature #photography',
    likes: ['2', '3', '4', '5'],
    comments: mockComments.filter(c => c.postId === 'p1'),
    createdAt: new Date('2024-01-10T10:30:00'),
    location: 'Rocky Mountain National Park',
    hashtags: ['mountains', 'goldenhour', 'hiking', 'nature', 'photography'],
  },
  {
    id: 'p2',
    userId: '2',
    images: [
      'https://placehold.co/600x600?text=Beautifully+plated+gourmet+pasta+dish+with+herbs',
    ],
    caption: 'Fresh homemade pasta with basil pesto and cherry tomatoes 🍝 Nothing beats the taste of handmade pasta! Swipe for the recipe in my stories. #pasta #homemade #italian #cooking #foodie',
    likes: ['1', '3', '4'],
    comments: mockComments.filter(c => c.postId === 'p2'),
    createdAt: new Date('2024-01-09T18:45:00'),
    location: 'My Kitchen',
    hashtags: ['pasta', 'homemade', 'italian', 'cooking', 'foodie'],
  },
  {
    id: 'p3',
    userId: '3',
    images: [
      'https://placehold.co/600x600?text=Gym+workout+session+with+weights+and+equipment',
    ],
    caption: 'Leg day complete! 💪 Remember, consistency is key. It\'s not about being perfect, it\'s about showing up every day and giving your best effort. What\'s your favorite leg exercise? #legday #fitness #motivation #gym #strength',
    likes: ['1', '2', '4', '5'],
    comments: [],
    createdAt: new Date('2024-01-08T16:20:00'),
    location: 'FitLife Gym',
    hashtags: ['legday', 'fitness', 'motivation', 'gym', 'strength'],
  },
  {
    id: 'p4',
    userId: '4',
    images: [
      'https://placehold.co/600x600?text=Colorful+abstract+digital+art+painting+with+vibrant+colors',
    ],
    caption: 'Latest digital piece I\'ve been working on 🎨 Experimenting with new color palettes and brush techniques. Art is about expressing emotions and I hope this piece conveys the joy I felt creating it! #digitalart #abstract #colors #creativity #artist',
    likes: ['1', '2', '3'],
    comments: [],
    createdAt: new Date('2024-01-07T20:15:00'),
    hashtags: ['digitalart', 'abstract', 'colors', 'creativity', 'artist'],
  },
  {
    id: 'p5',
    userId: '5',
    images: [
      'https://placehold.co/600x600?text=Modern+programming+setup+with+multiple+monitors+and+code',
    ],
    caption: 'Late night coding session 👨‍💻 Working on a new React project that I\'m excited to share soon! The grind never stops when you love what you do. What\'s your favorite programming language? #coding #react #javascript #developer #programming',
    likes: ['1', '2', '4'],
    comments: [],
    createdAt: new Date('2024-01-06T23:30:00'),
    hashtags: ['coding', 'react', 'javascript', 'developer', 'programming'],
  },
];

// Mock Stories
export const mockStories: Story[] = [
  {
    id: 's1',
    userId: '1',
    imageUrl: 'https://placehold.co/390x844?text=Behind+the+scenes+mountain+hiking+adventure',
    createdAt: new Date('2024-01-10T08:00:00'),
    expiresAt: new Date('2024-01-11T08:00:00'),
    viewers: ['2', '3'],
  },
  {
    id: 's2',
    userId: '2',
    imageUrl: 'https://placehold.co/390x844?text=Step+by+step+pasta+making+cooking+process',
    text: 'Fresh pasta recipe coming up!',
    createdAt: new Date('2024-01-10T12:00:00'),
    expiresAt: new Date('2024-01-11T12:00:00'),
    viewers: ['1', '4'],
  },
  {
    id: 's3',
    userId: '3',
    imageUrl: 'https://placehold.co/390x844?text=Pre+workout+motivation+and+gym+equipment',
    text: 'Ready for leg day! 💪',
    createdAt: new Date('2024-01-10T06:00:00'),
    expiresAt: new Date('2024-01-11T06:00:00'),
    viewers: ['1', '2', '5'],
  },
];

// Mock Messages
export const mockMessages: Message[] = [
  {
    id: 'm1',
    senderId: '2',
    receiverId: '1',
    content: 'Hey! Loved your mountain photos!',
    createdAt: new Date('2024-01-10T16:00:00'),
    read: true,
  },
  {
    id: 'm2',
    senderId: '1',
    receiverId: '2',
    content: 'Thank you! Your pasta recipe looks amazing too',
    createdAt: new Date('2024-01-10T16:15:00'),
    read: true,
  },
  {
    id: 'm3',
    senderId: '3',
    receiverId: '1',
    content: 'Want to go hiking together sometime?',
    createdAt: new Date('2024-01-10T17:30:00'),
    read: false,
  },
];

// Mock Chats
export const mockChats: Chat[] = [
  {
    id: 'chat1',
    participants: ['1', '2'],
    lastMessage: mockMessages[1],
    messages: [mockMessages[0], mockMessages[1]],
    updatedAt: new Date('2024-01-10T16:15:00'),
  },
  {
    id: 'chat2',
    participants: ['1', '3'],
    lastMessage: mockMessages[2],
    messages: [mockMessages[2]],
    updatedAt: new Date('2024-01-10T17:30:00'),
  },
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    userId: '1',
    type: 'like',
    triggeredBy: '2',
    postId: 'p1',
    message: 'janecook liked your photo',
    read: false,
    createdAt: new Date('2024-01-10T15:00:00'),
  },
  {
    id: 'n2',
    userId: '1',
    type: 'comment',
    triggeredBy: '3',
    postId: 'p1',
    message: 'mike_fitness commented on your photo',
    read: false,
    createdAt: new Date('2024-01-10T15:45:00'),
  },
  {
    id: 'n3',
    userId: '1',
    type: 'follow',
    triggeredBy: '5',
    message: 'alex_tech started following you',
    read: true,
    createdAt: new Date('2024-01-09T20:30:00'),
  },
];

// Utility functions to get data with user details populated
export const getPostsWithUsers = (): Post[] => {
  return mockPosts.map(post => ({
    ...post,
    user: mockUsers.find(user => user.id === post.userId),
    comments: post.comments.map(comment => ({
      ...comment,
      user: mockUsers.find(user => user.id === comment.userId),
    })),
  }));
};

export const getStoriesWithUsers = (): Story[] => {
  return mockStories.map(story => ({
    ...story,
    user: mockUsers.find(user => user.id === story.userId),
  }));
};

export const getNotificationsWithUsers = (): Notification[] => {
  return mockNotifications.map(notification => ({
    ...notification,
    triggeredByUser: mockUsers.find(user => user.id === notification.triggeredBy),
  }));
};

// Helper function to get user by username
export const getUserByUsername = (username: string): User | undefined => {
  return mockUsers.find(user => user.username === username);
};

// Helper function to get posts by user
export const getPostsByUserId = (userId: string): Post[] => {
  return getPostsWithUsers().filter(post => post.userId === userId);
};