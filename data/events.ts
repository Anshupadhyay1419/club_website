import type { Event } from '@/types'

export const events: Event[] = [
  // Upcoming events
  {
    id: 'e1',
    title: 'Deep Sight',
    description: 'A 18-hour hackathon focused on computer vision and AI. Teams will build intelligent vision systems — from object detection to real-time scene understanding. Open to all university students.',
    date: '2026-04-24T09:00:00.000Z',
    isPast: false,
  },
  // Past events
  {
    id: 'e5',
    title: 'Robotics Expo 2025',
    description: 'Annual showcase of student robotics projects with live demonstrations and industry judges.',
    date: '2025-11-10T10:00:00.000Z',
    image: '/images/events/robotics-expo-2025.jpg',
    highlights: 'Over 200 attendees, 15 project demos, and 3 industry partnerships formed. Best Project award went to the Hexapod Walker team.',
    isPast: true,
  },
  {
    id: 'e6',
    title: 'ML Study Group Kickoff',
    description: 'Launch of the semester-long machine learning study group with weekly sessions.',
    date: '2025-09-05T15:00:00.000Z',
    image: '/images/events/ml-study-group.jpg',
    highlights: '40 students enrolled, covering topics from linear regression to transformers over 12 weeks.',
    isPast: true,
  },
  {
    id: 'e7',
    title: 'Embedded Systems Workshop',
    description: 'Hands-on workshop on programming microcontrollers and building embedded systems.',
    date: '2025-10-18T13:00:00.000Z',
    image: '/images/events/embedded-workshop.jpg',
    highlights: 'Participants built a working temperature-controlled fan system using STM32 and FreeRTOS.',
    isPast: true,
  },
  {
    id: 'e8',
    title: 'Industry Talk: AI in Robotics',
    description: 'Guest lecture by a senior engineer from a leading robotics company on real-world AI applications.',
    date: '2025-08-22T16:00:00.000Z',
    image: '/images/events/industry-talk.jpg',
    highlights: 'Insightful session on deploying ML models on edge devices, followed by a Q&A and networking session.',
    isPast: true,
  },
]
