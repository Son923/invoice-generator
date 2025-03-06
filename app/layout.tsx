import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@indieboosting/react/indieboosting.css'
import { Navbar } from '@/components/navbar'
import { AppwriteProvider } from '@/contexts/AppwriteContext'
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Invoice Generator - Create Professional Invoices',
  description: 'Free online invoice generator to create, download and share professional PDF invoices',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;
  
  return (
    <html lang="en">
      <head>
        {/* AdSense Script - only included if ADSENSE_ID is provided */}
        {adsenseId ? (
          <script 
            async 
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
          />
        ) : (
          // Development placeholder notification
          <script dangerouslySetInnerHTML={{
            __html: `
              console.log('AdSense placeholder: Add NEXT_PUBLIC_ADSENSE_ID to .env.local for production');
            `
          }} />
        )}
      </head>
      <body className={inter.className}>
        <AppwriteProvider>
          <Navbar />
          {children}
          <SpeedInsights />
        </AppwriteProvider>
      </body>
    </html>
  )
}