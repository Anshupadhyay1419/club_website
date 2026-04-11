interface SectionHeadingProps {
  title: string
  subtitle?: string
  className?: string
  centered?: boolean
  badge?: string
}

export default function SectionHeading({ title, subtitle, className, centered, badge }: SectionHeadingProps) {
  return (
    <div className={`mb-14 ${centered ? 'text-center flex flex-col items-center' : ''} ${className ?? ''}`}>
      {badge && (
        <div className="badge mb-5">{badge}</div>
      )}
      <h2
        className="font-[var(--font-space-grotesk)] text-2xl md:text-3xl font-black mb-4 tracking-tight leading-tight"
        style={{ color: 'var(--text-primary)' }}
      >
        {title}
      </h2>
      <div className={`h-1 w-14 rounded-full mb-5 animated-gradient ${centered ? 'mx-auto' : ''}`}
        style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent2), var(--accent3))' }} />
      {subtitle && (
        <p className="text-sm max-w-2xl" style={{ color: 'var(--text-muted)' }}>{subtitle}</p>
      )}
    </div>
  )
}
