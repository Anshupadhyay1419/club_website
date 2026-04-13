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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <ScrollReveal key={image.id} delay={index * 0.05}>
            <div className="flex flex-col rounded-xl overflow-hidden"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <motion.button
                ref={(el) => { triggerRefs.current[index] = el }}
                onClick={() => openLightbox(index)}
                className="relative w-full overflow-hidden cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#00f0ff]"
                style={{ aspectRatio: '4/3' }}
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
              {/* Caption */}
              {image.caption && (
                <div className="px-4 py-3">
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {image.caption}
                  </p>
                </div>
              )}
            </div>
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
