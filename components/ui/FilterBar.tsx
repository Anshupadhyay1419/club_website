'use client'

import { cn } from '@/lib/utils'

interface FilterBarProps {
  options: string[]
  active: string
  onChange: (value: string) => void
}

export default function FilterBar({ options, active, onChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter options">
      {options.map((option) => (
        <button
          key={option}
          role="tab"
          aria-selected={active === option}
          onClick={() => onChange(option)}
          className={cn(
            'px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 min-h-[44px] min-w-[44px]',
            active === option
              ? 'bg-indigo-500 text-white shadow-sm'
              : 'border border-slate-200 text-slate-500 hover:border-indigo-300 hover:text-indigo-600 bg-white'
          )}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
