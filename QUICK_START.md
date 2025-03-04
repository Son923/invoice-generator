# Invoice Generator - Quick Start Guide

This guide will help you get started with the Invoice Generator project quickly.

## Prerequisites

- Node.js 18+ and npm
- Git
- An Appwrite account or access to the project's Appwrite instance

## Setup Steps

### 1. Clone the Repository

```bash
git clone https://github.com/Son923/invoice-generator.git
cd invoice-generator
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the project root with the following variables:

```
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://appwrite.1202design.com/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
NEXT_PUBLIC_APPWRITE_INVOICES_COLLECTION_ID=your_invoices_collection_id

# Google AdSense (uncomment and add your ID for production)
# NEXT_PUBLIC_ADSENSE_ID=your_adsense_id
```

Replace the placeholder values with your actual Appwrite credentials.

### 4. Start the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Key Features

- **User Authentication**: Sign up, login, and logout functionality
- **Invoice Creation**: Create professional invoices with customizable fields
- **PDF Generation**: Generate downloadable PDF invoices
- **Invoice Storage**: Save invoices to your Appwrite database
- **Responsive Design**: Works on desktop and mobile devices

## Common Development Tasks

### Creating a New Component

1. Create a new file in the `components` directory
2. Import necessary dependencies
3. Define your component
4. Export the component

Example:
```tsx
// components/MyComponent.tsx
import React from 'react';

interface MyComponentProps {
  title: string;
}

export function MyComponent({ title }: MyComponentProps) {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold">{title}</h2>
    </div>
  );
}
```

### Working with Appwrite

All Appwrite-related functions are in `lib/appwrite.ts`. To add a new function:

1. Open `lib/appwrite.ts`
2. Add your new function following the existing patterns
3. Implement proper error handling and caching if needed

Example:
```typescript
export async function myNewFunction(param: string) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    // Your Appwrite API call here
    
    return result;
  } catch (error: any) {
    console.error('Error in myNewFunction:', error);
    throw new Error(error.message || 'Failed to execute function');
  }
}
```

### Testing Your Changes

1. Make your changes in development mode
2. Test thoroughly on both desktop and mobile viewports
3. Check for any console errors
4. Verify that all features work as expected

## Project Documentation

For more detailed information about the project, refer to:

- `PROJECT_DOCUMENTATION.md` - Comprehensive project documentation
- `AI_ASSISTANT_GUIDE.md` - Guide for AI assistants working on the project
- `DEPLOYMENT_CHECKLIST.md` - Checklist for deploying to production

## Getting Help

If you encounter any issues or have questions:

1. Check the existing documentation
2. Review the code comments
3. Consult with the project maintainers

## Development Workflow

1. Create a new branch for your feature or fix
2. Make your changes
3. Test thoroughly
4. Commit and push your changes
5. Create a pull request
6. Wait for review and approval

Remember: Only deploy to production when explicitly requested to do so. 