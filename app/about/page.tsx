import Image from 'next/image'
import { Cpu, Bot, Wifi, CircuitBoard } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import SectionHeading from '@/components/ui/SectionHeading'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { facultyMembers } from '@/data/team'

function FacultyCard({ id, name, photo, description, designation }: { id: string; name: string; photo: string; description: string; designation?: string }) {
  return (
    <GlassCard hoverGlow className="flex flex-col items-center text-center p-0 overflow-hidden">
      <div className="relative w-full h-72 flex-shrink-0" style={{ background: 'var(--bg-muted)' }}>
        <Image src={photo} alt={name} fill className="object-contain object-top"
          sizes="(max-width: 768px) 100vw, 50vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k="
        />
      </div>
      <div className="p-5 w-full">
        <h3 className="font-bold font-[var(--font-space-grotesk)] text-base mb-1" style={{ color: 'var(--text-primary)' }}>{name}</h3>
        {designation && <p className="text-sm font-semibold mb-2" style={{ color: 'var(--accent)' }}>{designation}</p>}
        <p className="text-sm leading-relaxed mt-2" style={{ color: 'var(--text-secondary)' }}>{description}</p>
      </div>
    </GlassCard>
  )
}

const focusAreas = [
  { icon: Cpu, title: 'Artificial Intelligence', description: 'Building intelligent systems using machine learning, deep learning, and computer vision.' },
  { icon: Bot, title: 'Robotics', description: 'Designing and programming autonomous robots for real-world applications.' },
  { icon: Wifi, title: 'Internet of Things', description: 'Connecting the physical world through smart sensors, networks, and cloud platforms.' },
]

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <ScrollReveal>
        <SectionHeading title="About RoboGenesis" />
        <GlassCard className="mb-16 max-w-4xl">
          <h3 className="text-xl font-bold mb-3 font-[var(--font-space-grotesk)]" style={{ color: 'var(--accent)' }}>Our Mission</h3>
          <p className="leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
            RoboGenesis is a student-driven tech club focused on learning by building. We aim to create a space where students can explore AI, robotics, and emerging technologies through hands-on projects, workshops, and collaboration.

            Our goal is simple: help members develop practical skills, think critically, and gain the confidence to solve real-world problems.
          </p>
          <h3 className="text-xl font-bold mb-3 font-[var(--font-space-grotesk)]" style={{ color: 'var(--accent)' }}>Our Vision</h3>
          <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            To be the premier university tech club that bridges the gap between academic theory and industry practice,
            producing graduates who are ready to lead the next wave of technological innovation.
          </p>
        </GlassCard>
      </ScrollReveal>

      <ScrollReveal>
        <SectionHeading title="What We Do" subtitle="Our core focus areas" />
      </ScrollReveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {focusAreas.map((area, i) => (
          <ScrollReveal key={area.title} delay={i * 0.1}>
            <GlassCard hoverGlow className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full" style={{ background: 'var(--accent-soft)', border: '1px solid var(--border)' }}>
                  <area.icon size={28} style={{ color: 'var(--accent)' }} />
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2 font-[var(--font-space-grotesk)]" style={{ color: 'var(--text-primary)' }}>{area.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{area.description}</p>
            </GlassCard>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal>
        <SectionHeading title="Mentors" subtitle="The mentors guiding our journey" />
      </ScrollReveal>

      {/* Section 1: Club Coordinators */}
      <ScrollReveal>
        <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: 'var(--text-primary)' }}>Club Coordinators</h3>
      </ScrollReveal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
        {[facultyMembers[3], facultyMembers[4]].map((faculty, i) => (
          <ScrollReveal key={faculty.id} delay={i * 0.1}>
            <FacultyCard {...faculty} />
          </ScrollReveal>
        ))}
      </div>

      {/* Section 2: Patrons */}
      <ScrollReveal>
        <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: 'var(--text-primary)' }}>Patron</h3>
      </ScrollReveal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
        {[facultyMembers[1], facultyMembers[2]].map((faculty, i) => (
          <ScrollReveal key={faculty.id} delay={i * 0.1}>
            <FacultyCard {...faculty} />
          </ScrollReveal>
        ))}
      </div>

      {/* Section 3: Dean */}
      <ScrollReveal>
        <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: 'var(--text-primary)' }}>Dean</h3>
      </ScrollReveal>
      <div className="flex justify-center mb-14">
        <div className="w-full max-w-sm">
          <ScrollReveal>
            <FacultyCard {...facultyMembers[0]} />
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}
