import HeroSection from '@/components/home/HeroSection'
import AboutPreview from '@/components/home/AboutPreview'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import UpcomingEventsPreview from '@/components/home/UpcomingEventsPreview'
import { projects } from '@/data/projects'
import { events } from '@/data/events'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutPreview />
      <FeaturedProjects projects={projects} />
      <UpcomingEventsPreview events={events} />
    </>
  )
}
