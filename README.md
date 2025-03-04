# Invoice Generator

A professional invoice generator web application built with Next.js, TypeScript, and Appwrite.

## Features

- User authentication (sign up, login, logout)
- Create and generate PDF invoices
- Save invoices to your account
- Responsive design for all devices
- Ad space integration for monetization

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, TailwindCSS, Shadcn/UI
- **Backend**: Appwrite (Authentication, Database)
- **PDF Generation**: jsPDF
- **Deployment**: Vercel
- **Monetization**: Google AdSense

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with your Appwrite credentials:
   ```
   NEXT_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
   NEXT_PUBLIC_APPWRITE_INVOICES_COLLECTION_ID=your_invoices_collection_id
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deploying to Vercel

### Option 1: Deploy with Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy the project:
   ```bash
   vercel
   ```

4. For production deployment:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via GitHub Integration

1. Push your code to a GitHub repository
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your GitHub repository
5. Configure the project:
   - Framework Preset: Next.js
   - Build Command: `next build`
   - Output Directory: `.next`
   - Install Command: `npm install`
6. Add Environment Variables:
   - `NEXT_PUBLIC_APPWRITE_ENDPOINT`
   - `NEXT_PUBLIC_APPWRITE_PROJECT_ID`
   - `NEXT_PUBLIC_APPWRITE_DATABASE_ID`
   - `NEXT_PUBLIC_APPWRITE_INVOICES_COLLECTION_ID`
   - `NEXT_PUBLIC_ADSENSE_ID` (optional for AdSense)
7. Click "Deploy"

## Appwrite Setup

1. Create an Appwrite project
2. Set up a database with an "Invoices" collection
3. Configure the collection with the following attributes:
   - `invoiceNumber` (string)
   - `date` (string)
   - `dueDate` (string)
   - `fromName` (string)
   - `fromEmail` (string)
   - `fromAddress` (string)
   - `toName` (string)
   - `toEmail` (string)
   - `toAddress` (string)
   - `items` (json)
   - `notes` (string)
   - `total` (number)
   - `status` (string)
   - `userId` (string)
   - `createdAt` (string)
4. Set up appropriate indexes and permissions

## AdSense Integration

1. Create a Google AdSense account
2. Get your AdSense publisher ID
3. Add it to your environment variables as `NEXT_PUBLIC_ADSENSE_ID`
4. Deploy to production

## License

MIT 