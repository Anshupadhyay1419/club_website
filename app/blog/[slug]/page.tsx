import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { blogPosts } from '@/data/blog'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) notFound()

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Back link */}
      <Link href="/blog"
        className="inline-flex items-center gap-1 text-sm font-medium transition-colors mb-8"
        style={{ color: 'var(--text-muted)' }}>
        ← Back to Blog
      </Link>

      {/* Cover image */}
      {post.coverImage && (
        <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-8" style={{ background: 'var(--bg-muted)' }}>
          <Image src={post.coverImage} alt={`Cover image for ${post.title}`}
            fill className="object-cover" priority
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k="
          />
        </div>
      )}

      {/* Meta */}
      <div className="flex items-center gap-3 mb-4">
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-violet-100 text-violet-600 border border-violet-200">
          {post.category}
        </span>
        <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{formattedDate}</span>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-6 font-[var(--font-space-grotesk)] leading-tight"
        style={{ color: 'var(--text-primary)' }}>
        {post.title}
      </h1>

      {/* Author */}
      {post.author && (
        <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
          By {post.author}
        </p>
      )}

      {/* Content */}
      <div className="leading-relaxed whitespace-pre-wrap text-base" style={{ color: 'var(--text-secondary)' }}>
        {post.content}
      </div>
    </div>
  )
}
