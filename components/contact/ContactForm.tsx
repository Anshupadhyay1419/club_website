'use client'

import { useForm, ValidationError } from '@formspree/react'
import GlassCard from '@/components/ui/GlassCard'

export default function ContactForm() {
  const [state, handleSubmit] = useForm('xpqkopzoi')

  if (state.succeeded) {
    return (
      <GlassCard className="text-center max-w-lg mx-auto">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--accent)' }}>Message Sent!</h3>
        <p style={{ color: 'var(--text-secondary)' }}>We'll get back to you as soon as possible.</p>
      </GlassCard>
    )
  }

  return (
    <GlassCard className="max-w-lg mx-auto">
      <h3 className="text-xl font-bold mb-6 font-[var(--font-space-grotesk)]" style={{ color: 'var(--text-primary)' }}>Get in Touch</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Full Name *</label>
          <input id="name" type="text" name="name" required
            className="w-full px-4 min-h-[44px] rounded-lg focus:outline-none focus:ring-2 transition-colors"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
            placeholder="Your full name" />
          <ValidationError prefix="Name" field="name" errors={state.errors} className="mt-1 text-xs text-red-400" />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Email Address *</label>
          <input id="email" type="email" name="email" required
            className="w-full px-4 min-h-[44px] rounded-lg focus:outline-none focus:ring-2 transition-colors"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
            placeholder="you@example.com" />
          <ValidationError prefix="Email" field="email" errors={state.errors} className="mt-1 text-xs text-red-400" />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Message *</label>
          <textarea id="message" name="message" rows={5} required
            className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-colors resize-none"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
            placeholder="Tell us what's on your mind..." />
          <ValidationError prefix="Message" field="message" errors={state.errors} className="mt-1 text-xs text-red-400" />
        </div>

        <button type="submit" disabled={state.submitting}
          className="w-full min-h-[44px] text-white font-bold rounded-lg transition-all duration-200 disabled:opacity-60"
          style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent2))', boxShadow: '0 0 16px var(--glow)' }}>
          {state.submitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </GlassCard>
  )
}
