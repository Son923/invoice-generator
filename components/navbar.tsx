"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAppwrite } from "@/contexts/AppwriteContext"

export function Navbar() {
  const router = useRouter()
  const { user, authenticated, loading, logoutUser } = useAppwrite()

  const handleLogout = async () => {
    try {
      await logoutUser()
      router.push("/")
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Invoice Generator
        </Link>

        <div className="flex items-center space-x-4">
          {authenticated ? (
            <>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center">
                <span className="mr-1">👋</span> Hello, {user?.name || user?.email.split('@')[0]}
              </span>
              <Link href="/invoice">
                <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Create Invoice
                </Button>
              </Link>
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
    </nav>
  )
} 