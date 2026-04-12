import Link from 'next/link'
import EventCard from '@/components/events/EventCard'
import SectionHeading from '@/components/ui/SectionHeading'
import ScrollReveal from '@/components/ui/ScrollReveal'
import GlassCard from '@/components/ui/GlassCard'
import { events } from '@/data/events'

export default function EventsPage() {
  const upcoming = events.filter((e) => !e.isPast)
  const past = events.filter((e) => e.isPast)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Register for Events Section */}
      <ScrollReveal>
        <SectionHeading title="Register for an Event" subtitle="Choose an upcoming event to register" />
      </ScrollReveal>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {upcoming.length > 0 ? (
          upcoming.map((event, i) => (
            <ScrollReveal key={event.id} delay={i * 0.1}>
              <GlassCard hoverGlow className="flex flex-col h-full">
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2 font-[var(--font-space-grotesk)]" style={{ color: 'var(--text-primary)' }}>
                    {event.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                    {event.description}
                  </p>
                  <p className="text-xs font-semibold mb-4" style={{ color: 'var(--accent)' }}>
                    📅 {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                {event.registrationLink ? (
                  <a href={event.registrationLink} target="_blank" rel="noopener noreferrer"
                    className="w-full px-4 py-2 rounded-lg font-semibold text-center text-white transition-all duration-200 min-h-[44px] flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent2))', boxShadow: '0 0 16px var(--glow)' }}>
                    Register Now
                  </a>
                ) : (
                  <button disabled
                    className="w-full px-4 py-2 rounded-lg font-semibold text-center text-white transition-all duration-200 min-h-[44px] flex items-center justify-center opacity-50 cursor-not-allowed"
                    style={{ background: 'var(--bg-muted)' }}>
                    Registration Closed
                  </button>
                )}
              </GlassCard>
            </ScrollReveal>
          ))
        ) : (
          <GlassCard className="col-span-full text-center py-8">
            <p style={{ color: 'var(--text-secondary)' }}>No upcoming events at the moment. Check back soon!</p>
          </GlassCard>
        )}
      </div>

      {/* Upcoming Events */}
      <ScrollReveal>
        <SectionHeading title="Upcoming Events" subtitle="Mark your calendar" />
      </ScrollReveal>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {upcoming.map((event, i) => (
          <ScrollReveal key={event.id} delay={i * 0.1}>
            <EventCard event={event} variant="upcoming" />
          </ScrollReveal>
        ))}
      </div>

      {/* Past Events */}
      <ScrollReveal>
        <SectionHeading title="Past Events" subtitle="A look back at what we've done" />
      </ScrollReveal>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
        {past.map((event, i) => (
          <ScrollReveal key={event.id} delay={i * 0.1}>
            <EventCard event={event} variant="past" />
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}
