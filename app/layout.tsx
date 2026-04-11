import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import { LazyMotion, domAnimation } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ChatbotLoader from '@/components/chatbot/ChatbotLoader'
import PageTransition from '@/components/layout/PageTransition'
import ThemeProvider from '@/components/layout/ThemeProvider'
import MeshBackground from '@/components/layout/MeshBackground'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Robogenesis – Innovating the Future',
  description: 'Robogenesis is a university tech club focused on AI, Robotics, and Innovation.',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script type="module" src="https://unpkg.com/@splinetool/viewer@1.9.82/build/spline-viewer.js" async></script>
      </head>
      <body className="min-h-screen flex flex-col overflow-x-hidden" style={{ backgroundColor: 'var(--bg)', color: 'var(--text-primary)' }} suppressHydrationWarning>
        <ThemeProvider>
          <MeshBackground />
          <LazyMotion features={domAnimation}>
            <Navbar />
            <main className="flex-1 pt-20">
              <PageTransition>
                {children}
              </PageTransition>
            </main>
            <Footer />
            <ChatbotLoader />
          </LazyMotion>
        </ThemeProvider>
      </body>
    </html>
  )
}
