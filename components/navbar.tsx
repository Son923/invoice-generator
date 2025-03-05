"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Check if the current path matches the given path
  const isActive = (path: string) => {
    return pathname?.startsWith(path)
  }

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                Invoice Generator
              </span>
            </Link>
            
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              <Link 
                href="/invoice"
                className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActive('/invoice')
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'
                }`}
              >
                Create Invoice
              </Link>
              <Link 
                href="/signature"
                className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  isActive('/signature')
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'
                }`}
              >
                Signature
              </Link>
            </div>
          </div>

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
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link 
            href="/invoice"
            onClick={() => setIsMenuOpen(false)}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/invoice')
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'
            }`}
          >
            Create Invoice
          </Link>
          <Link 
            href="/signature"
            onClick={() => setIsMenuOpen(false)}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/signature')
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'
            }`}
          >
            Signature
          </Link>
        </div>
      </div>
    </nav>
  )
} 