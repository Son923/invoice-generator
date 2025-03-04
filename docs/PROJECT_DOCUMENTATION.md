# Invoice Generator - Project Documentation

## Project Overview

The Invoice Generator is a web application built with Next.js, TypeScript, and Appwrite. It allows users to create, save, and manage professional invoices with PDF generation capabilities.

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, TailwindCSS, Shadcn/UI
- **Backend**: Appwrite (Authentication, Database)
- **PDF Generation**: jsPDF
- **Deployment**: Vercel
- **Monetization**: Google AdSense

## Project Structure

```
invoice-generator/
├── app/                    # Next.js app directory
│   ├── auth/               # Authentication pages
│   ├── invoice/            # Invoice creation pages
│   ├── layout.tsx          # Root layout component
│   └── page.tsx            # Home page
├── components/             # Reusable UI components
│   ├── ad-banner.tsx       # AdSense banner component
│   ├── navbar.tsx          # Navigation bar component
│   ├── ui/                 # UI components from shadcn/ui
│   └── floating-bubbles.tsx # Animated background component
├── contexts/               # React context providers
│   └── AppwriteContext.tsx # Appwrite authentication context
├── lib/                    # Utility functions and libraries
│   └── appwrite.ts         # Appwrite client configuration and API functions
├── public/                 # Static assets
├── .env.local              # Environment variables (not in git)
├── next.config.js          # Next.js configuration
├── package.json            # Project dependencies
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── vercel.json             # Vercel deployment configuration
```

## Environment Variables

Create a `.env.local` file with the following variables:

```
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://appwrite.1202design.com/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
NEXT_PUBLIC_APPWRITE_INVOICES_COLLECTION_ID=your_invoices_collection_id

# Google AdSense (uncomment and add your ID for production)
# NEXT_PUBLIC_ADSENSE_ID=your_adsense_id
```

## Appwrite Setup

### Collections Structure

#### Invoices Collection

| Attribute       | Type   | Required | Description                                |
|-----------------|--------|----------|--------------------------------------------|
| invoiceNumber   | string | Yes      | Unique invoice identifier                  |
| date            | string | Yes      | Invoice creation date                      |
| dueDate         | string | Yes      | Payment due date                           |
| fromName        | string | Yes      | Sender's name or company                   |
| fromEmail       | string | Yes      | Sender's email                             |
| fromAddress     | string | Yes      | Sender's address                           |
| toName          | string | Yes      | Recipient's name or company                |
| toEmail         | string | Yes      | Recipient's email                          |
| toAddress       | string | Yes      | Recipient's address                        |
| items           | string | Yes      | JSON string of invoice items               |
| notes           | string | No       | Additional notes                           |
| total           | number | Yes      | Total invoice amount                       |
| status          | string | Yes      | Invoice status (e.g., "generated")         |
| userId          | string | Yes      | ID of the user who created the invoice     |
| createdAt       | string | Yes      | Timestamp of invoice creation              |

**Important Note**: The `items` field is stored as a JSON string to work around Appwrite's 36-character limit on string attributes. The application handles serialization/deserialization automatically.

### Appwrite CORS Configuration

For production deployment, add your Vercel domain to the allowed domains in Appwrite:
1. Log in to your Appwrite console
2. Go to Settings → Project Settings → Security
3. Add your Vercel deployment URL to the list of allowed domains

## Development Workflow

### Branch Management

1. **Development Branch (`dev`)**
   - All development work should be done on the `dev` branch
   - Commit and push changes to the `dev` branch regularly
   - Never push directly to the `main` branch

2. **Main Branch (`main`)**
   - The `main` branch is reserved for production-ready code
   - Only push to `main` when explicitly requested by the project owner
   - Merging to `main` should be followed by a production deployment

### Local Development

1. Clone the repository
2. Switch to the development branch:
   ```bash
   git checkout dev
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables in `.env.local`
5. Run the development server:
   ```bash
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000) in your browser

### Code Structure Best Practices

1. **API Functions**: Keep all Appwrite API calls in `lib/appwrite.ts`
2. **Authentication**: Use the AppwriteContext for managing user state
3. **Components**: Create reusable components in the `components` directory
4. **Mobile Responsiveness**: Ensure all UI components work well on mobile devices

## Deployment Process

### Development vs. Production

- **Development**: Use `npm run dev` for local development
- **Production**: Deploy to Vercel only when explicitly requested

### Deploying to Vercel

1. Merge changes from `dev` to `main` (only when requested):
   ```bash
   git checkout main
   git merge dev
   git push origin main
   ```

2. Deploy to Vercel:
   ```bash
   vercel --prod
   ```

### Post-Deployment Checks

After deploying to production, verify:
1. Authentication works correctly
2. Invoice creation and PDF generation function properly
3. Mobile layout displays correctly
4. AdSense ads appear (if configured)

## Common Issues and Solutions

### Invoice Items Storage

The `items` array is stored as a JSON string in Appwrite to avoid the 36-character limit on string attributes. The application handles this automatically:

- When saving: `items: JSON.stringify(invoiceData.items)`
- When retrieving: `items: typeof invoice.items === 'string' ? JSON.parse(invoice.items) : invoice.items`

### Mobile Layout

The application uses responsive design with Tailwind CSS. Key mobile optimizations include:
- Stacking form fields vertically on small screens
- Adjusting grid layouts with responsive classes
- Using appropriate spacing and font sizes for mobile

### Appwrite CORS Issues

If you encounter "Network request failed" errors, check:
1. Appwrite CORS settings include your domain
2. Environment variables are correctly set
3. Appwrite server is accessible

## AI Assistant Instructions

When working with the AI assistant on this project:

1. **Development Mode**: By default, work in development mode without deploying to Vercel
2. **Deployment**: Only deploy to Vercel when explicitly requested
3. **Mobile First**: Prioritize mobile-friendly design for all UI components
4. **Error Handling**: Implement robust error handling for all API calls
5. **Performance**: Use caching strategies to minimize API calls

## Future Enhancements

Potential features to implement:
- Invoice templates
- Dashboard for viewing saved invoices
- Email sending functionality
- Payment integration
- Dark mode toggle
- Multi-language support 