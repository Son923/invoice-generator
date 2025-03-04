"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCurrentUser, isAuthenticated, logout } from '@/lib/appwrite';

// Define the context type
type AppwriteContextType = {
  user: any;
  loading: boolean;
  authenticated: boolean;
  refreshUser: () => Promise<void>;
  logoutUser: () => Promise<void>;
  lastUpdated: number;
};

// Create the context with default values
const AppwriteContext = createContext<AppwriteContextType>({
  user: null,
  loading: true,
  authenticated: false,
  refreshUser: async () => {},
  logoutUser: async () => {},
  lastUpdated: 0,
});

// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

export const AppwriteProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(0);

  // Function to refresh user data
  const refreshUser = useCallback(async (force = false) => {
    // Skip refresh if cache is still valid and not forced
    const now = Date.now();
    if (!force && user && now - lastUpdated < CACHE_DURATION) {
      return;
    }

    try {
      setLoading(true);
      const auth = await isAuthenticated();
      setAuthenticated(auth);
      
      if (auth) {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } else {
        setUser(null);
      }
      
      setLastUpdated(now);
    } catch (error) {
      console.error('Error refreshing user:', error);
      setUser(null);
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, [user, lastUpdated]);

  // Function to handle logout
  const logoutUser = useCallback(async () => {
    try {
      await logout();
      setUser(null);
      setAuthenticated(false);
      setLastUpdated(Date.now());
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }, []);

  // Initial load
  useEffect(() => {
    refreshUser();
    
    // Set up event listener for focus to refresh user data when tab becomes active
    const handleFocus = () => {
      refreshUser();
    };
    
    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [refreshUser]);

  const contextValue = {
    user,
    loading,
    authenticated,
    refreshUser: () => refreshUser(true), // Force refresh when called explicitly
    logoutUser,
    lastUpdated,
  };

  return (
    <AppwriteContext.Provider value={contextValue}>
      {children}
    </AppwriteContext.Provider>
  );
};

// Custom hook to use the Appwrite context
export const useAppwrite = () => useContext(AppwriteContext); 