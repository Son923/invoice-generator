"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAppwrite } from "@/contexts/AppwriteContext"

export function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Check if the current path matches the given path
  const isActive = (path: string) => {
    return pathname?.startsWith(path)
  }

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo and primary navigation */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-blue-600">
                Invoice Generator
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4 items-center">
              <Link 
                href="/invoice"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/invoice')
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
                }`}
              >
                Create Invoice
              </Link>
              <Link 
                href="/signature"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/signature')
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
                }`}
              >
                Signature
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
            >
              <span className="sr-only">Open main menu</span>
              {/* Menu icon */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            href="/invoice"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/invoice')
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
            }`}
          >
            Create Invoice
          </Link>
          <Link
            href="/signature"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/signature')
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400'
            }`}
          >
            Signature
          </Link>
        </div>
      </div>
    </nav>
  )
} 