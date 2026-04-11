'use client'

import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import ThemeToggle from '@/components/layout/ThemeToggle'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/events', label: 'Events' },
  { href: '/team', label: 'Team' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl"
      style={{
        background: 'color-mix(in srgb, var(--bg-card) 85%, transparent)',
        borderBottom: '1px solid var(--border)',
        boxShadow: '0 1px 0 var(--border)',
      }}
    >
      <nav className="max-w-7xl mx-auto px-8 lg:px-12 flex items-center justify-between h-20">
        {/* University logo — extreme left, clickable */}
        <a href="https://www.bennett.edu.in/" target="_blank" rel="noopener noreferrer" aria-label="Bennett University">
          <Image src="/uni_logo.jpg" alt="University logo" width={100} height={52} className="h-13 w-auto object-contain flex-shrink-0 mr-4 -ml-6" />
        </a>

        {/* Club logo + name */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-2xl font-bold tracking-tight"
          style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}
        >
          <Image
            src="/club_logo.jpeg"
            alt="RoboGenesis logo"
            width={52}
            height={52}
            className="rounded-full object-cover"
          />
          RoboGenesis
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-0.5">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="relative px-3 py-2 rounded-md text-[15px] font-semibold transition-colors duration-150 min-h-[44px] inline-flex items-center"
                style={{ color: pathname === href ? 'var(--accent)' : 'var(--text-secondary)' }}
              >
                {pathname === href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-md"
                    style={{ background: 'var(--accent-soft)' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA & Theme Toggle */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/contact"
            className="inline-flex items-center px-5 py-2 rounded-xl text-[14px] font-bold text-white btn-gradient transition-colors duration-150 min-h-[40px] shadow-sm"
          >
            Join Us
          </Link>
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
            style={{ color: 'var(--text-secondary)' }}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
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
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      'block px-3 py-3 rounded-md text-[15px] font-semibold transition-colors duration-150 min-h-[44px] flex items-center'
                    )}
                    style={{
                      color: pathname === href ? 'var(--accent)' : 'var(--text-secondary)',
                      background: pathname === href ? 'var(--accent-soft)' : 'transparent',
                    }}
                  >
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
