'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { Project } from '@/types'
import ProjectModal from './ProjectModal'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div
        className="glass rounded-2xl overflow-hidden flex flex-col h-full group cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <div className="relative w-full h-48 overflow-hidden" style={{ background: 'var(--bg-muted)' }}>
          <Image src={project.image} alt={`${project.title} project image`} fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k="
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 text-xs font-bold rounded-full text-white" style={{ background: 'var(--accent)' }}>
              {project.category}
            </span>
          </div>
          {/* Click hint */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="px-4 py-2 rounded-full text-xs font-bold text-white" style={{ background: 'rgba(99,102,241,0.85)' }}>
              View Details
            </span>
          </div>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-base font-bold mb-2 font-[var(--font-space-grotesk)]" style={{ color: 'var(--text-primary)' }}>
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: 'var(--text-secondary)' }}>
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span key={tech} className="tag text-xs">{tech}</span>
            ))}
          </div>
        </div>
      </div>

      {open && <ProjectModal project={project} onClose={() => setOpen(false)} />}
    </>
  )
}
