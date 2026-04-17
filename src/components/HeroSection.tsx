import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { TegakiRenderer } from 'tegaki/react'
import caveat from 'tegaki/fonts/caveat'
import { Download, Linkedin, Github, ChevronDown } from 'lucide-react'

// Serve subset + full Caveat from /public so FontFace loads a normal static URL.
// Vite's dependency URL for the bundled .ttf can be rejected by Firefox's font sanitizer in dev.
const assetBase = import.meta.env.BASE_URL.replace(/\/$/, '')
const tegakiCaveatFont = {
  ...caveat,
  fontUrl: `${assetBase}/fonts/tegaki/caveat-3dc76002.ttf`,
  fullFontUrl: `${assetBase}/fonts/tegaki/caveat.ttf`,
  fontFaceCSS: `@font-face { font-family: '${caveat.family}'; src: url(${assetBase}/fonts/tegaki/caveat-3dc76002.ttf); } @font-face { font-family: '${caveat.fullFamily}'; src: url(${assetBase}/fonts/tegaki/caveat.ttf); }`,
} as const
import ScrollSection from './ScrollSection'
import TerminalPanel from './terminal/TerminalPanel'
import { motionEnter, staggerChildren } from '../lib/motion'

const ROLE_PHRASES = ['Computer Science Major', 'Systems Programmer', 'DevOps Enthusiast'] as const

const HeroSection = () => {
  const { scrollYProgress } = useScroll()
  const prefersReducedMotion = useReducedMotion()
  const contentY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -80])
  const indicatorY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, 56])

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.12,
  })

  const [roleIndex, setRoleIndex] = useState(0)
  const pauseRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (pauseRef.current) clearTimeout(pauseRef.current)
    }
  }, [])

  const handleTegakiComplete = useCallback(() => {
    if (prefersReducedMotion) return
    if (pauseRef.current) clearTimeout(pauseRef.current)
    pauseRef.current = setTimeout(() => {
      setRoleIndex((i) => (i + 1) % ROLE_PHRASES.length)
    }, 850)
  }, [prefersReducedMotion])

  const scrollToNext = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <ScrollSection id="home" className="relative flex min-h-screen items-center justify-center pt-20 md:pt-16" movement={56}>
      <div className="relative z-[1] mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          style={{ y: contentY }}
          ref={ref}
          initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -28 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={motionEnter}
        >
          <TerminalPanel title="~/session" subtitle="login" contentClassName="p-6 sm:p-10">
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
              <span className="text-[var(--color-accent)]">ok</span> — ready
            </p>
            <h1 className="font-mono text-4xl font-bold tracking-tight text-[var(--color-text)] md:text-5xl lg:text-6xl">
              <span className="gradient-text">Brett Bockstein</span>
            </h1>

            <div
              className="mt-6 flex w-full min-h-[3.25rem] items-center justify-center text-center md:min-h-[3.5rem]"
              aria-live="polite"
            >
              {prefersReducedMotion ? (
                <p className="font-mono text-lg text-[var(--color-text-muted)] md:text-xl">
                  {ROLE_PHRASES.join(' · ')}
                </p>
              ) : (
                <TegakiRenderer
                  key={roleIndex}
                  font={tegakiCaveatFont}
                  className="w-full max-w-full text-[var(--color-terminal)]"
                  style={{
                    fontSize: 'clamp(1.35rem, 3.5vw, 1.85rem)',
                    minHeight: '3.25rem',
                    color: 'var(--color-terminal)',
                  }}
                  time={{ mode: 'uncontrolled', duration: 2.4 }}
                  onComplete={handleTegakiComplete}
                >
                  {ROLE_PHRASES[roleIndex]}
                </TegakiRenderer>
              )}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...motionEnter, delay: staggerChildren * 2 }}
              className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg"
            >
              Building robust systems and infrastructure solutions. From homelab automation to full stack development, I
              bridge the gap between development and operations with a focus on reliability and performance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...motionEnter, delay: staggerChildren * 4 }}
              className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <motion.a
                href="/Brett_Resume_8-20-25.pdf"
                download="Brett_Bockstein_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={motionEnter}
                className="inline-flex items-center gap-2 rounded-md bg-[var(--color-terminal)] px-6 py-3 font-mono text-sm font-medium text-[var(--color-bg-deep)] shadow-lg hover:brightness-110 focus-visible:focus-ring"
              >
                <Download className="h-5 w-5 shrink-0" aria-hidden />
                <span>Download Resume</span>
              </motion.a>
              <div className="flex gap-3">
                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  transition={motionEnter}
                  href="https://linkedin.com/in/brettbocks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-panel-header)] p-3 text-[var(--color-terminal)] hover:border-[var(--color-border)] focus-visible:focus-ring"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin className="h-6 w-6" />
                </motion.a>
                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  transition={motionEnter}
                  href="https://github.com/bbocks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-panel-header)] p-3 text-[var(--color-terminal)] hover:border-[var(--color-border)] focus-visible:focus-ring"
                  aria-label="GitHub profile"
                >
                  <Github className="h-6 w-6" />
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ ...motionEnter, delay: staggerChildren * 6 }}
              className="mt-10 grid grid-cols-2 gap-4 border-t border-[var(--color-border-subtle)] pt-8 md:grid-cols-4 md:gap-6"
            >
              {[
                { label: 'Years Experience', value: '3+' },
                { label: 'Services Deployed', value: '15+' },
                { label: 'Projects Completed', value: '3+' },
                { label: 'Uptime', value: '99.9%' },
              ].map((stat, i) => (
                <div key={stat.label} className="text-center">
                  <div
                    className={`font-mono text-2xl font-bold md:text-3xl ${i % 2 === 0 ? 'text-[var(--color-terminal)]' : 'text-[var(--color-accent)]'}`}
                  >
                    {stat.value}
                  </div>
                  <div className="mt-1 font-mono text-xs text-[var(--color-text-muted)]">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </TerminalPanel>
        </motion.div>
      </div>

      <motion.button
        type="button"
        style={{ y: indicatorY }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ ...motionEnter, delay: 0.35 }}
        onClick={scrollToNext}
        className="absolute bottom-6 left-1/2 z-[2] -translate-x-1/2 rounded-full p-2 text-[var(--color-terminal)] animate-bounce hover:brightness-125 focus-visible:focus-ring md:bottom-10"
        aria-label="Scroll to projects"
      >
        <ChevronDown className="h-7 w-7 md:h-8 md:w-8" />
      </motion.button>
    </ScrollSection>
  )
}

export default HeroSection
