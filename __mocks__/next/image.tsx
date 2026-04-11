import React from 'react'

interface ImageProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  sizes?: string
  priority?: boolean
  onError?: () => void
  [key: string]: unknown
}

const MockImage = ({ src, alt, fill: _fill, sizes: _sizes, priority: _priority, onError: _onError, ...props }: ImageProps) => {
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  return <img src={src} alt={alt} {...props} />
}

export default MockImage
