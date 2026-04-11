'use client'

import Image from 'next/image'
import { ExternalLink, GitBranch } from 'lucide-react'
import { useState } from 'react'
import type { Project } from '@/types'
import ElectricBorder from '@/components/ui/ElectricBorder'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false)

  const card = (
    <div
      className="rounded-2xl overflow-hidden flex flex-col h-full group"
      style={{
        background: 'var(--bg-card)',
        border: hovered ? 'none' : '1px solid var(--border)',
        boxShadow: hovered ? 'none' : 'var(--shadow)',
        transition: 'box-shadow 0.25s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative w-full h-52 overflow-hidden" style={{ background: 'var(--bg-muted)' }}>
        <Image src={project.image} alt={`${project.title} project image`} fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k="
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 text-xs font-bold rounded-full text-white"
            style={{ background: 'var(--accent)' }}>
            {project.category}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-2 font-[var(--font-space-grotesk)]" style={{ color: 'var(--text-primary)' }}>
          {project.title}
        </h3>
        <p className="text-base leading-relaxed mb-5 flex-1" style={{ color: 'var(--text-secondary)' }}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-5">
          {project.techStack.map((tech) => (
            <span key={tech} className="tag">{tech}</span>
          ))}
        </div>
        {project.githubUrl ? (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold min-h-[44px] transition-opacity hover:opacity-70"
            style={{ color: 'var(--accent)' }}>
            <GitBranch size={16} /> View on GitHub
          </a>
        ) : project.detailUrl ? (
          <a href={project.detailUrl}
            className="inline-flex items-center gap-2 text-sm font-bold min-h-[44px] transition-opacity hover:opacity-70"
            style={{ color: 'var(--accent)' }}>
            <ExternalLink size={16} /> View Details
          </a>
        ) : null}
      </div>
    </div>
  )

  if (hovered) {
    return (
      <ElectricBorder color="#6366f1" speed={0.8} chaos={0.08} borderRadius={20} style={{ display: 'block' }}>
        {card}
      </ElectricBorder>
    )
  }

  return card
}
