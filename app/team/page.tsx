import TeamCard from '@/components/team/TeamCard'
import SectionHeading from '@/components/ui/SectionHeading'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { teamMembers } from '@/data/team'

export default function TeamPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <ScrollReveal>
        <SectionHeading
          title="Our Team"
          subtitle="The people building the future of Robogenesis"
        />
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member, i) => (
          <ScrollReveal key={member.id} delay={i * 0.08}>
            <TeamCard member={member} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}
