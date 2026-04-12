'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { X, Download, GitBranch } from 'lucide-react'
import type { Project } from '@/types'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!project) return null

  const handleDownload = () => {
    const content = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${project.title} - RoboGenesis</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; color: #1a1a2e; line-height: 1.6; }
    h1 { color: #6366f1; font-size: 28px; border-bottom: 2px solid #6366f1; padding-bottom: 10px; }
    h2 { color: #374151; font-size: 18px; margin-top: 24px; }
    .badge { display: inline-block; background: #eef2ff; color: #6366f1; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: 600; margin-bottom: 16px; }
    .tech { display: inline-block; background: #f3f4f6; color: #374151; padding: 3px 10px; border-radius: 6px; font-size: 12px; margin: 3px; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #9ca3af; font-size: 12px; }
    pre { white-space: pre-wrap; font-family: Arial, sans-serif; }
  </style>
</head>
<body>
  <div class="badge">${project.category}</div>
  <h1>${project.title}</h1>
  <p>${project.description}</p>
  <h2>Technologies Used</h2>
  <div>${project.techStack.map(t => `<span class="tech">${t}</span>`).join('')}</div>
  <h2>Project Details</h2>
  <pre>${project.fullDescription || project.description}</pre>
  ${project.githubUrl ? `<h2>Repository</h2><p><a href="${project.githubUrl}">${project.githubUrl}</a></p>` : ''}
  <div class="footer">
    <p>RoboGenesis — Bennett University Tech Club | robogenesis@bennett.edu.in</p>
    <p>Generated on ${new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
  </div>
</body>
</html>`

    const blob = new Blob([content], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${project.title.replace(/\s+/g, '-').toLowerCase()}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: '0 24px 64px rgba(0,0,0,0.4)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header image */}
        <div className="relative w-full h-52" style={{ background: 'var(--bg-muted)' }}>
          <Image src={project.image} alt={project.title} fill className="object-cover rounded-t-2xl"
            sizes="672px"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k="
          />
          {/* Close button */}
          <button onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full transition-all"
            style={{ background: 'rgba(0,0,0,0.5)', color: '#fff' }}
            aria-label="Close">
            <X size={18} />
          </button>
          {/* Category badge */}
          <span className="absolute top-3 left-3 px-3 py-1 text-xs font-bold rounded-full text-white"
            style={{ background: 'var(--accent)' }}>
            {project.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2 font-[var(--font-space-grotesk)]"
            style={{ color: 'var(--text-primary)' }}>
            {project.title}
          </h2>
          <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.map(tech => (
              <span key={tech} className="tag text-xs">{tech}</span>
            ))}
          </div>

          {/* Full description */}
          {project.fullDescription && (
            <div className="mb-6 p-4 rounded-xl text-sm leading-relaxed whitespace-pre-line"
              style={{ background: 'var(--bg-muted)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}>
              {project.fullDescription}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all btn-gradient"
            >
              <Download size={16} />
              Download Details
            </button>
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={{ border: '1px solid var(--border)', color: 'var(--text-secondary)', background: 'var(--bg-muted)' }}>
                <GitBranch size={16} />
                View on GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
