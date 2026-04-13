import type { Event } from '@/types'

export const events: Event[] = [
  // Upcoming events
  {
    id: 'e1',
    title: 'Deep Sight',
    description: 'A 18-hour hackathon focused on computer vision and AI. Teams will build intelligent vision systems — from object detection to real-time scene understanding. Open to all university students.',
    date: '2026-04-24T09:00:00.000Z',
    isPast: false,
    registrationLink: 'https://unstop.com/o/ufK6vyn',
  },
  // Past events
  {
    id: 'e5',
    title: 'WorkShop',
    description: 'Worshop regarding the line maze solver.',
    date: '2026-01-16T10:00:00.000Z',
    image: 'https://res.cloudinary.com/dfkbt26ga/image/upload/v1775993907/event1.jpg',
    highlights: '',
    isPast: true,
  },
]
