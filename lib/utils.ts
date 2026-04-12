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

const CLOUD_NAME = 'dfkbt26ga'
const BASE = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`

/**
 * Returns an optimized Cloudinary URL.
 * @param path  - e.g. 'team/john.jpg' or 'gallery/event1.jpg'
 * @param width - resize width in px (default 800)
 *
 * Usage:
 *   cloudImg('team/john.jpg', 400)
 *   cloudImg('projects/line-car.jpg', 800)
 *   cloudImg('gallery/event1.jpg', 600)
 */
export function cloudImg(path: string, width = 800): string {
  return `${BASE}/f_auto,q_auto,w_${width}/${path}`
}
