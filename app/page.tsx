import FloatingBubblesBackground from '@/components/floating-bubbles'
import { AdBanner } from '@/components/ad-banner'

export default function Home() {
  return (
    <main className="relative">
      <FloatingBubblesBackground />
      
      {/* Fixed position ad banner at the bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-2 bg-white/30 dark:bg-black/30 backdrop-blur-md">
        <div className="container mx-auto max-w-5xl">
          <AdBanner 
            slot="9876543210" 
            format="horizontal" 
            height="60px"
            backgroundColor="bg-white/70 dark:bg-gray-800/70" 
            borderColor="border-gray-300 dark:border-gray-600"
            className="my-0"
          />
        </div>
      </div>
    </main>
  )
} 