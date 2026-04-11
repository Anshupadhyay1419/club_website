'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Send, X } from 'lucide-react'
import type { ChatMessage } from '@/types'
import { getResponse } from './chatbotResponses'

interface ChatPanelProps {
  onClose: () => void
}

export default function ChatPanel({ onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'bot',
      text: 'Hi! I\'m the Robogenesis assistant. Ask me about joining, events, projects, or anything else!',
      timestamp: Date.now(),
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const sendMessage = useCallback(() => {
    const text = input.trim()
    if (!text) return
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: 'user', text, timestamp: Date.now() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)
    setTimeout(() => {
      const botMsg: ChatMessage = { id: `b-${Date.now()}`, role: 'bot', text: getResponse(text), timestamp: Date.now() }
      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)
    }, 800 + Math.random() * 400)
  }, [input])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl w-80 h-[420px] flex flex-col overflow-hidden shadow-xl"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Robogenesis Assistant</span>
        </div>
        <button onClick={onClose} aria-label="Close chat"
          className="p-1 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
          style={{ color: 'var(--text-muted)' }}>
          <X size={16} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className="max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed"
              style={msg.role === 'user'
                ? { background: 'var(--accent)', color: '#fff', fontWeight: 500 }
                : { background: 'var(--bg-muted)', color: 'var(--text-primary)' }
              }
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="px-3 py-2 rounded-xl flex gap-1 items-center" style={{ background: 'var(--bg-muted)' }}>
              {[0, 1, 2].map((i) => (
                <motion.span key={i} className="w-1.5 h-1.5 rounded-full block"
                  style={{ background: 'var(--text-muted)' }}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-3 py-3 flex gap-2" style={{ borderTop: '1px solid var(--border)' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything..."
          className="flex-1 px-3 min-h-[44px] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-colors"
          style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
        />
        <button onClick={sendMessage} aria-label="Send message"
          className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-all duration-200">
          <Send size={16} />
        </button>
      </div>
    </motion.div>
  )
}
