'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import Link from 'next/link'

const SplineHero = dynamic(() => import('./SplineHero'), { ssr: false })

const ease = [0.16, 1, 0.3, 1] as const

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: '#0d0d1a' }}>

      {/* Spline 3D — robot that follows cursor */}
      <SplineHero />

      {/* Subtle overlay — pointer-events-none so Spline gets all mouse events */}
      <div className="absolute inset-0 bg-black/20 z-[1] pointer-events-none" aria-hidden="true" />

      {/* Hero content — centered like friend's design */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-16 pb-24">

        {/* Big display title — Outfit font, ultra thin */}
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

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease }}
          style={{
            fontFamily: 'var(--font-inter)',
            fontWeight: 300,
            fontSize: 'clamp(0.9rem, 1.8vw, 1.125rem)',
            color: 'rgba(240,240,245,0.55)',
            lineHeight: 1.7,
            maxWidth: '420px',
            letterSpacing: '0.01em',
            marginTop: '24px',
          }}
        >
          Where engineering meets imagination —<br />
          crafting the robots of tomorrow
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease }}
          className="flex items-center gap-4 mt-8"
        >
          <Link
            href="/projects"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-[0.9rem] font-normal text-white min-h-[44px] transition-all duration-300"
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

      {/* Bottom tagline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center py-6"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'linear-gradient(0deg, rgba(5,5,16,0.8) 0%, transparent 100%)' }}
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
    </section>
  )
}
