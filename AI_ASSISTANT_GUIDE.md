# AI Assistant Guide for Invoice Generator Project

This guide provides instructions for AI assistants working on the Invoice Generator project. It ensures consistency across conversations and helps maintain the project according to the established standards.

## Project Context

The Invoice Generator is a web application built with Next.js, TypeScript, and Appwrite. It allows users to create, save, and manage professional invoices with PDF generation capabilities.

## Key Instructions

1. **Development Mode by Default**
   - Always work in development mode unless explicitly asked to deploy
   - Do not suggest or initiate deployment to Vercel unless specifically requested
   - Focus on local development and testing

2. **Deployment Process**
   - Only deploy to Vercel when explicitly requested with phrases like:
     - "Deploy to Vercel"
     - "Deploy to production"
     - "Push to production"
   - Follow the deployment steps in PROJECT_DOCUMENTATION.md when requested

3. **Mobile-First Approach**
   - Prioritize mobile responsiveness in all UI components
   - Test layouts on small screens (320px width) first
   - Use responsive Tailwind classes (sm:, md:, lg:) appropriately
   - Ensure form fields are properly sized and spaced on mobile

4. **Appwrite Integration**
   - Remember that `items` are stored as JSON strings in Appwrite
   - Always handle serialization/deserialization for complex data types
   - Implement proper error handling for all Appwrite API calls
   - Use the AppwriteContext for authentication state management

5. **Performance Optimization**
   - Implement caching strategies to minimize API calls
   - Use the established caching patterns in lib/appwrite.ts
   - Consider bundle size when adding new dependencies

6. **Error Handling**
   - Provide user-friendly error messages
   - Log detailed errors to console for debugging
   - Handle network errors gracefully, especially for mobile users

7. **Code Organization**
   - Keep Appwrite API functions in lib/appwrite.ts
   - Place reusable UI components in the components directory
   - Use the AppwriteContext for authentication state

## Common Issues to Watch For

1. **Appwrite String Length Limitation**
   - Remember that Appwrite has a 36-character limit on string attributes
   - Use JSON.stringify for complex data structures
   - Parse JSON strings when retrieving data

2. **CORS Issues**
   - If network requests fail, check Appwrite CORS settings
   - Ensure environment variables are correctly set
   - Verify the Appwrite endpoint is accessible

3. **Mobile Layout Issues**
   - Watch for overlapping elements on small screens
   - Ensure form inputs are properly sized for touch interaction
   - Test on multiple viewport sizes

4. **Authentication Flow**
   - Maintain proper authentication state management
   - Redirect unauthenticated users to the login page
   - Clear cached data on logout

## Response Format

When responding to user queries:

1. **For development tasks**:
   - Explain the proposed changes
   - Implement the changes using appropriate tools
   - Provide clear explanations of what was changed and why

2. **For deployment requests**:
   - Confirm the deployment request
   - Follow the deployment steps in PROJECT_DOCUMENTATION.md
   - Verify the deployment was successful

3. **For troubleshooting**:
   - Diagnose the issue based on error messages and context
   - Propose specific solutions with code examples
   - Explain how to test that the issue is resolved

## Project-Specific Knowledge

1. **Invoice Data Structure**
   ```typescript
   interface InvoiceFormData {
     invoiceNumber: string;
     date: string;
     dueDate: string;
     fromName: string;
     fromEmail: string;
     fromAddress: string;
     toName: string;
     toEmail: string;
     toAddress: string;
     items: Array<{
       description: string;
       quantity: number;
       price: number;
     }>;
     notes: string;
   }
   ```

2. **Appwrite Functions**
   - `createAccount(email, password, name)`: Create a new user account
   - `login(email, password)`: Authenticate a user
   - `getCurrentUser(forceRefresh)`: Get the current authenticated user
   - `logout()`: Log out the current user
   - `isAuthenticated()`: Check if a user is authenticated
   - `saveInvoice(invoiceData)`: Save an invoice to Appwrite
   - `getUserInvoices(limit, offset, forceRefresh)`: Get user's invoices
   - `getInvoiceById(invoiceId, forceRefresh)`: Get a specific invoice
   - `deleteInvoice(invoiceId)`: Delete an invoice

3. **Environment Variables**
   - `NEXT_PUBLIC_APPWRITE_ENDPOINT`: Appwrite API endpoint
   - `NEXT_PUBLIC_APPWRITE_PROJECT_ID`: Appwrite project ID
   - `NEXT_PUBLIC_APPWRITE_DATABASE_ID`: Appwrite database ID
   - `NEXT_PUBLIC_APPWRITE_INVOICES_COLLECTION_ID`: Invoices collection ID
   - `NEXT_PUBLIC_ADSENSE_ID`: Google AdSense ID (for production)

Remember to refer to PROJECT_DOCUMENTATION.md for more detailed information about the project structure and implementation details. 