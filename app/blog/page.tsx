import BlogCard from '@/components/blog/BlogCard'
import SectionHeading from '@/components/ui/SectionHeading'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { blogPosts } from '@/data/blog'

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <ScrollReveal>
        <SectionHeading
          title="Blog & Resources"
          subtitle="Tutorials, insights, and knowledge from the Robogenesis community"
        />
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post, i) => (
          <ScrollReveal key={post.id} delay={i * 0.1}>
            <BlogCard post={post} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}
