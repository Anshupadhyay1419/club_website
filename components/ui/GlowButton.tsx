'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlowButtonProps {
  label: string
  href?: string
  onClick?: () => void
  variant: 'primary' | 'secondary'
  className?: string
}

export default function GlowButton({ label, href, onClick, variant, className }: GlowButtonProps) {
  const isPrimary = variant === 'primary'

  const cls = cn(
    'inline-flex items-center justify-center px-7 py-3.5 font-bold rounded-xl transition-all duration-200 min-h-[44px] cursor-pointer text-[15px]',
    isPrimary ? 'btn-gradient text-white' : 'text-sm font-semibold',
    className
  )

  const style = isPrimary ? {} : {
    border: '1px solid var(--border)',
    color: 'var(--text-secondary)',
    background: 'var(--bg-card)',
  }

  if (href) {
    return (
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.15 }}>
        <Link href={href} className={cls} style={style}>
          {isPrimary ? <span>{label}</span> : label}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.button onClick={onClick} className={cls} style={style}
      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.15 }}>
      {isPrimary ? <span>{label}</span> : label}
    </motion.button>
  )
}
