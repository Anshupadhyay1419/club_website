'use client'

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
          className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 min-h-[44px] min-w-[44px]"
          style={active === option
            ? { background: 'var(--accent)', color: '#fff', border: '1px solid var(--accent)' }
            : { background: 'var(--bg-muted)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }
          }
        >
          {option}
        </button>
      ))}
    </div>
  )
}
