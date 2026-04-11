import GalleryGrid from '@/components/gallery/GalleryGrid'
import SectionHeading from '@/components/ui/SectionHeading'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { galleryImages } from '@/data/gallery'

export default function GalleryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <ScrollReveal>
        <SectionHeading
          title="Gallery"
          subtitle="Moments from our events, workshops, and projects"
        />
      </ScrollReveal>
      <GalleryGrid images={galleryImages} />
    </div>
  )
}
