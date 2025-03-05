"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

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
  loading: false,
  authenticated: true,
  refreshUser: async () => {},
  logoutUser: async () => {},
  lastUpdated: 0,
});

// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

export const AppwriteProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(0);

  // Function to refresh user data - no longer needed but kept for interface compatibility
  const refreshUser = useCallback(async (force = false) => {
    // No-op since we don't need authentication anymore
  }, []);

  // Function to handle logout - no longer needed but kept for interface compatibility
  const logoutUser = useCallback(async () => {
    // No-op since we don't need authentication anymore
  }, []);

  // Initial load
  useEffect(() => {
    // No need to refresh user data as we don't need authentication anymore
    
    // Set up event listener for focus to refresh user data when tab becomes active
    const handleFocus = () => {
      // No need to refresh user data as we don't need authentication anymore
    };
    
    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const contextValue = {
    user: null,
    loading: false,
    authenticated: true,
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

// Export the hook
export const useAppwrite = () => useContext(AppwriteContext); 