import FloatingBubblesBackground from '@/components/floating-bubbles'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <FloatingBubblesBackground />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Document Tools Hub
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Create professional documents with our suite of free online tools
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Invoice Generator Card */}
          <Link href="/invoice" className="group">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-200 dark:border-gray-700">
              <div className="mb-4 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Invoice Generator
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Create, customize, and download professional invoices in seconds
              </p>
              <div className="mt-6 text-center">
                <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-medium">
                  Get Started →
                </span>
              </div>
            </div>
          </Link>
          
          {/* Signature Creator Card */}
          <Link href="/signature" className="group">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-200 dark:border-gray-700">
              <div className="mb-4 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                Signature Creator
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Draw and download your digital signature for documents
              </p>
              <div className="mt-6 text-center">
                <span className="inline-block px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full font-medium">
                  Create Signature →
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  )
} 