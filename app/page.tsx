import HeroSection from '@/components/home/HeroSection'
import TeamCarousel from '@/components/home/TeamCarousel'
import AboutPreview from '@/components/home/AboutPreview'
import UpcomingEventsPreview from '@/components/home/UpcomingEventsPreview'
import { events } from '@/data/events'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TeamCarousel />
      <AboutPreview />
      <UpcomingEventsPreview events={events} />
    </>
  )
}
