import type { GalleryImage } from '@/types'

const BASE = 'https://res.cloudinary.com/dfkbt26ga/image/upload/f_auto,q_auto,w_800'

export const galleryImages: GalleryImage[] = [
  {
    id: 'g1',
    src: `${BASE}/gallery1.jpg`,
    alt: 'RoboGenesis team with certificates',
    width: 1200,
    height: 900,
  },
  {
    id: 'g2',
    src: `${BASE}/gallery2.jpg`,
    alt: 'RoboGenesis team photo',
    width: 1200,
    height: 900,
  },
  {
    id: 'g3',
    src: `${BASE}/gallery3.jpg`,
    alt: 'RoboGenesis workshop',
    width: 1200,
    height: 900,
  },
]
