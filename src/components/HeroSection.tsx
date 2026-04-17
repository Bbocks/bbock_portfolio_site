import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { TegakiRenderer } from 'tegaki/react'
import caveat from 'tegaki/fonts/caveat'
import { Download, Linkedin, Github } from 'lucide-react'
import ScrollSection from './ScrollSection'
import TerminalPanel from './terminal/TerminalPanel'
import { motionEnter, staggerChildren } from '../lib/motion'

// Serve subset + full Caveat from /public so FontFace loads a normal static URL.
// Vite's dependency URL for the bundled .ttf can be rejected by Firefox's font sanitizer in dev.
const assetBase = import.meta.env.BASE_URL.replace(/\/$/, '')
const tegakiCaveatFont = {
  ...caveat,
  fontUrl: `${assetBase}/fonts/tegaki/caveat-3dc76002.ttf`,
  fullFontUrl: `${assetBase}/fonts/tegaki/caveat.ttf`,
  fontFaceCSS: `@font-face { font-family: '${caveat.family}'; src: url(${assetBase}/fonts/tegaki/caveat-3dc76002.ttf); } @font-face { font-family: '${caveat.fullFamily}'; src: url(${assetBase}/fonts/tegaki/caveat.ttf); }`,
} as const

const ROLE_PHRASES = ['Computer Science Major', 'Systems Programmer', 'DevOps Enthusiast'] as const

interface HeroSectionProps {
  /** When true, used inside the portfolio shell (no full-page scroll section, compact chrome). */
  shell?: boolean
}

