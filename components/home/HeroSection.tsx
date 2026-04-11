'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import Link from 'next/link'

const HeroVideo = dynamic(() => import('./HeroVideo'), { ssr: false })

const ease = [0.16, 1, 0.3, 1] as const

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: '#02020e' }}>

      {/* Looping video background — lazy loaded */}
      <HeroVideo />
      {/* Dark overlay so text stays readable */}
      <div className="absolute inset-0 bg-black/45" aria-hidden="true" />

      <div className="relative z-10 flex-1 flex flex-col items-start justify-center text-left px-12 md:px-20 lg:px-28 pt-24 pb-32 max-w-3xl">

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-8"
          style={{ background: 'rgba(36, 84, 255, 0.08)', border: '1px solid rgba(0, 115, 255, 0.2)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-[12px] font-bold tracking-[0.2em] uppercase text-blue-800/100">
            Bennett University Club · Est. 2025
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease }}
          className="font-bold leading-none tracking-[-0.04em] text-white mb-4"
          style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: 'clamp(3.2rem, 10vw, 8rem)',
            textShadow: '0 0 80px rgba(80,160,255,0.25)',
          }}
        >
          RoboGenesis
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease }}
          className="font-bold tracking-wide text-white/90 mb-5"
          style={{
            fontFamily: 'var(--font-space-grotesk)',
            fontSize: 'clamp(1rem, 2.5vw, 2rem)',
            letterSpacing: '0.08em',
          }}
        >
           We Build
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="text-[16px] text-white/80 max-w-md leading-relaxed mb-10"
        >
          A student-led community at the frontier of robotics, AI, and embedded systems.
          We build, compete, and push boundaries.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.68 }}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-[14px] font-semibold text-white min-h-[44px] transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, rgba(60,130,255,0.9), rgba(40,100,220,0.9))',
              boxShadow: '0 0 24px rgba(60,130,255,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 40px rgba(60,130,255,0.55), inset 0 1px 0 rgba(255,255,255,0.15)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 24px rgba(60,130,255,0.3), inset 0 1px 0 rgba(255,255,255,0.1)' }}
          >
            Explore Projects
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center px-7 py-3.5 rounded-lg text-[14px] font-medium text-white/90 min-h-[44px] transition-all duration-200 hover:text-white/90"
            style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(80,160,255,0.35)'; (e.currentTarget as HTMLElement).style.background = 'rgba(80,160,255,0.06)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)' }}
          >
            Join the Club
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        aria-hidden="true"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase text-white/20 font-medium">Scroll</span>
        <motion.div
          className="w-px h-8"
          style={{ background: 'linear-gradient(to bottom, rgba(80,160,255,0.4), transparent)' }}
          animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.3, 0.7, 0.3] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
