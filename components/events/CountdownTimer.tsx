'use client'

import { useState, useEffect } from 'react'

interface CountdownTimerProps {
  date: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(dateStr: string): TimeLeft | null {
  const target = new Date(dateStr).getTime()
  if (isNaN(target)) return null
  const diff = target - Date.now()
  if (diff <= 0) return null
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export default function CountdownTimer({ date }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTimeLeft(getTimeLeft(date))
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(date))
    }, 1000)
    return () => clearInterval(interval)
  }, [date])

  if (!mounted) return <div className="h-12" />

  if (!timeLeft) {
    return <div className="text-sm font-semibold mt-2" style={{ color: 'var(--text-muted)' }}>Event Ended</div>
  }

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hrs', value: timeLeft.hours },
    { label: 'Min', value: timeLeft.minutes },
    { label: 'Sec', value: timeLeft.seconds },
  ]

  return (
    <div className="flex gap-3 mt-2">
      {units.map(({ label, value }) => (
        <div key={label} className="text-center">
          <div className="text-xl font-bold font-[var(--font-space-grotesk)]" style={{ color: 'var(--accent)' }}>
            {String(value).padStart(2, '0')}
          </div>
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{label}</div>
        </div>
      ))}
    </div>
  )
}
