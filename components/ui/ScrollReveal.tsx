'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'fade'
  className?: string
}

const directionVariants = {
  up: { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } },
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
}

export default function ScrollReveal({ children, delay = 0, direction = 'up', className }: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })
  const variants = directionVariants[direction]

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ duration: 0.4, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
