'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'

const ChatPanel = dynamic(() => import('./ChatPanel'), { ssr: false })

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && <ChatPanel onClose={() => setIsOpen(false)} />}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen((o) => !o)}
        aria-label={isOpen ? 'Close chat assistant' : 'Open chat assistant'}
        className="w-14 h-14 rounded-full bg-[#00f0ff] text-[#0a0a0a] flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] transition-all duration-200"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle size={22} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
