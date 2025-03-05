import Link from "next/link"
import { Button } from "@/components/ui/button"
import FloatingBubblesBackground from "@/components/floating-bubbles"
import { AdBanner } from "@/components/ad-banner"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
      {/* Top ad banner */}
      <div className="w-full max-w-5xl mx-auto pt-4 px-4">
        <AdBanner 
          slot="1234567890" 
          format="horizontal" 
          backgroundColor="bg-blue-100/50 dark:bg-blue-800/50" 
          borderColor="border-blue-300 dark:border-blue-700"
        />
      </div>

      <FloatingBubblesBackground title="Free Invoice Generator">
        <div className="text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Free Invoice Generator
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            Create professional invoices in seconds. No sign-up required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/invoice">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                Create Invoice
              </Button>
            </Link>
            <Link href="/signature">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg font-semibold rounded-xl border-2 border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                Create Signature
              </Button>
            </Link>
          </div>
        </div>
      </FloatingBubblesBackground>

      {/* Bottom ad banner */}
      <div className="w-full max-w-5xl mx-auto pb-4 px-4">
        <AdBanner 
          slot="5432109876" 
          format="rectangle" 
          backgroundColor="bg-purple-100/50 dark:bg-purple-800/50" 
          borderColor="border-purple-300 dark:border-purple-700"
        />
      </div>
    </div>
  )
} 