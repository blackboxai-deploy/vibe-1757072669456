// Core type definitions for Instagram-like social media app

export interface User {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatar: string;
  bio: string;
  followers: string[];
  following: string[];
  postsCount: number;
  verified: boolean;
  isPrivate: boolean;
  createdAt: Date;
}

export interface Post {
  id: string;
  userId: string;
  user?: User;
  images: string[];
  caption: string;
  likes: string[];
  comments: Comment[];
  createdAt: Date;
  location?: string;
  hashtags: string[];
  isVideo?: boolean;
  videoUrl?: string;
}

export interface Comment {
  id: string;
  userId: string;
  user?: User;
  postId: string;
  content: string;
  likes: string[];
  replies: Comment[];
  createdAt: Date;
}

export interface Story {
  id: string;
  userId: string;
  user?: User;
  imageUrl: string;
  videoUrl?: string;
  text?: string;
  createdAt: Date;
  expiresAt: Date;
  viewers: string[];
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  imageUrl?: string;
  createdAt: Date;
  read: boolean;
}

export interface Chat {
  id: string;
  participants: string[];
  lastMessage: Message;
  messages: Message[];
  updatedAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'story_view';
  triggeredBy: string;
  triggeredByUser?: User;
  postId?: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

export interface AuthState {
  isAuthenticated: boolean;
  currentUser: User | null;
  loading: boolean;
}

export interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

export interface UsersState {
  users: User[];
  currentProfile: User | null;
  loading: boolean;
  error: string | null;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// Form types
export interface LoginFormData {
  username: string;
  password: string;
}

export interface SignupFormData {
  username: string;
  email: string;
  displayName: string;
  password: string;
  confirmPassword: string;
}

export interface PostFormData {
  images: File[];
  caption: string;
  location?: string;
}

export interface ProfileUpdateData {
  displayName: string;
  bio: string;
  avatar?: File;
  isPrivate: boolean;
}

// Component props types
export interface PostCardProps {
  post: Post;
  showFullCaption?: boolean;
  showComments?: boolean;
}

export interface UserCardProps {
  user: User;
  showFollowButton?: boolean;
  showBio?: boolean;
}

export interface SearchFilters {
  type: 'all' | 'users' | 'posts' | 'hashtags';
  query: string;
}

// Utility types
export type PostAction = 
  | { type: 'SET_POSTS'; payload: Post[] }
  | { type: 'ADD_POST'; payload: Post }
  | { type: 'UPDATE_POST'; payload: Post }
  | { type: 'DELETE_POST'; payload: string }
  | { type: 'LIKE_POST'; payload: { postId: string; userId: string } }
  | { type: 'UNLIKE_POST'; payload: { postId: string; userId: string } }
  | { type: 'ADD_COMMENT'; payload: { postId: string; comment: Comment } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

export type UserAction =
  | { type: 'SET_USERS'; payload: User[] }
  | { type: 'ADD_USER'; payload: User }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'FOLLOW_USER'; payload: { followerId: string; followingId: string } }
  | { type: 'UNFOLLOW_USER'; payload: { followerId: string; followingId: string } }
  | { type: 'SET_CURRENT_PROFILE'; payload: User | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

export type AuthAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };