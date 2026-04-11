'use client'

import { useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { GalleryImage } from '@/types'

interface LightboxProps {
  images: GalleryImage[]
  currentIndex: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
  triggerRef?: React.RefObject<HTMLElement | null>
}

export default function Lightbox({ images, currentIndex, onClose, onNext, onPrev, triggerRef }: LightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const image = images[currentIndex]
  const hasMultiple = images.length >= 2

  // Focus trap & keyboard navigation
  useEffect(() => {
    closeButtonRef.current?.focus()

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        triggerRef?.current?.focus()
      }
      if (e.key === 'ArrowRight' && hasMultiple) onNext()
      if (e.key === 'ArrowLeft' && hasMultiple) onPrev()
    }

    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose, onNext, onPrev, hasMultiple, triggerRef])

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose()
        triggerRef?.current?.focus()
      }
    },
    [onClose, triggerRef]
  )

  if (!image) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-label="Image lightbox"
      >
        {/* Close button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Close lightbox"
          className="absolute top-4 right-4 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-white/70 hover:text-white transition-colors z-10"
        >
          <X size={24} />
        </button>

        {/* Prev button */}
        {hasMultiple && (
          <button
            onClick={onPrev}
            aria-label="Previous image"
            className="absolute left-4 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-white/70 hover:text-white transition-colors z-10"
          >
            <ChevronLeft size={32} />
          </button>
        )}

        {/* Image */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="relative max-w-[90vw] max-h-[85vh] w-full h-full flex items-center justify-center"
        >
          <div className="relative" style={{ maxWidth: '90vw', maxHeight: '85vh' }}>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="object-contain max-h-[85vh] w-auto"
              priority
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k="
            />
          </div>
        </motion.div>

        {/* Next button */}
        {hasMultiple && (
          <button
            onClick={onNext}
            aria-label="Next image"
            className="absolute right-4 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-white/70 hover:text-white transition-colors z-10"
          >
            <ChevronRight size={32} />
          </button>
        )}

        {/* Counter */}
        {hasMultiple && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
