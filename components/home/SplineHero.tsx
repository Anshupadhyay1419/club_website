'use client'

import Spline from '@splinetool/react-spline'

export default function SplineHero() {
  return (
    <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }} aria-hidden="true">
      <Spline
        scene="https://prod.spline.design/oTZTab4A1lBMayei/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
