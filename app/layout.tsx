import type { Metadata } from 'next'
import { Space_Grotesk, Inter, Outfit, Orbitron, Righteous } from 'next/font/google'
import { LazyMotion, domAnimation } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ChatbotLoader from '@/components/chatbot/ChatbotLoader'
import PageTransition from '@/components/layout/PageTransition'
import ThemeProvider from '@/components/layout/ThemeProvider'
import MeshBackground from '@/components/layout/MeshBackground'
import './globals.css'

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: ['200', '300', '400'],
  display: 'swap',
})

const orbitron = Orbitron({
  variable: '--font-orbitron',
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  display: 'swap',
})

const righteous = Righteous({
  variable: '--font-righteous',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
})

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
  title: 'Robogenesis – Innovating the Future | Bennett University Tech Club',
  description: 'RoboGenesis is a student-led tech club at Bennett University, Greater Noida focused on AI, Robotics, IoT, and Innovation. Join us to build real-world projects.',
  keywords: ['RoboGenesis', 'Bennett University', 'robotics club', 'AI club', 'tech club', 'Greater Noida', 'robotics', 'artificial intelligence', 'IoT', 'student club'],
  verification: {
    google: 'saRyJVhUIahOC18ojk4Vt9McxCqDE-3p_4qtAYOwhKw',
  },
  metadataBase: new URL('https://www.robogenesissoai.in'),
  openGraph: {
    title: 'Robogenesis – Innovating the Future',
    description: 'A student-led tech club at Bennett University focused on AI, Robotics, and Innovation.',
    url: 'https://www.robogenesissoai.in',
    siteName: 'RoboGenesis',
    images: [
      {
        url: '/club_logo.jpeg',
        width: 800,
        height: 800,
        alt: 'RoboGenesis Club Logo',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Robogenesis – Innovating the Future',
    description: 'A student-led tech club at Bennett University focused on AI, Robotics, and Innovation.',
    images: ['/club_logo.jpeg'],
  },
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
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${outfit.variable} ${orbitron.variable} ${righteous.variable}`} suppressHydrationWarning>
      <head>
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
