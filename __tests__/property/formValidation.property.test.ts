// Feature: robogenesis-website, Property 7: Form validation rejects empty required fields
// Feature: robogenesis-website, Property 8: Form email validation rejects invalid email strings
import * as fc from 'fast-check'
import { z } from 'zod'

// Schemas extracted from the form components
const registrationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  phone: z.string().min(1, 'Phone is required'),
  department: z.string().min(1, 'Department is required'),
})

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  message: z.string().min(1, 'Message is required'),
})

describe('Property 7: Form validation rejects empty required fields', () => {
  it('registration schema rejects any submission with at least one empty required field', () => {
    fc.assert(
      fc.property(
        fc.record({
          name: fc.oneof(fc.constant(''), fc.string({ minLength: 1 })),
          email: fc.oneof(fc.constant(''), fc.emailAddress()),
          phone: fc.oneof(fc.constant(''), fc.string({ minLength: 1 })),
          department: fc.oneof(fc.constant(''), fc.string({ minLength: 1 })),
        }).filter((data) =>
          data.name === '' || data.email === '' || data.phone === '' || data.department === ''
        ),
        (data) => {
          const result = registrationSchema.safeParse(data)
          expect(result.success).toBe(false)
          if (!result.success) {
            expect(result.error.issues.length).toBeGreaterThan(0)
          }
        }
      ),
      { numRuns: 100 }
    )
  })

  it('contact schema rejects any submission with at least one empty required field', () => {
    fc.assert(
      fc.property(
        fc.record({
          name: fc.oneof(fc.constant(''), fc.string({ minLength: 1 })),
          email: fc.oneof(fc.constant(''), fc.emailAddress()),
          message: fc.oneof(fc.constant(''), fc.string({ minLength: 1 })),
        }).filter((data) =>
          data.name === '' || data.email === '' || data.message === ''
        ),
        (data) => {
          const result = contactSchema.safeParse(data)
          expect(result.success).toBe(false)
        }
      ),
      { numRuns: 100 }
    )
  })
})

describe('Property 8: Form email validation rejects invalid email strings', () => {
  // Generate strings that are clearly not valid emails
  const invalidEmailArb = fc.oneof(
    fc.constant(''),
    fc.constant('notanemail'),
    fc.constant('missing@'),
    fc.constant('@nodomain'),
    fc.constant('no-at-sign'),
    fc.string({ minLength: 1 }).filter((s) => !s.includes('@') || !s.includes('.')),
  )

  it('registration schema rejects invalid email formats', () => {
    fc.assert(
      fc.property(invalidEmailArb, (invalidEmail) => {
        const result = registrationSchema.safeParse({
          name: 'Test User',
          email: invalidEmail,
          phone: '1234567890',
          department: 'CS',
        })
        expect(result.success).toBe(false)
        if (!result.success) {
          const emailError = result.error.issues.find((i) => i.path.includes('email'))
          expect(emailError).toBeDefined()
        }
      }),
      { numRuns: 100 }
    )
  })

  it('contact schema rejects invalid email formats', () => {
    fc.assert(
      fc.property(invalidEmailArb, (invalidEmail) => {
        const result = contactSchema.safeParse({
          name: 'Test User',
          email: invalidEmail,
          message: 'Hello',
        })
        expect(result.success).toBe(false)
        if (!result.success) {
          const emailError = result.error.issues.find((i) => i.path.includes('email'))
          expect(emailError).toBeDefined()
        }
      }),
      { numRuns: 100 }
    )
  })
})
