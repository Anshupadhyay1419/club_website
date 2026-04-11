// Feature: robogenesis-website, Property 2: Upcoming events preview is bounded
import * as fc from 'fast-check'
import type { Event } from '@/types'

// Test the slice logic directly (pure function extracted from UpcomingEventsPreview)
function getUpcomingPreview(events: Event[]): Event[] {
  return events.filter((e) => !e.isPast).slice(0, 3)
}

const upcomingEventArb: fc.Arbitrary<Event> = fc.record({
  id: fc.uuid(),
  title: fc.string({ minLength: 1 }),
  description: fc.string({ minLength: 1 }),
  date: fc.date({ min: new Date(Date.now() + 86400000) }).map((d) => d.toISOString()),
  isPast: fc.constant(false),
})

const pastEventArb: fc.Arbitrary<Event> = fc.record({
  id: fc.uuid(),
  title: fc.string({ minLength: 1 }),
  description: fc.string({ minLength: 1 }),
  date: fc.date({ max: new Date(Date.now() - 1000) }).map((d) => d.toISOString()),
  isPast: fc.constant(true),
  highlights: fc.option(fc.string({ minLength: 1 }), { nil: undefined }),
})

const eventArb = fc.oneof(upcomingEventArb, pastEventArb)

describe('Property 2: Upcoming events preview is bounded', () => {
  it('returns at most 3 upcoming events for any array of 0–50 events', () => {
    fc.assert(
      fc.property(
        fc.array(eventArb, { minLength: 0, maxLength: 50 }),
        (events) => {
          const preview = getUpcomingPreview(events)
          // At most 3
          expect(preview.length).toBeLessThanOrEqual(3)
          // All are upcoming
          preview.forEach((e) => expect(e.isPast).toBe(false))
          // Count matches expectation
          const upcomingCount = events.filter((e) => !e.isPast).length
          expect(preview.length).toBe(Math.min(upcomingCount, 3))
        }
      ),
      { numRuns: 100 }
    )
  })
})
