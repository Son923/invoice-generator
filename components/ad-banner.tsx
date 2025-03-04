"use client"

import React from "react"

interface AdBannerProps {
  slot: string
  format: "auto" | "vertical" | "horizontal" | "rectangle"
  height?: string
  className?: string
  backgroundColor?: string
  borderColor?: string
}

/**
 * AdBanner component for displaying Google AdSense ads with visual placeholders during development
 */
export function AdBanner({
  slot,
  format,
  height = "90px",
  className = "",
  backgroundColor = "bg-gray-200 dark:bg-gray-700",
  borderColor = "border-gray-400 dark:border-gray-500"
}: AdBannerProps) {
  // Determine height based on format
  const getHeight = () => {
    if (format === "vertical") return "600px"
    if (format === "rectangle") return "250px"
    if (format === "horizontal") return "90px"
    return height
  }

  return (
    <div className={`my-4 w-full overflow-hidden ${className}`}>
      {/* Visual placeholder for development */}
      <div 
        className={`${backgroundColor} border-2 border-dashed ${borderColor} rounded-md flex items-center justify-center`}
        style={{ 
          height: getHeight(),
          minHeight: format === "auto" ? height : "auto"
        }}
      >
        <div className="text-center p-4">
          <p className="text-gray-500 dark:text-gray-400 font-medium">Advertisement</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">Format: {format} | Slot: {slot}</p>
        </div>
      </div>
      
      {/* Actual AdSense code (hidden during development) */}
      <div className="hidden">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-YOUR_ADSENSE_ID"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        ></ins>
        <script
          dangerouslySetInnerHTML={{
            __html: `(adsbygoogle = window.adsbygoogle || []).push({});`
          }}
        />
      </div>
    </div>
  )
} 