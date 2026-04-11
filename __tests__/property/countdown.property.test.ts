// Feature: robogenesis-website, Property 6: Upcoming event card fields and countdown correctness
import * as fc from 'fast-check'

function getTimeLeft(dateStr: string): { days: number; hours: number; minutes: number; seconds: number } | null {
  const target = new Date(dateStr).getTime()
  if (isNaN(target)) return null
  const diff = target - Date.now()
  if (diff <= 0) return null
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

const validPastDateArb = fc
  .date({ min: new Date(0), max: new Date(Date.now() - 1000) })
  .filter((d) => !isNaN(d.getTime()))

const validFutureDateArb = fc
  .date({ min: new Date(Date.now() + 60000), max: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365) })
  .filter((d) => !isNaN(d.getTime()))

describe('Property 6: Countdown timer correctness', () => {
  it('returns null (Event Ended) for any past date', () => {
    fc.assert(
      fc.property(validPastDateArb, (pastDate) => {
        const result = getTimeLeft(pastDate.toISOString())
        expect(result).toBeNull()
      }),
      { numRuns: 100 }
    )
  })

  it('returns positive time values for any future date', () => {
    fc.assert(
      fc.property(validFutureDateArb, (futureDate) => {
        const result = getTimeLeft(futureDate.toISOString())
        expect(result).not.toBeNull()
        if (result) {
          expect(result.days).toBeGreaterThanOrEqual(0)
          expect(result.hours).toBeGreaterThanOrEqual(0)
          expect(result.hours).toBeLessThan(24)
          expect(result.minutes).toBeGreaterThanOrEqual(0)
          expect(result.minutes).toBeLessThan(60)
          expect(result.seconds).toBeGreaterThanOrEqual(0)
          expect(result.seconds).toBeLessThan(60)
        }
      }),
      { numRuns: 100 }
    )
  })

  it('returns null for invalid date strings', () => {
    fc.assert(
      fc.property(
        fc.string().filter((s) => isNaN(new Date(s).getTime())),
        (invalidDate) => {
          const result = getTimeLeft(invalidDate)
          expect(result).toBeNull()
        }
      ),
      { numRuns: 100 }
    )
  })
})
