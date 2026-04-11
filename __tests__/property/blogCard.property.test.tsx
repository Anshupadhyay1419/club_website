// Feature: robogenesis-website, Property 11: Blog card renders all required fields
import * as fc from 'fast-check'
import { render } from '@testing-library/react'
import BlogCard from '@/components/blog/BlogCard'
import type { BlogPost } from '@/types'
import { safeStringArb } from './_helpers'

const blogPostArb: fc.Arbitrary<BlogPost> = fc.record({
  id: fc.uuid(),
  slug: safeStringArb,
  title: safeStringArb,
  excerpt: safeStringArb,
  content: safeStringArb,
  category: safeStringArb,
  publishedAt: fc.date({ min: new Date(0), max: new Date() })
    .filter((d) => !isNaN(d.getTime()))
    .map((d) => d.toISOString()),
  coverImage: fc.option(fc.constant('/img.jpg'), { nil: undefined }),
})

describe('Property 11: Blog card renders all required fields', () => {
  it('renders title, non-empty excerpt, category tag, and Read More link for any valid BlogPost', () => {
    fc.assert(
      fc.property(blogPostArb, (post) => {
        const { container, unmount } = render(<BlogCard post={post} />)
        const text = container.textContent ?? ''

        // All required fields appear somewhere in the rendered output
        expect(text).toContain(post.title)
        expect(text).toContain(post.excerpt)
        expect(text).toContain(post.category)
        expect(text).toContain('Read More')

        unmount()
      }),
      { numRuns: 100 }
    )
  })
})
