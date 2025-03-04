# Deploying Your Invoice Generator to Vercel

This guide provides step-by-step instructions for deploying your Invoice Generator application to Vercel.

## Prerequisites

Before you begin, make sure you have:

1. A [Vercel account](https://vercel.com/signup)
2. Your Appwrite instance set up with the necessary collections
3. Node.js and npm installed on your machine

## Option 1: Using the Deployment Script

We've created a convenient deployment script that automates the process:

1. Make sure the script is executable:
   ```bash
   chmod +x deploy.sh
   ```

2. Run the deployment script:
   ```bash
   npm run deploy
   ```

3. Follow the prompts to enter your Appwrite credentials and deploy to Vercel.

## Option 2: Manual Deployment with Vercel CLI

1. Install the Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```

2. Log in to your Vercel account:
   ```bash
   vercel login
   ```

3. Deploy to a preview environment:
   ```bash
   vercel
   ```

4. Deploy to production:
   ```bash
   npm run deploy:prod
   ```

## Option 3: Deploying via the Vercel Dashboard

1. Push your code to a GitHub, GitLab, or Bitbucket repository.

2. Go to the [Vercel Dashboard](https://vercel.com/dashboard).

3. Click "New Project".

4. Import your repository.

5. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `next build`
   - Output Directory: .next
   - Install Command: `npm install`

6. Add the following environment variables:
   - `NEXT_PUBLIC_APPWRITE_ENDPOINT`
   - `NEXT_PUBLIC_APPWRITE_PROJECT_ID`
   - `NEXT_PUBLIC_APPWRITE_DATABASE_ID`
   - `NEXT_PUBLIC_APPWRITE_INVOICES_COLLECTION_ID`
   - `NEXT_PUBLIC_ADSENSE_ID` (if using Google AdSense)

7. Click "Deploy".

## Post-Deployment Steps

After deploying your application, you should:

1. Verify that your application is working correctly by testing the authentication and invoice creation features.

2. Set up a custom domain (optional):
   - Go to your project in the Vercel dashboard
   - Click on "Domains"
   - Add your custom domain and follow the instructions

3. Set up continuous deployment (optional):
   - Vercel automatically deploys when you push to your repository
   - You can configure branch deployments in the project settings

## Troubleshooting

If you encounter issues during deployment:

1. **Environment Variables**: Make sure all required environment variables are set correctly in the Vercel dashboard.

2. **Build Errors**: Check the build logs in the Vercel dashboard for any errors.

3. **API Connection Issues**: Verify that your Appwrite instance is accessible from the Vercel deployment.

4. **CORS Issues**: Ensure your Appwrite instance has the correct CORS settings to allow requests from your Vercel domain.

## Updating Your Deployment

To update your deployed application:

1. Make changes to your code locally.

2. Push the changes to your repository (if using GitHub integration).

3. Or run the deployment command again:
   ```bash
   npm run deploy
   ```

## Monitoring and Analytics

Vercel provides built-in analytics and monitoring tools:

1. Go to your project in the Vercel dashboard.

2. Click on "Analytics" to view performance metrics.

3. Set up Vercel Analytics by adding the following to your `next.config.js`:
   ```js
   module.exports = {
     // ... other config
     analyticsId: process.env.VERCEL_ANALYTICS_ID,
   };
   ```

## Need Help?

If you need further assistance with deployment:

- Check the [Vercel documentation](https://vercel.com/docs)
- Visit the [Appwrite documentation](https://appwrite.io/docs)
- Open an issue in the project repository 