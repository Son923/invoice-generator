"use client"

import { useRef, useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { saveAs } from 'file-saver'
import { AdBanner } from '@/components/ad-banner'

export default function SignaturePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [signatureSaved, setSignatureSaved] = useState(false)

  // Initialize canvas context
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      
      // Set canvas dimensions to match its display size
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      
      if (context) {
        context.lineWidth = 2
        context.lineCap = 'round'
        context.strokeStyle = '#000000'
        setCtx(context)
      }
    }
  }, [])

  // Handle drawing events
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    setSignatureSaved(false)
    
    if (ctx) {
      ctx.beginPath()
      
      // Get coordinates
      const coords = getCoordinates(e)
      if (coords) {
        ctx.moveTo(coords.x, coords.y)
      }
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctx) return
    
    // Get coordinates
    const coords = getCoordinates(e)
    if (coords) {
      ctx.lineTo(coords.x, coords.y)
      ctx.stroke()
    }
  }

  const stopDrawing = () => {
    if (ctx) {
      ctx.closePath()
    }
    setIsDrawing(false)
  }

  // Helper to get coordinates from mouse or touch event
  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return null
    
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    
    if ('touches' in e) {
      // Touch event
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      }
    } else {
      // Mouse event
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
    }
  }

  // Clear the canvas
  const clearSignature = () => {
    if (ctx && canvasRef.current) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      setSignatureSaved(false)
    }
  }

  // Save the signature as PNG
  const saveSignature = () => {
    if (canvasRef.current) {
      canvasRef.current.toBlob((blob) => {
        if (blob) {
          saveAs(blob, 'signature.png')
          setSignatureSaved(true)
        }
      })
    }
  }

  // Main content
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Signature Creator</h1>
      
      {/* Top ad placement */}
      <AdBanner
        slot="1234567890"
        format="horizontal"
        className="mb-6"
      />

      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="border-2 border-gray-300 rounded-md mb-4 bg-gray-50">
          <canvas
            ref={canvasRef}
            className="w-full h-64 touch-none"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>
        
        <div className="flex flex-wrap gap-3 justify-center">
          <Button 
            variant="outline" 
            onClick={clearSignature}
            className="flex-1 sm:flex-none"
          >
            Clear
          </Button>
          <Button 
            onClick={saveSignature}
            className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700"
          >
            Download Signature
          </Button>
        </div>
        
        {signatureSaved && (
          <p className="text-green-600 text-center mt-4">
            Signature saved successfully!
          </p>
        )}
      </div>

      {/* Middle ad placement */}
      <AdBanner
        slot="0987654321"
        format="rectangle"
        className="mb-6"
      />
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-3">Instructions</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Sign in the box above using your mouse or touch screen</li>
          <li>Click "Clear" to start over if needed</li>
          <li>Click "Download Signature" to save your signature as a PNG file</li>
          <li>Your signature can be used in the invoice generator or other documents</li>
        </ul>
      </div>

      {/* Bottom ad placement */}
      <AdBanner
        slot="5432109876"
        format="horizontal"
        className="mt-6"
      />
    </div>
  )
} 