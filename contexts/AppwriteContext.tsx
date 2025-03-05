"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
// import { getCurrentUser, isAuthenticated, logout } from '@/lib/appwrite';

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
  const [user] = useState<any>({ name: 'Guest User', email: 'guest@example.com' }); // Default guest user
  const [loading, setLoading] = useState(false); // Set to false by default
  const [authenticated] = useState(true); // Always authenticated
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  // Simplified refresh user function
  const refreshUser = useCallback(async () => {
    setLastUpdated(Date.now());
  }, []);

  // Simplified logout function
  const logoutUser = useCallback(async () => {
    setLastUpdated(Date.now());
  }, []);

  const contextValue = {
    user,
    loading,
    authenticated,
    refreshUser,
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