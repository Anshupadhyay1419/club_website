// Feature: robogenesis-website, Property 4: Project card renders all required fields
import * as fc from 'fast-check'
import { render } from '@testing-library/react'
import ProjectCard from '@/components/projects/ProjectCard'
import type { Project } from '@/types'
import { safeStringArb } from './_helpers'

const categoryArb = fc.constantFrom('AI', 'Robotics', 'IoT') as fc.Arbitrary<'AI' | 'Robotics' | 'IoT'>

const projectArb: fc.Arbitrary<Project> = fc.record({
  id: fc.uuid(),
  title: safeStringArb,
  description: safeStringArb,
  image: fc.constant('/images/test.jpg'),
  techStack: fc.array(safeStringArb, { minLength: 1 }),
  category: categoryArb,
  githubUrl: fc.option(fc.constant('https://github.com/test'), { nil: undefined }),
  detailUrl: fc.option(fc.constant('https://example.com'), { nil: undefined }),
})

describe('Property 4: Project card renders all required fields', () => {
  it('renders title, description, at least one tech tag, and category for any valid Project', () => {
    fc.assert(
      fc.property(projectArb, (project) => {
        const { container, unmount } = render(<ProjectCard project={project} />)
        const text = container.textContent ?? ''

        expect(text).toContain(project.title)
        expect(text).toContain(project.description)
        expect(text).toContain(project.techStack[0])
        expect(text).toContain(project.category)

        unmount()
      }),
      { numRuns: 100 }
    )
  })
})
