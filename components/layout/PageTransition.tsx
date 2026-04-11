'use client'

import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'

/* Full-screen curtain wipe:
   1. Dark panel slides in from left  (covers old page)
   2. Content fades + slides up into view
   3. Panel slides out to right       (reveals new page)
*/

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="relative">

        {/* Curtain overlay */}
        <motion.div
          className="fixed inset-0 z-[200] pointer-events-none origin-left"
          style={{ background: 'linear-gradient(135deg, #07091a 0%, #0d1535 50%, #07091a 100%)' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 0, transition: { duration: 0 } }}
          exit={{ scaleX: 0, transition: { duration: 0 } }}
        />

        {/* Entering curtain */}
        <motion.div
          className="fixed inset-0 z-[200] pointer-events-none"
          style={{ background: 'linear-gradient(135deg, #07091a 0%, #0d1535 50%, #07091a 100%)' }}
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Glowing edge on curtain */}
          <div
            className="absolute right-0 top-0 bottom-0 w-1"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(80,160,255,0.8), transparent)' }}
          />
        </motion.div>

        {/* Page content */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>

      </motion.div>
    </AnimatePresence>
  )
}
