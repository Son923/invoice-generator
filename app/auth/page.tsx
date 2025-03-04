"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { createAccount, login } from "@/lib/appwrite"
import { AdBanner } from "@/components/ad-banner"
import { useAppwrite } from "@/contexts/AppwriteContext"

export default function AuthPage() {
  const router = useRouter()
  const { authenticated, refreshUser } = useAppwrite()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Redirect if already authenticated
  useEffect(() => {
    if (authenticated) {
      router.replace("/invoice")
    }
  }, [authenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      if (isLogin) {
        await login(email, password)
        console.log("Login successful")
      } else {
        if (password.length < 8) {
          throw new Error("Password must be at least 8 characters long")
        }
        await createAccount(email, password, name)
        console.log("Account created and logged in")
      }
      
      // Refresh user data in context
      await refreshUser()
      
      // Redirect to invoice page on success
      router.push("/invoice")
    } catch (err: any) {
      console.error("Authentication error:", err)
      setError(err.message || "An error occurred during authentication")
    } finally {
      setLoading(false)
    }
  }

  // If still checking authentication, show nothing to prevent flash
  if (authenticated) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 p-4">
      {/* Top ad banner */}
      <div className="w-full max-w-5xl mx-auto mb-4">
        <AdBanner 
          slot="1234567890" 
          format="horizontal" 
          backgroundColor="bg-blue-100/50 dark:bg-blue-800/50" 
          borderColor="border-blue-300 dark:border-blue-700"
        />
      </div>
      
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
          <h1 className="text-2xl font-bold text-center mb-6">
            {isLogin ? "Sign In" : "Create Account"}
          </h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
                minLength={8}
              />
              <p className="text-xs text-gray-500 mt-1">
                {!isLogin && "Password must be at least 8 characters long"}
              </p>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
      
      {/* Bottom ad banner */}
      <div className="w-full max-w-5xl mx-auto mt-4">
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