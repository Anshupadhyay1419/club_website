import * as fc from 'fast-check'

// Safe alphanumeric string arbitrary (no control chars, no special chars)
// Trimmed and with consecutive spaces collapsed to match Testing Library's whitespace normalization
export const safeStringArb: fc.Arbitrary<string> = fc
  .stringMatching(/^[A-Za-z0-9 ]{1,20}$/)
  .map((s) => s.trim().replace(/\s+/g, ' '))
  .filter((s) => s.length > 0)
