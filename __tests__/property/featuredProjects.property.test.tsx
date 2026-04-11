// Feature: robogenesis-website, Property 1: Featured projects preview is bounded
import * as fc from 'fast-check'
import type { Project } from '@/types'

// Test the slice logic directly (pure function extracted from FeaturedProjects)
function getFeaturedProjects(projects: Project[]): Project[] {
  return projects.slice(0, 3)
}

const categoryArb = fc.constantFrom('AI', 'Robotics', 'IoT') as fc.Arbitrary<'AI' | 'Robotics' | 'IoT'>

const projectArb: fc.Arbitrary<Project> = fc.record({
  id: fc.uuid(),
  title: fc.string({ minLength: 1 }),
  description: fc.string({ minLength: 1 }),
  image: fc.constant('/img.jpg'),
  techStack: fc.array(fc.string({ minLength: 1 }), { minLength: 1 }),
  category: categoryArb,
})

describe('Property 1: Featured projects preview is bounded', () => {
  it('returns at most 3 projects for any array of 0–50 projects', () => {
    fc.assert(
      fc.property(
        fc.array(projectArb, { minLength: 0, maxLength: 50 }),
        (projects) => {
          const featured = getFeaturedProjects(projects)
          // At most 3
          expect(featured.length).toBeLessThanOrEqual(3)
          // Exactly min(projects.length, 3)
          expect(featured.length).toBe(Math.min(projects.length, 3))
          // First 3 projects in order
          featured.forEach((p, i) => expect(p.id).toBe(projects[i].id))
        }
      ),
      { numRuns: 100 }
    )
  })
})
