import type { Event } from '@/types'
import EventCard from '@/components/events/EventCard'
import SectionHeading from '@/components/ui/SectionHeading'
import ScrollReveal from '@/components/ui/ScrollReveal'
import GlowButton from '@/components/ui/GlowButton'

interface UpcomingEventsPreviewProps {
  events: Event[]
}

export default function UpcomingEventsPreview({ events }: UpcomingEventsPreviewProps) {
  const upcoming = events.filter((e) => !e.isPast).slice(0, 3)

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <ScrollReveal>
        <SectionHeading
          title="Upcoming Events"
          subtitle="Don't miss what's coming next"
        />
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {upcoming.map((event, i) => (
          <ScrollReveal key={event.id} delay={i * 0.1}>
            <EventCard event={event} variant="upcoming" />
          </ScrollReveal>
        ))}
      </div>

      <div className="text-center">
        <GlowButton label="View All Events" href="/events" variant="secondary" />
      </div>
    </section>
  )
}
