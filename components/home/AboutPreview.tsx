import Link from 'next/link'
import ScrollReveal from '@/components/ui/ScrollReveal'

const pillars = [
  { title: 'Robotics', desc: 'Autonomous systems, ROS2, mechanical design and control.', num: '01' },
  { title: 'Artificial Intelligence', desc: 'Deep learning, computer vision, and NLP.', num: '02' },
  { title: 'IoT & Embedded', desc: 'Edge computing, sensor fusion, real-time systems.', num: '03' },
  { title: 'Research & Innovation', desc: 'Hackathons, competitions, published research.', num: '04' },
]

export default function AboutPreview() {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto section-glow relative">
      <ScrollReveal>
        <div className="max-w-2xl mb-16">
          <div className="badge mb-6">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--accent)' }} />
            About Us
          </div>
          <h2 className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-black tracking-tight leading-[1.1] mb-6"
            style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--text-primary)' }}>
            Where engineering<br />
            <span className="gradient-text">meets ambition</span>
          </h2>
          <p className="text-sm leading-relaxed mb-6 max-w-lg" style={{ color: 'var(--text-secondary)' }}>
            RoboGenesis is a student-led tech club at the forefront of robotics and AI.
            We build real-world systems, host workshops and events.
          </p>
          <Link href="/about"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 btn-gradient">
            <span>Discover Our Story</span>
            <span>→</span>
          </Link>
        </div>
      </ScrollReveal>

      {/* Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {pillars.map((p, i) => (
          <ScrollReveal key={p.title} delay={i * 0.08}>
            <div className="glass gradient-border rounded-2xl p-7 h-full group cursor-default relative overflow-hidden">
              <div className="absolute top-4 right-4 text-4xl font-black opacity-5 select-none"
                style={{ color: 'var(--accent)', fontFamily: 'var(--font-space-grotesk)' }}>{p.num}</div>
              <h3 className="text-base font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{p.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{p.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
