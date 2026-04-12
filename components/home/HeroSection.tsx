'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import Link from 'next/link'

const SplineHero = dynamic(() => import('./SplineHero'), {
  ssr: false,
  loading: () => <div className="absolute inset-0" style={{ background: '#0d0d1a' }} />,
})

const ease = [0.16, 1, 0.3, 1] as const

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: '#0d0d1a' }}
    >
      {/* Spline fills entire section — gets ALL pointer events */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <SplineHero />
      </div>

      {/* Text overlay — pointer-events-none so mouse goes through to Spline */}
      <div
        className="relative flex-1 flex flex-col items-center justify-center text-center px-6 pt-16 pb-24"
        style={{ zIndex: 2, pointerEvents: 'none' }}
      >
        {/* Big display title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease }}
          style={{
            fontFamily: 'var(--font-outfit)',
            fontWeight: 200,
            fontSize: 'clamp(5rem, 15vw, 12rem)',
            lineHeight: 1,
            letterSpacing: '-0.04em',
            background: 'linear-gradient(180deg, #ffffff 0%, rgba(200,210,230,0.7) 50%, rgba(120,140,180,0.4) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          RoboGenesis
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease }}
          style={{
            fontFamily: 'var(--font-inter)',
            fontWeight: 400,
            fontSize: 'clamp(0.9rem, 1.8vw, 1.125rem)',
            color: 'rgba(255, 255, 255, 0.71)',
            lineHeight: 1.7,
            maxWidth: '450px',
            letterSpacing: '0.01em',
            marginTop: '30px',
          }}
        >
          We Build
        </motion.p>

        {/* Buttons — re-enable pointer events only on buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease }}
          className="flex items-center gap-4 mt-8"
          style={{ pointerEvents: 'auto' }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-[0.9rem] font-normal text-white min-h-[44px] transition-all duration-300 hover:bg-white/10"
            style={{
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(10px)',
              letterSpacing: '0.02em',
            }}
          >
            Explore Projects
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-[0.9rem] font-normal min-h-[44px] transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(77,142,255,0.8), rgba(167,139,250,0.8))',
              color: '#fff',
              letterSpacing: '0.02em',
            }}
          >
            Join the Club
          </Link>
        </motion.div>
      </div>

      {/* Bottom tagline — pointer-events-none */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-0 left-0 right-0 flex items-center justify-center py-6"
        style={{
          zIndex: 2,
          pointerEvents: 'none',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          background: 'linear-gradient(0deg, rgba(5,5,16,0.8) 0%, transparent 100%)',
        }}
      >
        <p style={{
          fontFamily: 'var(--font-outfit)',
          fontWeight: 300,
          fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
          color: 'rgba(240,240,245,0.3)',
          letterSpacing: '0.15em',
          textTransform: 'lowercase',
        }}>
          we build with passion
        </p>
      </motion.div>

      {/* Cover Spline watermark — solid block over bottom-right corner */}
      <div
        className="absolute bottom-0 right-0 z-20 pointer-events-none"
        style={{ width: '200px', height: '44px', background: '#0d0d1a' }}
        aria-hidden="true"
      />
    </section>
  )
}
