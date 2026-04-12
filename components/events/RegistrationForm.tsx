'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import GlassCard from '@/components/ui/GlassCard'

const registrationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  phone: z.string().min(1, 'Phone is required'),
  department: z.string().min(1, 'Department is required'),
})

type RegistrationFormData = z.infer<typeof registrationSchema>

export { registrationSchema }

interface RegistrationFormProps {
  eventId?: string
  eventTitle?: string
}

export default function RegistrationForm({ eventId, eventTitle }: RegistrationFormProps) {
  const [submitted, setSubmitted] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  })

  const onSubmit = (data: RegistrationFormData) => {
    const registrationData = {
      ...data,
      eventId,
      eventTitle,
      registeredAt: new Date().toISOString(),
    }
    console.log('Registration:', registrationData)
    setSubmitted(true)
    reset()
  }

  const inputClass = "w-full px-4 min-h-[44px] rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-colors"
  const inputStyle = { background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)' }
  const labelClass = "block text-sm font-semibold mb-1"

  if (submitted) {
    return (
      <GlassCard className="text-center max-w-lg mx-auto">
        <div className="text-4xl mb-4">🎉</div>
        <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--accent)' }}>Registration Successful!</h3>
        <p style={{ color: 'var(--text-secondary)' }}>We'll send you a confirmation email shortly.</p>
        <button onClick={() => setSubmitted(false)}
          className="mt-4 text-sm font-medium min-h-[44px] min-w-[44px]" style={{ color: 'var(--accent)' }}>
          Register for another event
        </button>
      </GlassCard>
    )
  }

  return (
    <GlassCard className="max-w-lg mx-auto">
      <h3 className="text-xl font-bold mb-6 font-[var(--font-space-grotesk)]" style={{ color: 'var(--text-primary)' }}>
        {eventTitle ? `Register for ${eventTitle}` : 'Register for an Event'}
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div>
          <label htmlFor="reg-name" className={labelClass} style={{ color: 'var(--text-secondary)' }}>Full Name *</label>
          <input id="reg-name" type="text" {...register('name')} className={inputClass} style={inputStyle} placeholder="Your full name" />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="reg-email" className={labelClass} style={{ color: 'var(--text-secondary)' }}>Email Address *</label>
          <input id="reg-email" type="email" {...register('email')} className={inputClass} style={inputStyle} placeholder="you@bennett.edu.in" />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="reg-phone" className={labelClass} style={{ color: 'var(--text-secondary)' }}>Phone Number *</label>
          <input id="reg-phone" type="tel" {...register('phone')} className={inputClass} style={inputStyle} placeholder="+91 98765 43210" />
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
        </div>

        <div>
          <label htmlFor="reg-dept" className={labelClass} style={{ color: 'var(--text-secondary)' }}>Department *</label>
          <input id="reg-dept" type="text" {...register('department')} className={inputClass} style={inputStyle} placeholder="e.g. Computer Science" />
          {errors.department && <p className="mt-1 text-xs text-red-500">{errors.department.message}</p>}
        </div>

        <button type="submit"
          className="w-full min-h-[44px] bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-lg transition-all duration-200 shadow-sm">
          Register Now
        </button>
      </form>
    </GlassCard>
  )
}
