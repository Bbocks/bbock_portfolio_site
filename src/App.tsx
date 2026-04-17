import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import ProjectsSection from './components/ProjectsSection'
import ExperienceSection from './components/ExperienceSection'
import SkillsSection from './components/SkillsSection'
//import HomelabSection from './components/HomelabSection'
//import BlogSection from './components/BlogSection'
import ContactSection from './components/ContactSection'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'

function App() {
  const { scrollYProgress } = useScroll()
  const prefersReducedMotion = useReducedMotion()
  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  })
  const orbOneY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -220])
  const orbTwoY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, 180])

  return (
    <div className="relative min-h-screen overflow-x-clip bg-dark-900 text-white">
      <motion.div
        style={{ scaleX: progressScaleX }}
        className="fixed left-0 right-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-primary-500 via-accent-400 to-primary-400"
      />
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <motion.div
          style={{ y: orbOneY }}
          className="absolute -left-28 top-20 h-80 w-80 rounded-full bg-primary-500/15 blur-3xl"
        />
        <motion.div
          style={{ y: orbTwoY }}
          className="absolute right-[-8rem] top-1/3 h-[26rem] w-[26rem] rounded-full bg-accent-500/10 blur-3xl"
        />
      </div>
      <Navigation />
      <main className="relative z-10">
        <HeroSection />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        {/*<HomelabSection />*/}
        {/*<BlogSection />*/}
        <ContactSection />
      </main>
    </div>
  )
}

export default App
