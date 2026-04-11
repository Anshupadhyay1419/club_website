// Feature: robogenesis-website, Property 3: Faculty card renders all required fields
import * as fc from 'fast-check'
import { render, within } from '@testing-library/react'
import type { FacultyMember } from '@/types'
import { safeStringArb } from './_helpers'

function FacultyCard({ faculty }: { faculty: FacultyMember }) {
  return (
    <div>
      <img src={faculty.photo} alt={faculty.name} />
      <h3 data-testid="faculty-name">{faculty.name}</h3>
      <p data-testid="faculty-designation">{faculty.designation}</p>
      <p data-testid="faculty-description">{faculty.description}</p>
    </div>
  )
}

const facultyArb: fc.Arbitrary<FacultyMember> = fc.record({
  id: fc.uuid(),
  name: safeStringArb,
  designation: safeStringArb,
  photo: fc.constant('/images/faculty/test.jpg'),
  description: safeStringArb,
})

describe('Property 3: Faculty card renders all required fields', () => {
  it('renders photo alt, name, designation, and description for any valid FacultyMember', () => {
    fc.assert(
      fc.property(facultyArb, (faculty) => {
        const { container, unmount } = render(<FacultyCard faculty={faculty} />)
        const scope = within(container)

        expect(scope.getByTestId('faculty-name').textContent).toBe(faculty.name)
        expect(scope.getByTestId('faculty-designation').textContent).toBe(faculty.designation)
        expect(scope.getByTestId('faculty-description').textContent).toBe(faculty.description)
        const img = container.querySelector('img')
        expect(img).not.toBeNull()
        expect(img?.getAttribute('alt')).toBe(faculty.name)

        unmount()
      }),
      { numRuns: 100 }
    )
  })
})
