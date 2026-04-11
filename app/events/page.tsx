import EventCard from '@/components/events/EventCard'
import RegistrationForm from '@/components/events/RegistrationForm'
import SectionHeading from '@/components/ui/SectionHeading'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { events } from '@/data/events'

export default function EventsPage() {
  const upcoming = events.filter((e) => !e.isPast)
  const past = events.filter((e) => e.isPast)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
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

      {/* Registration */}
      <ScrollReveal>
        <SectionHeading title="Register for an Event" subtitle="Secure your spot today" />
        <RegistrationForm />
      </ScrollReveal>
    </div>
  )
}
