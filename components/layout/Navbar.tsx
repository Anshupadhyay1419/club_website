'use client'

import Image from 'next/image'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import ThemeToggle from '@/components/layout/ThemeToggle'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/events', label: 'Events' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/blog', label: 'Blog' },
  { href: '/contribute', label: 'Contribute' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const [cursor, setCursor] = useState<{ left: number; width: number; opacity: number }>({ left: 0, width: 0, opacity: 0 })
  const pillRef = useRef<HTMLUListElement>(null)

  const handleMouseEnter = (e: React.MouseEvent<HTMLLIElement>) => {
    const tab = e.currentTarget
    const pill = pillRef.current
    if (!pill) return
    const pillRect = pill.getBoundingClientRect()
    const tabRect = tab.getBoundingClientRect()
    setCursor({ left: tabRect.left - pillRect.left, width: tabRect.width, opacity: 1 })
  }

  const handleMouseLeave = () => setCursor(prev => ({ ...prev, opacity: 0 }))

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl"
      style={{
        background: 'color-mix(in srgb, var(--bg-card) 90%, transparent)',
        borderBottom: '1px solid var(--border)',
        width: '100%',
        maxWidth: '100vw',
      }}
    >
      {/* ── DESKTOP NAV ── */}
      <nav className="hidden md:flex max-w-7xl mx-auto px-6 lg:px-10 items-center justify-between" style={{ height: '64px' }}>
        {/* University logo */}
        <a href="https://www.bennett.edu.in/" target="_blank" rel="noopener noreferrer" aria-label="Bennett University" className="mr-6">
          <Image src="/uni_logo.jpg" alt="University logo" width={90} height={48} className="w-auto object-contain" style={{ height: '44px' }} />
        </a>
        {/* Club logo + name */}
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight flex-shrink-0"
          style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)', fontSize: '1.1rem' }}>
          <Image src="/club_logo.jpeg" alt="RoboGenesis logo" width={40} height={40} className="rounded-full object-cover" />
          RoboGenesis
        </Link>
        {/* Pill nav */}
        <div className="relative">
          <ul ref={pillRef} className="relative flex items-center list-none p-1 rounded-full"
            style={{ border: '1px solid var(--border)', background: 'color-mix(in srgb, var(--bg-card) 70%, transparent)', backdropFilter: 'blur(16px)' }}
            onMouseLeave={handleMouseLeave}>
            <li aria-hidden="true" className="absolute top-1 rounded-full pointer-events-none"
              style={{ left: cursor.left, width: cursor.width, height: 'calc(100% - 8px)', opacity: cursor.opacity,
                background: 'linear-gradient(135deg, var(--accent), var(--accent2))', boxShadow: '0 0 16px var(--glow)',
                transition: 'left 0.22s cubic-bezier(0.16,1,0.3,1), width 0.22s cubic-bezier(0.16,1,0.3,1), opacity 0.15s ease' }} />
            {navLinks.map(({ href, label }) => (
              <li key={href} onMouseEnter={handleMouseEnter} className="relative z-10">
                <Link href={href} className="block px-4 py-2 text-[13px] font-medium tracking-wide uppercase min-h-[36px] flex items-center whitespace-nowrap"
                  style={{ color: pathname === href ? 'var(--accent)' : 'var(--text-secondary)' }}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* CTA */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/contact" className="inline-flex items-center px-5 py-2 rounded-full text-[13px] font-bold text-white btn-gradient min-h-[36px]">
            Join Us
          </Link>
        </div>
      </nav>

      {/* ── MOBILE NAV ── */}
      <nav className="md:hidden flex items-center justify-between w-full" style={{ height: '64px', padding: '0 12px' }}>
        {/* Left: both logos */}
        <div className="flex items-center gap-2">
          <a href="https://www.bennett.edu.in/" target="_blank" rel="noopener noreferrer" aria-label="Bennett University">
            <Image src="/uni_logo.jpg" alt="University logo" width={55} height={30} className="w-auto object-contain" style={{ height: '28px' }} />
          </a>
          <div className="w-px h-4 opacity-20" style={{ background: 'var(--text-muted)' }} />
          <Link href="/" className="flex items-center gap-1.5 font-bold" style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>
            <Image src="/club_logo.jpeg" alt="RoboGenesis logo" width={28} height={28} className="rounded-full object-cover" style={{ width: '28px', height: '28px' }} />
            <span style={{ fontSize: '0.85rem' }}>RoboGenesis</span>
          </Link>
        </div>
        {/* Right: theme + hamburger */}
        <div className="flex items-center" style={{ gap: '2px' }}>
          <ThemeToggle />
          <button
            style={{ color: 'var(--text-secondary)', padding: '8px', minWidth: '40px', minHeight: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden"
            style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border)' }}
          >
            <ul className="flex flex-col px-6 py-3 gap-0.5">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} onClick={() => setMenuOpen(false)}
                    className={cn('block px-3 py-3 rounded-md text-[14px] font-semibold min-h-[44px] flex items-center')}
                    style={{
                      color: pathname === href ? 'var(--accent)' : 'var(--text-secondary)',
                      background: pathname === href ? 'var(--accent-soft)' : 'transparent',
                    }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
