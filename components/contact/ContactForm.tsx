'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import GlassCard from '@/components/ui/GlassCard'

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  message: z.string().min(1, 'Message is required'),
})

type ContactFormData = z.infer<typeof contactSchema>

export { contactSchema }

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = (data: ContactFormData) => {
    console.log('Contact:', data)
    setSubmitted(true)
    reset()
  }

  if (submitted) {
    return (
      <GlassCard className="text-center max-w-lg mx-auto">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--accent)' }}>Message Sent!</h3>
        <p style={{ color: 'var(--text-secondary)' }}>We'll get back to you as soon as possible.</p>
        <button onClick={() => setSubmitted(false)}
          className="mt-4 text-sm min-h-[44px] min-w-[44px]" style={{ color: 'var(--accent)' }}>
          Send another message
        </button>
      </GlassCard>
    )
  }

  return (
    <GlassCard className="max-w-lg mx-auto">
      <h3 className="text-xl font-bold mb-6 font-[var(--font-space-grotesk)]" style={{ color: 'var(--text-primary)' }}>Get in Touch</h3>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Full Name *</label>
          <input id="contact-name" type="text" {...register('name')}
            className="w-full px-4 min-h-[44px] rounded-lg focus:outline-none focus:ring-2 transition-colors"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
            placeholder="Your full name" />
          {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-sm font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Email Address *</label>
          <input id="contact-email" type="email" {...register('email')}
            className="w-full px-4 min-h-[44px] rounded-lg focus:outline-none focus:ring-2 transition-colors"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
            placeholder="you@example.com" />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="contact-message" className="block text-sm font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Message *</label>
          <textarea id="contact-message" rows={5} {...register('message')}
            className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-colors resize-none"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
            placeholder="Tell us what's on your mind..." />
          {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>}
        </div>

        <button type="submit"
          className="w-full min-h-[44px] text-white font-bold rounded-lg transition-all duration-200"
          style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent2))', boxShadow: '0 0 16px var(--glow)' }}>
          Send Message
        </button>
      </form>
    </GlassCard>
  )
}
