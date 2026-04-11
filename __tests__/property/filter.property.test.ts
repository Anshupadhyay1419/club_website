// Feature: robogenesis-website, Property 5: Filter returns exactly the matching subset
import * as fc from 'fast-check'
import type { Project } from '@/types'

const categoryArb = fc.constantFrom('AI', 'Robotics', 'IoT') as fc.Arbitrary<'AI' | 'Robotics' | 'IoT'>
const filterArb = fc.constantFrom('All', 'AI', 'Robotics', 'IoT')

const projectArb: fc.Arbitrary<Project> = fc.record({
  id: fc.uuid(),
  title: fc.string({ minLength: 1 }),
  description: fc.string({ minLength: 1 }),
  image: fc.constant('/img.jpg'),
  techStack: fc.array(fc.string({ minLength: 1 }), { minLength: 1 }),
  category: categoryArb,
})

// The filter logic extracted from app/projects/page.tsx
function filterProjects(projects: Project[], filter: string): Project[] {
  return filter === 'All' ? projects : projects.filter((p) => p.category === filter)
}

describe('Property 5: Filter returns exactly the matching subset', () => {
  it('returns all projects when filter is All', () => {
    fc.assert(
      fc.property(fc.array(projectArb, { maxLength: 50 }), (projects) => {
        const result = filterProjects(projects, 'All')
        expect(result).toHaveLength(projects.length)
        expect(result).toEqual(projects)
      }),
      { numRuns: 100 }
    )
  })

  it('returns exactly the matching subset for any category filter', () => {
    fc.assert(
      fc.property(fc.array(projectArb, { maxLength: 50 }), filterArb, (projects, filter) => {
        const result = filterProjects(projects, filter)

        if (filter === 'All') {
          expect(result).toHaveLength(projects.length)
        } else {
          // Every returned project matches the filter
          result.forEach((p) => expect(p.category).toBe(filter))
          // No matching project is excluded
          const expected = projects.filter((p) => p.category === filter)
          expect(result).toHaveLength(expected.length)
        }
      }),
      { numRuns: 100 }
    )
  })
})
