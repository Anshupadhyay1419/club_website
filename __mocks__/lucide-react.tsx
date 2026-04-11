import React from 'react'

// Mock all lucide-react icons as simple SVG elements
const createIcon = (name: string) => {
  const Icon = ({ size = 24, className = '', ...props }: { size?: number; className?: string; [key: string]: unknown }) =>
    <svg data-testid={`icon-${name}`} width={size} height={size} className={className} aria-hidden="true" {...props} />
  Icon.displayName = name
  return Icon
}

export const Github = createIcon('Github')
export const Linkedin = createIcon('Linkedin')
export const Instagram = createIcon('Instagram')
export const Twitter = createIcon('Twitter')
export const Mail = createIcon('Mail')
export const Menu = createIcon('Menu')
export const X = createIcon('X')
export const ExternalLink = createIcon('ExternalLink')
export const ChevronLeft = createIcon('ChevronLeft')
export const ChevronRight = createIcon('ChevronRight')
export const Send = createIcon('Send')
export const MessageCircle = createIcon('MessageCircle')
export const Cpu = createIcon('Cpu')
export const Bot = createIcon('Bot')
export const Wifi = createIcon('Wifi')
export const CircuitBoard = createIcon('CircuitBoard')
