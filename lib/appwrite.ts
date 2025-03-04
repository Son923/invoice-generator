import { Account, Client, Databases, ID, Models, Query } from 'appwrite';

// Initialize the Appwrite client
const client = new Client();

// Set the endpoint from environment variables
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://appwrite.1202design.com/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

// Initialize Appwrite services
export const account = new Account(client);
export const databases = new Databases(client);

// Database and collection IDs
export const DATABASES = {
  INVOICES: {
    ID: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
    COLLECTIONS: {
      INVOICES: process.env.NEXT_PUBLIC_APPWRITE_INVOICES_COLLECTION_ID || '',
      // Users collection is optional if using Appwrite Auth
      USERS: process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID || '',
    }
  }
};

// Type for user session
export type UserSession = Models.Session;

// Cache for user data
let userCache: any = null;
let userCacheTime = 0;
const USER_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Cache for invoice data
interface InvoiceCache {
  data: any;
  timestamp: number;
}
const invoiceCache: Record<string, InvoiceCache> = {};
const INVOICE_CACHE_DURATION = 2 * 60 * 1000; // 2 minutes

// Helper functions for authentication
export async function createAccount(email: string, password: string, name: string) {
  try {
    // Create a new account with a unique ID
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      name
    );
    
    if (newAccount) {
      // Login immediately after account creation
      const session = await login(email, password);
      // Update cache
      userCache = newAccount;
      userCacheTime = Date.now();
      return session;
    }
    return newAccount;
  } catch (error: any) {
    console.error('Error creating account:', error);
    // Provide more user-friendly error messages
    if (error.code === 409) {
      throw new Error('An account with this email already exists');
    }
    throw new Error(error.message || 'Failed to create account');
  }
}

export async function login(email: string, password: string): Promise<UserSession> {
  try {
    const session = await account.createEmailSession(email, password);
    // Clear cache to force refresh on next getCurrentUser call
    userCache = null;
    userCacheTime = 0;
    return session;
  } catch (error: any) {
    console.error('Error logging in:', error);
    // Provide more user-friendly error messages
    if (error.code === 401) {
      throw new Error('Invalid email or password');
    }
    throw new Error(error.message || 'Failed to login');
  }
}

export async function getCurrentUser(forceRefresh = false) {
  // Return cached user if available and not expired
  const now = Date.now();
  if (!forceRefresh && userCache && now - userCacheTime < USER_CACHE_DURATION) {
    return userCache;
  }

  try {
    const user = await account.get();
    // Update cache
    userCache = user;
    userCacheTime = now;
    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    // Clear cache on error
    userCache = null;
    userCacheTime = 0;
    return null;
  }
}

export async function logout() {
  try {
    const result = await account.deleteSession('current');
    // Clear cache
    userCache = null;
    userCacheTime = 0;
    // Clear invoice cache
    Object.keys(invoiceCache).forEach(key => delete invoiceCache[key]);
    return result;
  } catch (error: any) {
    console.error('Error logging out:', error);
    throw new Error(error.message || 'Failed to logout');
  }
}

// Function to check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  try {
    const user = await getCurrentUser();
    return !!user;
  } catch {
    return false;
  }
}

// Function to save an invoice to the database
export async function saveInvoice(invoiceData: any) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    const invoice = await databases.createDocument(
      DATABASES.INVOICES.ID,
      DATABASES.INVOICES.COLLECTIONS.INVOICES,
      ID.unique(),
      {
        ...invoiceData,
        userId: user.$id,
        createdAt: new Date().toISOString(),
      }
    );

    // Invalidate invoice cache
    const cacheKey = `user_${user.$id}`;
    delete invoiceCache[cacheKey];
    
    return invoice;
  } catch (error: any) {
    console.error('Error saving invoice:', error);
    throw new Error(error.message || 'Failed to save invoice');
  }
}

// Function to get user invoices with caching
export async function getUserInvoices(limit = 10, offset = 0, forceRefresh = false) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    const cacheKey = `user_${user.$id}_${limit}_${offset}`;
    const now = Date.now();
    
    // Return cached data if available and not expired
    if (!forceRefresh && 
        invoiceCache[cacheKey] && 
        now - invoiceCache[cacheKey].timestamp < INVOICE_CACHE_DURATION) {
      return invoiceCache[cacheKey].data;
    }
    
    const invoices = await databases.listDocuments(
      DATABASES.INVOICES.ID,
      DATABASES.INVOICES.COLLECTIONS.INVOICES,
      [
        Query.equal('userId', user.$id),
        Query.orderDesc('createdAt'),
        Query.limit(limit),
        Query.offset(offset)
      ]
    );
    
    // Update cache
    invoiceCache[cacheKey] = {
      data: invoices,
      timestamp: now
    };
    
    return invoices;
  } catch (error: any) {
    console.error('Error fetching invoices:', error);
    throw new Error(error.message || 'Failed to fetch invoices');
  }
}

// Function to get a single invoice by ID with caching
export async function getInvoiceById(invoiceId: string, forceRefresh = false) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    const cacheKey = `invoice_${invoiceId}`;
    const now = Date.now();
    
    // Return cached data if available and not expired
    if (!forceRefresh && 
        invoiceCache[cacheKey] && 
        now - invoiceCache[cacheKey].timestamp < INVOICE_CACHE_DURATION) {
      return invoiceCache[cacheKey].data;
    }
    
    const invoice = await databases.getDocument(
      DATABASES.INVOICES.ID,
      DATABASES.INVOICES.COLLECTIONS.INVOICES,
      invoiceId
    );
    
    // Verify the invoice belongs to the current user
    if (invoice.userId !== user.$id) {
      throw new Error('Access denied: Invoice does not belong to current user');
    }
    
    // Update cache
    invoiceCache[cacheKey] = {
      data: invoice,
      timestamp: now
    };
    
    return invoice;
  } catch (error: any) {
    console.error('Error fetching invoice:', error);
    throw new Error(error.message || 'Failed to fetch invoice');
  }
}

// Function to delete an invoice
export async function deleteInvoice(invoiceId: string) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    // First verify the invoice belongs to the current user
    const invoice = await databases.getDocument(
      DATABASES.INVOICES.ID,
      DATABASES.INVOICES.COLLECTIONS.INVOICES,
      invoiceId
    );
    
    if (invoice.userId !== user.$id) {
      throw new Error('Access denied: Invoice does not belong to current user');
    }
    
    const result = await databases.deleteDocument(
      DATABASES.INVOICES.ID,
      DATABASES.INVOICES.COLLECTIONS.INVOICES,
      invoiceId
    );
    
    // Invalidate all invoice caches for this user
    Object.keys(invoiceCache).forEach(key => {
      if (key.includes(`user_${user.$id}`) || key === `invoice_${invoiceId}`) {
        delete invoiceCache[key];
      }
    });
    
    return result;
  } catch (error: any) {
    console.error('Error deleting invoice:', error);
    throw new Error(error.message || 'Failed to delete invoice');
  }
} 