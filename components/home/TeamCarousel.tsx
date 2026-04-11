'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { teamMembers } from '@/data/team'

export default function TeamCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [fading, setFading] = useState(false)

  const goTo = useCallback((index: number) => {
    setFading(true)
    setTimeout(() => {
      setActiveIndex(((index % teamMembers.length) + teamMembers.length) % teamMembers.length)
      setFading(false)
    }, 280)
  }, [])

  // Autoplay
  useEffect(() => {
    const timer = setInterval(() => goTo(activeIndex + 1), 5000)
    return () => clearInterval(timer)
  }, [activeIndex, goTo])

  const member = teamMembers[activeIndex]

  const getCardStyle = (i: number): React.CSSProperties => {
    const dist = Math.abs(i - activeIndex)
    const wrapDist = Math.min(dist, teamMembers.length - dist)
    if (i === activeIndex) return { opacity: 1, transform: 'rotate(0deg) scale(1) translateY(0)', zIndex: 10 }
    if (wrapDist === 1) return { opacity: 0.4, transform: `rotate(${i < activeIndex ? '-6deg' : '6deg'}) scale(0.92) translateY(16px)`, zIndex: 5 }
    return { opacity: 0, transform: 'scale(0.85) translateY(40px)', zIndex: 1 }
  }

  return (
    <section className="py-24 px-6" style={{ background: 'var(--bg)' }}>
      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(99,102,241,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(99,102,241,0.05) 1px, transparent 1px)',
          backgroundSize: '3rem 3rem',
        }} />

      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="badge mb-4">Our Team</p>
          <h2 className="font-black tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-outfit)', fontWeight: 300, fontSize: 'clamp(2rem,5vw,3.5rem)', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
            Meet the Minds Behind<br />
            <span className="gradient-text">RoboGenesis</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 300 }}>
            Passionate engineers and innovators building the robots of tomorrow.
          </p>
        </div>

        {/* Carousel grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* Stacked image cards */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-[300px] h-[360px]">
              {teamMembers.map((m, i) => (
                <div
                  key={m.id}
                  className="absolute inset-0 rounded-2xl overflow-hidden cursor-pointer"
                  style={{
                    ...getCardStyle(i),
                    transition: 'opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)',
                    boxShadow: '0 25px 60px rgba(0,0,0,0.2), 0 0 40px rgba(99,102,241,0.06)',
                  }}
                  onClick={() => goTo(i)}
                >
                  <Image src={m.photo} alt={m.name} fill className="object-cover object-top"
                    sizes="300px"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k="
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Text area */}
          <div className="flex flex-col justify-center">
            <div style={{ minHeight: '180px' }}>
              <h3
                className="font-bold mb-1 transition-all duration-300"
                style={{
                  fontFamily: 'var(--font-outfit)',
                  fontWeight: 600,
                  fontSize: '1.5rem',
                  color: 'var(--text-primary)',
                  opacity: fading ? 0 : 1,
                  transform: fading ? 'translateY(-12px)' : 'translateY(0)',
                  transition: 'opacity 0.28s ease, transform 0.28s ease',
                }}
              >
                {member.name}
              </h3>
              <p
                className="mb-6"
                style={{
                  color: 'var(--accent)',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  opacity: fading ? 0 : 1,
                  transform: fading ? 'translateY(-8px)' : 'translateY(0)',
                  transition: 'opacity 0.28s ease 0.05s, transform 0.28s ease 0.05s',
                }}
              >
                {member.role}
              </p>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '1rem',
                  fontWeight: 300,
                  lineHeight: 1.75,
                  opacity: fading ? 0 : 1,
                  transform: fading ? 'translateY(12px)' : 'translateY(0)',
                  transition: 'opacity 0.28s ease 0.08s, transform 0.28s ease 0.08s',
                }}
              >
                &ldquo;A passionate member of RoboGenesis, contributing to the club&apos;s mission of building intelligent machines and pushing the boundaries of robotics and AI.&rdquo;
              </p>
            </div>

            {/* Controls */}
            <div className="flex gap-3 mt-10">
              <button
                onClick={() => goTo(activeIndex - 1)}
                className="flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200"
                style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
                aria-label="Previous member"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
                </svg>
              </button>
              <button
                onClick={() => goTo(activeIndex + 1)}
                className="flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200"
                style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
                aria-label="Next member"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
                </svg>
              </button>

              {/* Dots */}
              <div className="flex items-center gap-1.5 ml-2">
                {teamMembers.map((_, i) => (
                  <button key={i} onClick={() => goTo(i)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === activeIndex ? '20px' : '6px',
                      height: '6px',
                      background: i === activeIndex ? 'var(--accent)' : 'var(--border)',
                    }}
                    aria-label={`Go to member ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
