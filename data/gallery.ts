import type { GalleryImage } from '@/types'
import { cloudImg } from '@/lib/utils'

export const galleryImages: GalleryImage[] = [
  {
    id: 'g1',
    src: cloudImg('gallery1.jpg', 600),
    alt: 'Robogenesis team at the annual Robotics Expo 2025',
    width: 1200,
    height: 800,
  },
]
