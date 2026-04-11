export interface Project {
  id: string
  title: string
  description: string
  image: string
  techStack: string[]
  category: 'AI' | 'Robotics' | 'IoT'
  githubUrl?: string
  detailUrl?: string
}

export interface Event {
  id: string
  title: string
  description: string
  date: string // ISO 8601
  image?: string
  highlights?: string // for past events
  isPast: boolean
}

export interface TeamMember {
  id: string
  name: string
  role: string
  photo: string
  skills: string[]
  linkedinUrl?: string
  githubUrl?: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string // markdown or HTML
  category: string
  publishedAt: string // ISO 8601
  coverImage?: string
  author?: string;
}

export interface GalleryImage {
  id: string
  src: string
  alt: string
  width: number
  height: number
}

export interface ChatMessage {
  id: string
  role: 'user' | 'bot'
  text: string
  timestamp: number
}

export interface FacultyMember {
  id: string
  name: string
  designation: string
  photo: string
  description: string
}
