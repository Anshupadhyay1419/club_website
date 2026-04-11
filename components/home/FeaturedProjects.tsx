import type { Project } from '@/types'
import ProjectCard from '@/components/projects/ProjectCard'
import SectionHeading from '@/components/ui/SectionHeading'
import ScrollReveal from '@/components/ui/ScrollReveal'
import GlowButton from '@/components/ui/GlowButton'

interface FeaturedProjectsProps {
  projects: Project[]
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const featured = projects.slice(0, 3)

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <ScrollReveal>
        <SectionHeading
          title="Featured Projects"
          subtitle="A glimpse of what we've been building"
        />
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {featured.map((project, i) => (
          <ScrollReveal key={project.id} delay={i * 0.1}>
            <ProjectCard project={project} />
          </ScrollReveal>
        ))}
      </div>

      <div className="text-center">
        <GlowButton label="View All Projects" href="/projects" variant="secondary" />
      </div>
    </section>
  )
}
