'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md transition-all duration-200"
      style={{ color: 'var(--text-secondary)', background: 'var(--bg-muted)' }}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
