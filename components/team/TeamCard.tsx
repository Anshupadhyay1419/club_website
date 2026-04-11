import Image from 'next/image'
import { Link2, GitBranch } from 'lucide-react'
import type { TeamMember } from '@/types'
import GlassCard from '@/components/ui/GlassCard'

interface TeamCardProps {
  member: TeamMember
}

export default function TeamCard({ member }: TeamCardProps) {
  return (
    <GlassCard hoverGlow className="flex flex-col items-center text-center">
      <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4 flex-shrink-0"
        style={{ background: 'var(--bg-muted)' }}>
        <Image src={member.photo} alt={`${member.name} – ${member.role}`}
          fill className="object-cover" sizes="160px"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k="
        />
      </div>

      <h3 className="text-lg font-bold mb-1 font-[var(--font-space-grotesk)]" style={{ color: 'var(--text-primary)' }}>
        {member.name}
      </h3>
      <p className="text-sm mb-4" style={{ color: 'var(--accent)' }}>{member.role}</p>

      <div className="flex gap-3">
        {member.linkedinUrl && (
          <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer"
            aria-label={`${member.name} LinkedIn`}
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center transition-opacity hover:opacity-70"
            style={{ color: 'var(--text-muted)' }}>
            <Link2 size={18} />
          </a>
        )}
        {member.githubUrl && (
          <a href={member.githubUrl} target="_blank" rel="noopener noreferrer"
            aria-label={`${member.name} GitHub`}
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center transition-opacity hover:opacity-70"
            style={{ color: 'var(--text-muted)' }}>
            <GitBranch size={18} />
          </a>
        )}
      </div>
    </GlassCard>
  )
}
