'use client'

import Image from 'next/image'
import type { Event } from '@/types'
import GlassCard from '@/components/ui/GlassCard'
import CountdownTimer from './CountdownTimer'

interface EventCardProps {
  event: Event
  variant: 'upcoming' | 'past'
}

export default function EventCard({ event, variant }: EventCardProps) {
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  if (variant === 'past') {
    return (
      <GlassCard className="flex flex-col h-full p-0 overflow-hidden gradient-border">
        {event.image && (
          <div className="relative w-full h-44" style={{ background: 'var(--bg-muted)' }}>
            <Image src={event.image} alt={`${event.title} event photo`} fill className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k="
            />
          </div>
        )}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-lg font-bold mb-1 font-[var(--font-space-grotesk)]" style={{ color: 'var(--text-primary)' }}>{event.title}</h3>
          <p className="text-xs mb-3 font-medium" style={{ color: 'var(--text-muted)' }}>{formattedDate}</p>
          {event.highlights && <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{event.highlights}</p>}
        </div>
      </GlassCard>
    )
  }

  return (
    <GlassCard className="flex flex-col h-full gradient-border relative overflow-hidden">
      {/* Accent top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 animated-gradient"
        style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent2), var(--accent3))' }} />
      <div className="pt-4 flex flex-col flex-1">
        <div className="badge mb-3">Upcoming</div>
        <h3 className="text-xl font-bold mb-1 font-[var(--font-space-grotesk)]" style={{ color: 'var(--text-primary)' }}>{event.title}</h3>
        <p className="text-sm mb-3 font-semibold" style={{ color: 'var(--accent)' }}>{formattedDate}</p>
        <p className="text-base leading-relaxed mb-5 flex-1" style={{ color: 'var(--text-secondary)' }}>{event.description}</p>
        <CountdownTimer date={event.date} />
        {event.registrationLink && (
          <a
            href={event.registrationLink}
            className="mt-4 w-full min-h-[44px] flex items-center justify-center rounded-lg font-semibold text-sm text-white transition-all duration-200"
            style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent2))', boxShadow: '0 0 16px var(--glow)' }}
          >
            Register Now →
          </a>
        )}
      </div>
    </GlassCard>
  )
}
