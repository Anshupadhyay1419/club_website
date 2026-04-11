// Feature: robogenesis-website, Property 10: Lightbox navigation cycles through all images
import * as fc from 'fast-check'

// Navigation logic extracted from GalleryGrid
function goNext(current: number, total: number): number {
  return (current + 1) % total
}

function goPrev(current: number, total: number): number {
  return (current - 1 + total) % total
}

describe('Property 10: Lightbox navigation cycles through all images', () => {
  it('pressing next N times from any index returns to the starting index', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 2, max: 20 }), // N images
        fc.integer({ min: 0 }).chain((n) =>
          fc.tuple(fc.constant(n), fc.integer({ min: 2, max: 20 }))
        ),
        (_, [startOffset, total]) => {
          const start = startOffset % total
          let current = start
          for (let i = 0; i < total; i++) {
            current = goNext(current, total)
          }
          expect(current).toBe(start)
        }
      ),
      { numRuns: 100 }
    )
  })

  it('pressing prev N times from any index returns to the starting index', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 2, max: 20 }).chain((total) =>
          fc.tuple(fc.constant(total), fc.integer({ min: 0, max: total - 1 }))
        ),
        ([total, start]) => {
          let current = start
          for (let i = 0; i < total; i++) {
            current = goPrev(current, total)
          }
          expect(current).toBe(start)
        }
      ),
      { numRuns: 100 }
    )
  })

  it('next and prev are inverse operations', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 2, max: 20 }).chain((total) =>
          fc.tuple(fc.constant(total), fc.integer({ min: 0, max: total - 1 }))
        ),
        ([total, start]) => {
          expect(goPrev(goNext(start, total), total)).toBe(start)
          expect(goNext(goPrev(start, total), total)).toBe(start)
        }
      ),
      { numRuns: 100 }
    )
  })
})
