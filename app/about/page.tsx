import Image from 'next/image'
import { Cpu, Bot, Wifi, CircuitBoard } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import SectionHeading from '@/components/ui/SectionHeading'
import ScrollReveal from '@/components/ui/ScrollReveal'

function FacultyCard({ id, name, photo, description }: { id: string; name: string; photo: string; description: string }) {
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
        <p className="text-sm leading-relaxed mt-2" style={{ color: 'var(--text-secondary)' }}>{description}</p>
      </div>
    </GlassCard>
  )
}

const focusAreas = [
  { icon: Cpu, title: 'Artificial Intelligence', description: 'Building intelligent systems using machine learning, deep learning, and computer vision.' },
  { icon: Bot, title: 'Robotics', description: 'Designing and programming autonomous robots for real-world applications.' },
  { icon: Wifi, title: 'Internet of Things', description: 'Connecting the physical world through smart sensors, networks, and cloud platforms.' },
  { icon: CircuitBoard, title: 'Embedded Systems', description: 'Programming microcontrollers and building efficient, low-level hardware solutions.' },
]

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <ScrollReveal>
        <SectionHeading title="About RoboGenesis" />
        <GlassCard className="mb-16 max-w-4xl">
          <h3 className="text-xl font-bold mb-3 font-[var(--font-space-grotesk)]" style={{ color: 'var(--accent)' }}>Our Mission</h3>
          <p className="leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
            RoboGenesis is a student-led tech club dedicated to pushing the boundaries of AI, Robotics, and Innovation.
            We believe that the engineers of tomorrow are built today — through hands-on projects, collaborative learning,
            and a relentless drive to solve real-world problems.
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
        <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: 'var(--text-primary)' }}>Our Club Coordinators</h3>
      </ScrollReveal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
        {[
          { id: 'f4', name: 'Dr. Prateek Yadav', photo: '/images/faculty/Prateek.jpg', description: 'Associate Professor in Electronics & Communication. Research focus on real-time image processing, object detection, and visual SLAM systems.' },
          { id: 'f6', name: 'Dr. Navneet Pratap Singh', photo: '/images/faculty/Navneet.jpg', description: 'Assistant Professor specializing in machine learning pipelines, predictive analytics, and AI-driven decision systems.' },
        ].map((faculty, i) => (
          <ScrollReveal key={faculty.id} delay={i * 0.1}>
            <FacultyCard {...faculty} />
          </ScrollReveal>
        ))}
      </div>

      {/* Section 2: Patrons */}
      <ScrollReveal>
        <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: 'var(--text-primary)' }}>Our Patron</h3>
      </ScrollReveal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
        {[
          { id: 'f2', name: 'Dr. Pratyush Pranav', photo: '/images/faculty/Pratyush.jpg', description: 'Associate Professor specializing in robot kinematics, control theory, and mechatronics with numerous published research papers.' },
          { id: 'f3', name: 'Dr. Manoj Sharma', photo: '/images/faculty/Manoj.jpeg', description: 'Senior Lecturer in Electronics Engineering with expertise in wireless sensor networks, edge computing, and embedded hardware design.' },
        ].map((faculty, i) => (
          <ScrollReveal key={faculty.id} delay={i * 0.1}>
            <FacultyCard {...faculty} />
          </ScrollReveal>
        ))}
      </div>

      {/* Section 3: Dean */}
      <ScrollReveal>
        <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: 'var(--text-primary)' }}>Our Dean</h3>
      </ScrollReveal>
      <div className="flex justify-center mb-14">
        <div className="w-full max-w-sm">
          <ScrollReveal>
            <FacultyCard
              id="f1"
              name="Dr. Rajeev Tiwari"
              photo="/images/faculty/Rajeev.jpg"
              description="Professor of Computer Science with extensive research in deep learning, neural networks, and autonomous intelligent systems."
            />
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}
