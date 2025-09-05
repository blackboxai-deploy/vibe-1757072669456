'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthState, AuthAction, User, LoginFormData, SignupFormData } from '@/types';
import { mockUsers } from '@/lib/mockData';

// Initial state
const initialState: AuthState = {
  isAuthenticated: false,
  currentUser: null,
  loading: false,
};

// Auth reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.payload,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        currentUser: null,
        loading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

// Context type
interface AuthContextType extends AuthState {
  login: (credentials: LoginFormData) => Promise<{ success: boolean; message?: string }>;
  signup: (data: SignupFormData) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for stored auth on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('instagram_user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      dispatch({ type: 'LOGIN', payload: user });
    }
  }, []);

  // Login function
  const login = async (credentials: LoginFormData): Promise<{ success: boolean; message?: string }> => {
    dispatch({ type: 'SET_LOADING', payload: true });

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Find user in mock data
    const user = mockUsers.find(u => 
      u.username === credentials.username || u.email === credentials.username
    );

    if (user && credentials.password === 'password123') {
      // Store user in localStorage
      localStorage.setItem('instagram_user', JSON.stringify(user));
      dispatch({ type: 'LOGIN', payload: user });
      return { success: true };
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
      return { success: false, message: 'Invalid username or password' };
    }
  };

  // Signup function
  const signup = async (data: SignupFormData): Promise<{ success: boolean; message?: string }> => {
    dispatch({ type: 'SET_LOADING', payload: true });

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if username or email already exists
    const existingUser = mockUsers.find(u => 
      u.username === data.username || u.email === data.email
    );

    if (existingUser) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return { success: false, message: 'Username or email already exists' };
    }

    if (data.password !== data.confirmPassword) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return { success: false, message: 'Passwords do not match' };
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      username: data.username,
      displayName: data.displayName,
      email: data.email,
      avatar: `https://placehold.co/150x150?text=${encodeURIComponent(data.displayName.split(' ').map(n => n[0]).join(''))}`,
      bio: '',
      followers: [],
      following: [],
      postsCount: 0,
      verified: false,
      isPrivate: false,
      createdAt: new Date(),
    };

    // Store user in localStorage
    localStorage.setItem('instagram_user', JSON.stringify(newUser));
    dispatch({ type: 'LOGIN', payload: newUser });
    return { success: true };
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('instagram_user');
    dispatch({ type: 'LOGOUT' });
  };

  const value: AuthContextType = {
    ...state,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// HOC for protected routes
export const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
  return function AuthenticatedComponent(props: P) {
    const auth = useAuth();
    const { isAuthenticated, loading } = auth;

    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      );
    }

    if (!isAuthenticated) {
      // In a real app, you'd redirect to login here
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
            <p className="text-gray-600">Please log in to access this page.</p>
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
};