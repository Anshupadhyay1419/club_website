'use client'

import Spline from '@splinetool/react-spline'
import { useRef } from 'react'

export default function SplineHero() {
  const splineRef = useRef<HTMLDivElement>(null)

  const onLoad = () => {
    // Remove Spline watermark after scene loads
    setTimeout(() => {
      const container = splineRef.current
      if (!container) return

      // Try to find and hide watermark in shadow DOM
      const canvas = container.querySelector('canvas')
      if (canvas && canvas.parentElement) {
        const siblings = canvas.parentElement.children
        for (const el of Array.from(siblings)) {
          if (el !== canvas) {
            (el as HTMLElement).style.display = 'none'
          }
        }
      }

      // Also try direct DOM search
      const allEls = container.querySelectorAll('*')
      allEls.forEach(el => {
        const text = el.textContent?.trim()
        if (text === 'Built with Spline' || text?.includes('Built with Spline')) {
          (el as HTMLElement).style.display = 'none'
          const parent = el.parentElement
          if (parent) parent.style.display = 'none'
        }
      })
    }, 1000)
  }

  return (
    <div
      ref={splineRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <Spline
        scene="https://prod.spline.design/oTZTab4A1lBMayei/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
        onLoad={onLoad}
      />
    </div>
  )
}
