import { Link2, GitBranch, Globe, Share2, Mail } from 'lucide-react'
import ContactForm from '@/components/contact/ContactForm'
import SectionHeading from '@/components/ui/SectionHeading'
import ScrollReveal from '@/components/ui/ScrollReveal'

const socialLinks = [
  { href: 'https://linkedin.com/company/robogenesis', icon: Link2, label: 'LinkedIn' },
  { href: 'https://github.com/robogenesis', icon: GitBranch, label: 'GitHub' },
  { href: 'https://www.instagram.com/robogenesis_bu?igsh=MWVvdmszYXV1ZzdycQ==', icon: Globe, label: 'Instagram' },
  { href: 'https://twitter.com/robogenesis', icon: Share2, label: 'Twitter' },
]

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <ScrollReveal>
        <SectionHeading
          title="Contact Us"
          subtitle="Have a question or want to collaborate? We'd love to hear from you."
        />
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <ScrollReveal>
          <ContactForm />
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-3 font-[var(--font-space-grotesk)]">Email Us</h3>
              <a href="mailto:robogenesis@bennett.edu.in"
                className="flex items-center gap-3 text-slate-500 hover:text-indigo-600 transition-colors duration-200">
                <Mail size={20} className="text-indigo-500" />
                <span className="text-lg select-all">robogenesis@bennett.edu.in</span>
              </a>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-4 font-[var(--font-space-grotesk)]">Follow Us</h3>
              <div className="flex gap-4">
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="p-3 min-h-[44px] min-w-[44px] flex items-center justify-center glass rounded-xl text-slate-400 hover:text-indigo-600 hover:shadow-md transition-all duration-200">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
