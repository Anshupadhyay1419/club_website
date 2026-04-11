'use client'

import { useEffect, useRef } from 'react'

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    // Load and play after page is interactive
    video.src = '/animation1.mp4'
    video.load()
    video.play().catch(() => {})
  }, [])

  return (
    <video
      ref={videoRef}
      loop
      muted
      playsInline
      preload="none"
      className="absolute inset-0 w-full h-full object-cover"
      aria-hidden="true"
    />
  )
}
