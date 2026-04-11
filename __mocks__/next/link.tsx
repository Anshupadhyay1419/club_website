import React from 'react'

interface LinkProps {
  href: string
  children: React.ReactNode
  className?: string
  [key: string]: unknown
}

const MockLink = ({ href, children, ...props }: LinkProps) => {
  return <a href={href} {...props}>{children}</a>
}

export default MockLink
