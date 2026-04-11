import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines class names using clsx and merges Tailwind classes with tailwind-merge.
 * Falls back to simple string joining if clsx/tailwind-merge are not available.
 */
export function cn(...inputs: ClassValue[]): string {
  try {
    return twMerge(clsx(inputs))
  } catch {
    // Fallback: filter falsy values and join
    return inputs
      .flat()
      .filter((x): x is string => typeof x === 'string' && x.length > 0)
      .join(' ')
  }
}
