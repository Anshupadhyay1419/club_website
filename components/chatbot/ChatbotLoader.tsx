'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const ChatbotWidget = dynamic(() => import('./ChatbotWidget'), {
  ssr: false,
  loading: () => null,
})

export default function ChatbotLoader() {
  const [show, setShow] = useState(false)

  // Delay chatbot load until after page is interactive
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  if (!show) return null
  return <ChatbotWidget />
}
