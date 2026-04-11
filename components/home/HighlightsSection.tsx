import ScrollReveal from '@/components/ui/ScrollReveal'

const stats = [
  { value: '30+', label: 'Projects', desc: 'Across AI, Robotics & IoT' },
  { value: '50+', label: 'Events', desc: 'Workshops, talks & hackathons' },
  { value: '120+', label: 'Members', desc: 'Active students & alumni' },
  { value: '15+', label: 'Awards', desc: 'National competition wins' },
]

export default function HighlightsSection() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden">
        {stats.map((s, i) => (
          <ScrollReveal key={s.label} delay={i * 0.07}>
            <div className="bg-[#080a0e] px-8 py-10 flex flex-col gap-1 group hover:bg-[#0d1018] transition-colors duration-200">
              <span
                className="text-[2.2rem] font-bold text-white tracking-tight leading-none mb-2"
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                {s.value}
              </span>
              <span className="text-[13px] font-semibold text-white/70">{s.label}</span>
              <span className="text-[12px] text-white/30 leading-snug">{s.desc}</span>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
