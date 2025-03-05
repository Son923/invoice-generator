"use client"

import React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAppwrite } from "@/contexts/AppwriteContext"

function Bubble({ x, y, size, color }: { x: number; y: number; size: number; color: string }) {
  return (
    <motion.circle
      cx={x}
      cy={y}
      r={size}
      fill={color}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0.7, 0.3, 0.7],
        scale: [1, 1.2, 1],
        x: x + Math.random() * 100 - 50,
        y: y + Math.random() * 100 - 50,
      }}
      transition={{
        duration: 5 + Math.random() * 10,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      }}
    />
  )
}

function FloatingBubbles() {
  const [bubbles, setBubbles] = React.useState<Array<{ id: number; x: number; y: number; size: number; color: string }>>([])

  React.useEffect(() => {
    const newBubbles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 20 + 5,
      color: `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.3)`,
    }))
    setBubbles(newBubbles)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full">
        <title>Floating Bubbles</title>
        {bubbles.map((bubble) => (
          <Bubble key={bubble.id} {...bubble} />
        ))}
      </svg>
    </div>
  )
}

interface FloatingBubblesBackgroundProps {
  title?: string
  children?: React.ReactNode
}

export default function FloatingBubblesBackground({
  title = "Free Invoice Generator",
  children
}: FloatingBubblesBackgroundProps) {
  const words = title.split(" ")
  const { authenticated } = useAppwrite()

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Animated background bubbles */}
      <div className="absolute inset-0 max-w-7xl mx-auto">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 400 - 200],
              x: [0, Math.random() * 400 - 200],
              scale: [1, Math.random() * 0.5 + 0.5],
              opacity: [0.3, 0.6],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <div
              className="h-64 w-64 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 
                         dark:from-blue-600/20 dark:to-purple-600/20 blur-3xl"
            />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <FloatingBubbles />

        <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-8 tracking-tighter">
              {words.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block mr-4 last:mr-0">
                  {word.split("").map((letter, letterIndex) => (
                    <motion.span
                      key={`${wordIndex}-${letterIndex}`}
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        delay: wordIndex * 0.1 + letterIndex * 0.03,
                        type: "spring",
                        stiffness: 150,
                        damping: 25,
                      }}
                      className="inline-block text-transparent bg-clip-text 
                                 bg-gradient-to-r from-blue-600 to-purple-600 
                                 dark:from-blue-300 dark:to-purple-300"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
              ))}
            </h1>

            <div
              className="inline-block group relative bg-gradient-to-b from-blue-400/30 to-purple-400/30 
                             dark:from-blue-600/30 dark:to-purple-600/30 p-px rounded-2xl backdrop-blur-lg 
                             overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <Link href={authenticated ? "/invoice" : "/auth"}>
                <Button
                  variant="ghost"
                  className="rounded-[1.15rem] px-8 py-6 text-lg font-semibold backdrop-blur-md 
                             bg-white/80 hover:bg-white/90 dark:bg-black/80 dark:hover:bg-black/90 
                             text-blue-600 dark:text-blue-300 transition-all duration-300 
                             group-hover:-translate-y-0.5 border border-blue-200/50 dark:border-blue-700/50
                             hover:shadow-md dark:hover:shadow-blue-900/30"
                >
                  <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                    {authenticated ? "Go to Board" : "Sign In"}
                  </span>
                  <span
                    className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 
                               transition-all duration-300"
                  >
                    →
                  </span>
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

