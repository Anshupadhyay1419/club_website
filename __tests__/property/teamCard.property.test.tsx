// Feature: robogenesis-website, Property 9: Team card renders all required fields
import * as fc from 'fast-check'
import { render, within } from '@testing-library/react'
import TeamCard from '@/components/team/TeamCard'
import type { TeamMember } from '@/types'
import { safeStringArb } from './_helpers'

const teamMemberArb: fc.Arbitrary<TeamMember> = fc.record({
  id: fc.uuid(),
  name: safeStringArb,
  role: safeStringArb,
  photo: fc.constant('/images/test.jpg'),
  skills: fc.array(safeStringArb, { minLength: 1 }),
  linkedinUrl: fc.constant('https://linkedin.com/in/test'),
  githubUrl: fc.constant('https://github.com/test'),
})

describe('Property 9: Team card renders all required fields', () => {
  it('renders name, role, at least one skill, and social links for any valid TeamMember', () => {
    fc.assert(
      fc.property(teamMemberArb, (member) => {
        const { container, unmount } = render(<TeamCard member={member} />)
        const text = container.textContent ?? ''
        const scope = within(container)

        expect(text).toContain(member.name)
        expect(text).toContain(member.role)
        expect(text).toContain(member.skills[0])
        expect(scope.getByLabelText(`${member.name} LinkedIn`)).toBeTruthy()
        expect(scope.getByLabelText(`${member.name} GitHub`)).toBeTruthy()

        unmount()
      }),
      { numRuns: 100 }
    )
  })
})
