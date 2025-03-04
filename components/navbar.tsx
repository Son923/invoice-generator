"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAppwrite } from "@/contexts/AppwriteContext"

export function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const { user, authenticated, loading, logoutUser } = useAppwrite()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await logoutUser()
      router.push("/")
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  // Check if the current path matches the given path
  const isActive = (path: string) => {
    return pathname?.startsWith(path)
  }

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400 mr-8">
              DocTools
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6">
              <Link 
                href="/invoice" 
                className={`text-sm font-medium transition-colors ${
                  isActive('/invoice') 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                Invoice Generator
              </Link>
              <Link 
                href="/signature" 
                className={`text-sm font-medium transition-colors ${
                  isActive('/signature') 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                Signature Creator
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {authenticated ? (
              <>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center">
                  <span className="mr-1">👋</span> Hello, {user?.name || user?.email.split('@')[0]}
                </span>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth">
                  <Button variant="outline" size="sm" className="border-blue-500 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 pb-2 border-t border-gray-200 dark:border-gray-700 pt-3">
            <div className="flex flex-col space-y-3">
              <Link 
                href="/invoice" 
                className={`text-sm font-medium px-2 py-1 rounded ${
                  isActive('/invoice') 
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-200'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Invoice Generator
              </Link>
              <Link 
                href="/signature" 
                className={`text-sm font-medium px-2 py-1 rounded ${
                  isActive('/signature') 
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-200'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Signature Creator
              </Link>
              
              {authenticated ? (
                <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center">
                    <span className="mr-1">👋</span> Hello, {user?.name || user?.email.split('@')[0]}
                  </span>
                  <Button variant="ghost" size="sm" onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="justify-start text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100">
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <Link href="/auth" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full border-blue-500 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20">
                      Sign In
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 