'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hoverGlow?: boolean
}

export default function GlassCard({ children, className, hoverGlow = false }: GlassCardProps) {
  return (
    <motion.div
      className={cn('glass rounded-2xl p-6', className)}
      whileHover={hoverGlow ? { y: -4 } : undefined}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}
