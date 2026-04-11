'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import type { GalleryImage } from '@/types'
import ScrollReveal from '@/components/ui/ScrollReveal'

const Lightbox = dynamic(() => import('./Lightbox'), { ssr: false })

interface GalleryGridProps {
  images: GalleryImage[]
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([])

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
  }, [])

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i === null ? 0 : (i + 1) % images.length))
  }, [images.length])

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? 0 : (i - 1 + images.length) % images.length))
  }, [images.length])

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <ScrollReveal key={image.id} delay={index * 0.05}>
            <motion.button
              ref={(el) => { triggerRefs.current[index] = el }}
              onClick={() => openLightbox(index)}
              className="relative w-full overflow-hidden rounded-xl cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#00f0ff]"
              style={{ aspectRatio: `${image.width}/${image.height}`, maxHeight: '300px' }}
              aria-label={`View ${image.alt}`}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-all duration-300 group-hover:brightness-110 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k="
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#00f0ff]/0 group-hover:bg-[#00f0ff]/10 transition-all duration-300" />
            </motion.button>
          </ScrollReveal>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNext={goNext}
          onPrev={goPrev}
          triggerRef={{ current: triggerRefs.current[lightboxIndex] }}
        />
      )}
    </>
  )
}
