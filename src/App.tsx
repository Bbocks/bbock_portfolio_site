import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import ProjectsSection from './components/ProjectsSection'
import ExperienceSection from './components/ExperienceSection'
import SkillsSection from './components/SkillsSection'
import HomelabSection from './components/HomelabSection'
import BlogSection from './components/BlogSection'
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
  const orbOneY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -160])
  const orbTwoY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, 120])

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[var(--color-bg-deep)] text-[var(--color-text)]">
      <motion.div
        style={{ scaleX: progressScaleX }}
        className="fixed left-0 right-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-[var(--color-terminal)] via-[var(--color-accent)] to-[var(--color-terminal-dim)]"
        aria-hidden
      />
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="page-grid absolute inset-0 opacity-90" aria-hidden />
        <div className="page-noise absolute inset-0 mix-blend-overlay" aria-hidden />
        <div className="surface-grit absolute inset-0" aria-hidden />
        {!prefersReducedMotion && (
          <>
            <motion.div
              style={{ y: orbOneY }}
              className="absolute -left-32 top-24 h-72 w-72 rounded-full bg-[var(--color-terminal)]/10 blur-3xl"
              aria-hidden
            />
            <motion.div
              style={{ y: orbTwoY }}
              className="absolute -right-24 top-1/3 h-[22rem] w-[22rem] rounded-full bg-[var(--color-accent)]/8 blur-3xl"
              aria-hidden
            />
          </>
        )}
        <div
          className="absolute left-1/2 top-[18vh] h-px w-[min(90vw,720px)] -translate-x-1/2 bg-gradient-to-r from-transparent via-[var(--color-terminal)]/25 to-transparent"
          aria-hidden
        />
      </div>
      <Navigation />
      <main className="relative z-10">
        <HeroSection />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <HomelabSection />
        <BlogSection />
        <ContactSection />
      </main>
    </div>
  )
}

export default App
