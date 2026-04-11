// Feature: robogenesis-website, Property 12: Chatbot response matches known keywords
import * as fc from 'fast-check'
import { getResponse, rules } from '@/components/chatbot/chatbotResponses'

const knownRules = rules.filter((r) => r.keywords.length > 0)
const fallbackResponse = rules[rules.length - 1].response

// Get the expected response for a given input (first matching rule)
function expectedResponse(input: string): string {
  const lower = input.toLowerCase()
  const match = knownRules.find((r) => r.keywords.some((k) => lower.includes(k)))
  return match?.response ?? fallbackResponse
}

describe('Property 12: Chatbot response matches known keywords', () => {
  it('returns a non-fallback response for any input containing a known keyword', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...knownRules).chain((rule) =>
          fc.tuple(
            fc.constant(rule),
            fc.constantFrom(...rule.keywords),
            fc.string(),
            fc.string()
          )
        ),
        ([_rule, keyword, prefix, suffix]) => {
          const input = `${prefix}${keyword}${suffix}`
          const response = getResponse(input)
          // Should match some known rule (not fallback)
          expect(response).toBe(expectedResponse(input))
          // The response should be consistent
          expect(response).toBe(getResponse(input))
        }
      ),
      { numRuns: 100 }
    )
  })

  it('returns the fallback response for any input containing no known keywords', () => {
    const allKeywords = knownRules.flatMap((r) => r.keywords)

    fc.assert(
      fc.property(
        fc.string().filter((s) => {
          const lower = s.toLowerCase()
          return !allKeywords.some((k) => lower.includes(k))
        }),
        (input) => {
          const response = getResponse(input)
          expect(response).toBe(fallbackResponse)
        }
      ),
      { numRuns: 100 }
    )
  })

  it('is case-insensitive: same response for upper and lower case keyword', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...knownRules).chain((rule) =>
          fc.tuple(fc.constant(rule), fc.constantFrom(...rule.keywords))
        ),
        ([_rule, keyword]) => {
          // Both cases should return the same response
          expect(getResponse(keyword.toUpperCase())).toBe(getResponse(keyword.toLowerCase()))
          // And neither should be empty
          expect(getResponse(keyword.toLowerCase()).length).toBeGreaterThan(0)
        }
      ),
      { numRuns: 100 }
    )
  })
})
