'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { PostsState, PostAction, Post, Comment, PostFormData } from '@/types';
import { getPostsWithUsers } from '@/lib/mockData';

// Initial state
const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

// Posts reducer
const postsReducer = (state: PostsState, action: PostAction): PostsState => {
  switch (action.type) {
    case 'SET_POSTS':
      return {
        ...state,
        posts: action.payload,
        loading: false,
        error: null,
      };
    case 'ADD_POST':
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
        error: null,
      };
    case 'UPDATE_POST':
      return {
        ...state,
        posts: state.posts.map(post => 
          post.id === action.payload.id ? action.payload : post
        ),
        loading: false,
        error: null,
      };
    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload),
        loading: false,
        error: null,
      };
    case 'LIKE_POST':
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === action.payload.postId) {
            const isLiked = post.likes.includes(action.payload.userId);
            return {
              ...post,
              likes: isLiked 
                ? post.likes.filter(id => id !== action.payload.userId)
                : [...post.likes, action.payload.userId],
            };
          }
          return post;
        }),
      };
    case 'UNLIKE_POST':
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === action.payload.postId) {
            return {
              ...post,
              likes: post.likes.filter(id => id !== action.payload.userId),
            };
          }
          return post;
        }),
      };
    case 'ADD_COMMENT':
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === action.payload.postId) {
            return {
              ...post,
              comments: [...post.comments, action.payload.comment],
            };
          }
          return post;
        }),
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

// Context type
interface PostsContextType extends PostsState {
  fetchPosts: () => Promise<void>;
  createPost: (postData: PostFormData, userId: string) => Promise<{ success: boolean; message?: string }>;
  likePost: (postId: string, userId: string) => void;
  addComment: (postId: string, content: string, userId: string) => Promise<void>;
  getPostsByUser: (userId: string) => Post[];
  getFeedPosts: (userId: string) => Post[];
}

// Create context
const PostsContext = createContext<PostsContextType | undefined>(undefined);

// Provider component
export const PostsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(postsReducer, initialState);

  // Fetch posts on mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Fetch posts function
  const fetchPosts = async (): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const posts = getPostsWithUsers();
      dispatch({ type: 'SET_POSTS', payload: posts });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch posts' });
    }
  };

  // Create post function
  const createPost = async (
    postData: PostFormData, 
    userId: string
  ): Promise<{ success: boolean; message?: string }> => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Convert images to mock URLs (in a real app, these would be uploaded to a server)
      const imageUrls = postData.images.map((file, index) => 
        `https://placehold.co/600x600?text=User+uploaded+image+${index + 1}+from+${file.name}`
      );

      // Extract hashtags from caption
      const hashtags = postData.caption.match(/#\w+/g)?.map(tag => tag.slice(1)) || [];

      const newPost: Post = {
        id: Date.now().toString(),
        userId,
        images: imageUrls,
        caption: postData.caption,
        likes: [],
        comments: [],
        createdAt: new Date(),
        location: postData.location,
        hashtags,
      };

      dispatch({ type: 'ADD_POST', payload: newPost });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to create post' });
      return { success: false, message: 'Failed to create post' };
    }
  };

  // Like/unlike post function
  const likePost = (postId: string, userId: string): void => {
    dispatch({ 
      type: 'LIKE_POST', 
      payload: { postId, userId } 
    });
  };

  // Add comment function
  const addComment = async (postId: string, content: string, userId: string): Promise<void> => {
    try {
      const newComment: Comment = {
        id: Date.now().toString(),
        userId,
        postId,
        content,
        likes: [],
        replies: [],
        createdAt: new Date(),
      };

      dispatch({ 
        type: 'ADD_COMMENT', 
        payload: { postId, comment: newComment }
      });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add comment' });
    }
  };

  // Get posts by user
  const getPostsByUser = (userId: string): Post[] => {
    return state.posts.filter(post => post.userId === userId);
  };

  // Get feed posts (posts from followed users + own posts)
  const getFeedPosts = (_userId: string): Post[] => {
    // In a real app, this would filter based on following list and userId
    // For now, return all posts sorted by creation date
    return state.posts.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  };

  const value: PostsContextType = {
    ...state,
    fetchPosts,
    createPost,
    likePost,
    addComment,
    getPostsByUser,
    getFeedPosts,
  };

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
};

// Custom hook to use posts context
export const usePosts = (): PostsContextType => {
  const context = useContext(PostsContext);
  if (context === undefined) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};