const HeroSection = ({ shell = false }: HeroSectionProps) => {
  const prefersReducedMotion = useReducedMotion()

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.06,
    rootMargin: shell ? '0px' : undefined,
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

  const inner = (
    <div
      className={
        shell
          ? 'relative z-[1] flex h-full min-h-0 flex-col px-2 pb-1 pt-3 sm:px-3 sm:pb-1 sm:pt-4 lg:px-0 lg:pt-3 lg:pb-1'
          : 'relative z-[1] mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'
      }
    >
      <motion.div
        ref={ref}
        className={shell ? 'flex min-h-0 flex-1 flex-col' : undefined}
        initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -28 }}
        animate={shell || inView ? { opacity: 1, x: 0 } : {}}
        transition={motionEnter}
      >
        <TerminalPanel
          title="~/session"
          subtitle="login"
          className={shell ? 'flex min-h-0 flex-1 flex-col' : ''}
          contentClassName={
            shell ? 'flex min-h-0 flex-1 flex-col overflow-y-auto p-4 sm:p-5' : 'p-6 sm:p-10'
          }
        >
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-muted)] sm:text-xs">
            <span className="text-[var(--color-accent)]">ok</span> — ready
          </p>
          <h1
            className={`font-mono font-bold tracking-tight text-[var(--color-text)] ${
              shell ? 'text-2xl sm:text-3xl' : 'text-4xl md:text-5xl lg:text-6xl'
            }`}
          >
            <span className="gradient-text">Brett Bockstein</span>
          </h1>

          <div
            className={`mx-auto flex justify-center ${shell ? 'mt-4' : 'mt-5 md:mt-7'}`}
          >
            <div
              className={`shrink-0 rounded-full border-4 border-[var(--color-border)] bg-[var(--color-panel-header)] p-2 shadow-[0_12px_40px_rgba(0,0,0,0.45)] ring-4 ring-[var(--color-terminal)]/35 ${
                shell
                  ? 'h-48 w-48 sm:h-52 sm:w-52'
                  : 'h-52 w-52 sm:h-56 sm:w-56 md:h-60 md:w-60 lg:h-[17rem] lg:w-[17rem]'
              }`}
            >
              <img
                src={`${assetBase}/Headshot-3.jpg`}
                alt="Brett Bockstein"
                width={400}
                height={400}
                decoding="async"
                className="h-full w-full rounded-full object-cover object-top"
              />
            </div>
          </div>

          <div
            className={`mt-5 flex w-full items-center justify-center text-center sm:mt-6 ${
              shell ? 'min-h-[3rem]' : 'min-h-[3.25rem] md:min-h-[3.5rem]'
            }`}
            aria-live="polite"
          >
            {prefersReducedMotion ? (
              <p
                className={`font-mono text-[var(--color-text-muted)] ${
                  shell ? 'text-base sm:text-lg' : 'text-lg md:text-xl'
                }`}
              >
                {ROLE_PHRASES.join(' · ')}
              </p>
            ) : (
              <TegakiRenderer
                key={roleIndex}
                font={tegakiCaveatFont}
                className="w-full max-w-full text-[var(--color-terminal)]"
                style={{
                  fontSize: shell ? 'clamp(1.1rem, 2.5vw, 1.45rem)' : 'clamp(1.35rem, 3.5vw, 1.85rem)',
                  minHeight: shell ? '2.75rem' : '3.25rem',
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
            animate={shell || inView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...motionEnter, delay: staggerChildren * 2 }}
            className={`mx-auto max-w-2xl text-center leading-relaxed text-[var(--color-text-muted)] ${
              shell ? 'mt-6 text-sm sm:mt-7 sm:text-base' : 'mt-4 text-base sm:mt-6 md:text-lg'
            }`}
          >
            Building robust systems and infrastructure solutions. From homelab automation to full stack development, I
            bridge the gap between development and operations with a focus on reliability and performance.
          </motion.p>

          {shell && (
            <p className="mt-3 text-center font-mono text-[10px] text-[var(--color-text-muted)] sm:text-xs">
              Type <span className="text-[var(--color-terminal)]">help</span> in the shell below to navigate.
            </p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={shell || inView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...motionEnter, delay: staggerChildren * 4 }}
            className={`flex flex-col items-center justify-center gap-3 sm:gap-4 ${
              shell ? 'mt-7 sm:mt-8' : 'mt-6 sm:mt-8'
            }`}
          >
            <div className="flex gap-2 sm:gap-3">
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={motionEnter}
                href="https://linkedin.com/in/brettbocks"
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-panel-header)] text-[var(--color-terminal)] hover:border-[var(--color-border)] focus-visible:focus-ring ${
                  shell ? 'p-2' : 'p-3'
                }`}
                aria-label="LinkedIn profile"
              >
                <Linkedin className={shell ? 'h-5 w-5' : 'h-6 w-6'} />
              </motion.a>
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={motionEnter}
                href="https://github.com/bbocks"
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-panel-header)] text-[var(--color-terminal)] hover:border-[var(--color-border)] focus-visible:focus-ring ${
                  shell ? 'p-2' : 'p-3'
                }`}
                aria-label="GitHub profile"
              >
                <Github className={shell ? 'h-5 w-5' : 'h-6 w-6'} />
              </motion.a>
            </div>
            <motion.a
              href="/Brett_Resume_8-20-25.pdf"
              download="Brett_Bockstein_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={motionEnter}
              className={`inline-flex items-center gap-2 rounded-md bg-[var(--color-terminal)] font-mono font-medium text-[var(--color-bg-deep)] shadow-lg hover:brightness-110 focus-visible:focus-ring ${
                shell ? 'px-4 py-2 text-xs sm:text-sm' : 'px-6 py-3 text-sm'
              }`}
            >
              <Download className={`shrink-0 ${shell ? 'h-4 w-4' : 'h-5 w-5'}`} aria-hidden />
              <span>Download Resume</span>
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={shell || inView ? { opacity: 1 } : {}}
            transition={{ ...motionEnter, delay: staggerChildren * 6 }}
            className={`grid grid-cols-2 gap-3 border-t border-[var(--color-border-subtle)] sm:gap-4 md:grid-cols-4 md:gap-6 ${
              shell ? 'mt-8 pt-6' : 'mt-10 pt-8'
            }`}
          >
            {[
              { label: 'Years Experience', value: '3+' },
              { label: 'Services Deployed', value: '15+' },
              { label: 'Projects Completed', value: '3+' },
              { label: 'Uptime', value: '99.9%' },
            ].map((stat, i) => (
              <div key={stat.label} className="text-center">
                <div
                  className={`font-mono font-bold ${
                    shell ? 'text-lg sm:text-xl md:text-2xl' : 'text-2xl md:text-3xl'
                  } ${i % 2 === 0 ? 'text-[var(--color-terminal)]' : 'text-[var(--color-accent)]'}`}
                >
                  {stat.value}
                </div>
                <div className="mt-0.5 font-mono text-[10px] text-[var(--color-text-muted)] sm:text-xs">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </TerminalPanel>
      </motion.div>
    </div>
  )

  if (shell) {
    return (
      <div className="flex h-full min-h-0 flex-col overflow-y-auto" id="home">
        {inner}
      </div>
    )
  }

  return (
    <ScrollSection id="home" className="relative flex min-h-screen items-center justify-center pt-20 md:pt-16" movement={56}>
      {inner}
    </ScrollSection>
  )
}

export default HeroSection
