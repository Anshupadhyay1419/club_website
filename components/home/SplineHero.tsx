'use client'

import { useEffect, useRef } from 'react'

export default function SplineHero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Dynamically load the Spline viewer script
    const script = document.createElement('script')
    script.type = 'module'
    script.src = 'https://unpkg.com/@splinetool/viewer@1.9.82/build/spline-viewer.js'
    document.head.appendChild(script)

    script.onload = () => {
      if (!containerRef.current) return
      // Create the spline-viewer element after script loads
      const viewer = document.createElement('spline-viewer')
      viewer.setAttribute('url', 'https://prod.spline.design/oTZTab4A1lBMayei/scene.splinecode')
      viewer.style.width = '100%'
      viewer.style.height = '100%'
      viewer.style.display = 'block'
      containerRef.current.appendChild(viewer)
    }

    return () => {
      if (containerRef.current) containerRef.current.innerHTML = ''
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  )
}
