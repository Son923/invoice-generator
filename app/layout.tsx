import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@indieboosting/react/indieboosting.css'
import { Navbar } from '@/components/navbar'
import { AppwriteProvider } from '@/contexts/AppwriteContext'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Invoice Generator - Create Professional Invoices',
  description: 'Free online invoice generator to create, download and share professional PDF invoices',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: {
      url: '/apple-touch-icon.png',
      sizes: '180x180',
      type: 'image/png',
    },
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon.svg',
      },
    ],
  },
  manifest: '/manifest.json',
  appleWebApp: {
    title: 'Invoice Generator',
    statusBarStyle: 'black-translucent',
  },
}

export const viewport: Viewport = {
  themeColor: '#4f46e5',
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
          <Analytics />
        </AppwriteProvider>
      </body>
    </html>
  )
}