import Link from 'next/link'
import type { BlogPost } from '@/types'
import GlassCard from '@/components/ui/GlassCard'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <GlassCard hoverGlow className="flex flex-col h-full">
      <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3 self-start"
        style={{ background: 'var(--accent-soft)', color: 'var(--accent)', border: '1px solid var(--border-accent)' }}>
        {post.category}
      </span>
      <h3 className="text-lg font-bold mb-2 font-[var(--font-space-grotesk)] leading-snug" style={{ color: 'var(--text-primary)' }}>
        {post.title}
      </h3>
      <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>{formattedDate}</p>
      <p className="text-base leading-relaxed mb-4 flex-1" style={{ color: 'var(--text-secondary)' }}>{post.excerpt}</p>
      <Link href={`/blog/${post.slug}`}
        className="inline-flex items-center gap-1 text-sm font-semibold min-h-[44px] transition-opacity hover:opacity-70"
        style={{ color: 'var(--accent)' }}>
        Read More →
      </Link>
    </GlassCard>
  )
}
