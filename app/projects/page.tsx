'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard from '@/components/projects/ProjectCard'
import FilterBar from '@/components/ui/FilterBar'
import SectionHeading from '@/components/ui/SectionHeading'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { projects } from '@/data/projects'
import type { Project } from '@/types'

const FILTER_OPTIONS = ['All', 'AI', 'Robotics', 'IoT']

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered: Project[] =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <ScrollReveal>
        <SectionHeading
          title="Our Projects"
          subtitle="Explore what we've been building across AI, Robotics, and IoT"
        />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="mb-10">
          <FilterBar
            options={FILTER_OPTIONS}
            active={activeFilter}
            onChange={setActiveFilter}
          />
        </div>
      </ScrollReveal>

      <AnimatePresence mode="popLayout">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  )
}
