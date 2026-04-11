'use client'

import { useEffect, useRef } from 'react'

export default function SplineHero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Remove any existing content
    containerRef.current.innerHTML = ''

    // Check if script already loaded
    const existingScript = document.querySelector('script[data-spline]')

    const createViewer = () => {
      if (!containerRef.current) return
      const viewer = document.createElement('spline-viewer')
      viewer.setAttribute('url', 'https://prod.spline.design/oTZTab4A1lBMayei/scene.splinecode')
      viewer.setAttribute('loading-anim-type', 'none')
      viewer.style.cssText = 'width:100%;height:100%;display:block;position:absolute;inset:0;'
      containerRef.current.appendChild(viewer)
    }

    if (existingScript) {
      createViewer()
    } else {
      const script = document.createElement('script')
      script.type = 'module'
      script.src = 'https://unpkg.com/@splinetool/viewer@1.9.82/build/spline-viewer.js'
      script.setAttribute('data-spline', 'true')
      script.onload = createViewer
      document.head.appendChild(script)
    }

    return () => {
      if (containerRef.current) containerRef.current.innerHTML = ''
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0, pointerEvents: 'auto' }}
      aria-hidden="true"
    />
  )
}
