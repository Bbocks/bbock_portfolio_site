import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { usePostHog } from 'posthog-js/react'
import HeroSection from '../HeroSection'
import HeroWelcome from './HeroWelcome'
import CommandTerminal from './CommandTerminal'
import ProjectsSection from '../ProjectsSection'
import ExperienceSection from '../ExperienceSection'
import SkillsSection from '../SkillsSection'
import HomelabSection from '../HomelabSection'
import BlogSection from '../BlogSection'
import ContactSection from '../ContactSection'
import { useIsLg } from '../../lib/useBreakpoint'
import { hashForView, parseViewFromHash, type PortfolioView } from '../../lib/portfolioViews'
import { helpText, parseNavigationCommand, TERMINAL_BOOT_LINES, type TerminalLine } from '../../lib/terminalCommands'
import { motionEnter } from '../../lib/motion'

const PortfolioShell = () => {
  const [activeView, setActiveView] = useState<PortfolioView>(() =>
    typeof window !== 'undefined' ? parseViewFromHash() : 'home',
  )
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>(TERMINAL_BOOT_LINES)
  const mainRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const isLg = useIsLg()
  const posthog = usePostHog()

  useEffect(() => {
    const onHash = () => setActiveView(parseViewFromHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    const next = hashForView(activeView)
    const cur = window.location.hash
    if (next === cur) return
    if (next === '') {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
      return
    }
    window.location.hash = next.slice(1)
  }, [activeView])

  useEffect(() => {
    const el = mainRef.current
    if (el) el.scrollTop = 0
  }, [activeView])

  useEffect(() => {
    posthog?.capture('portfolio_section_changed', { section: activeView })
  }, [activeView, posthog])

  const onSubmitLine = useCallback((raw: string) => {
    const trimmed = raw.trim()
    if (!trimmed) return

    setTerminalLines((prev) => [...prev, { kind: 'cmd', text: trimmed }])

    const parsed = parseNavigationCommand(trimmed)
    if ('help' in parsed && parsed.help) {
      setTerminalLines((prev) => [...prev, { kind: 'out', text: helpText() }])
      return
    }
    if ('error' in parsed) {
      setTerminalLines((prev) => [...prev, { kind: 'err', text: parsed.error }])
      return
    }
    if ('view' in parsed) {
      setTerminalLines((prev) => [...prev, { kind: 'out', text: `→ ${parsed.view}` }])
      setActiveView(parsed.view)
    }
  }, [])

  const enter = prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: 16 }
  const animate = { opacity: 1, x: 0 }
  const exit = prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -12 }

  const panelMotion = {
    initial: enter,
    animate,
    exit,
    transition: prefersReducedMotion ? { duration: 0 } : motionEnter,
  }

  const renderMainInner = () => {
    if (activeView === 'home') {
      if (isLg) {
        return (
          <motion.div key="home-welcome" {...panelMotion} className="min-h-full">
            <HeroWelcome />
          </motion.div>
        )
      }
      return (
        <motion.div key="home-hero" {...panelMotion} className="min-h-full">
          <HeroSection shell />
        </motion.div>
      )
    }

    const sectionProps = { enableParallax: false }

    switch (activeView) {
      case 'projects':
        return (
          <motion.div key="projects" {...panelMotion} className="min-h-full">
            <ProjectsSection {...sectionProps} />
          </motion.div>
        )
      case 'experience':
        return (
          <motion.div key="experience" {...panelMotion} className="min-h-full">
            <ExperienceSection {...sectionProps} />
          </motion.div>
        )
      case 'skills':
        return (
          <motion.div key="skills" {...panelMotion} className="min-h-full">
            <SkillsSection {...sectionProps} />
          </motion.div>
        )
      case 'homelab':
        return (
          <motion.div key="homelab" {...panelMotion} className="min-h-full">
            <HomelabSection {...sectionProps} />
          </motion.div>
        )
      case 'blog':
        return (
          <motion.div key="blog" {...panelMotion} className="min-h-full">
            <BlogSection {...sectionProps} />
          </motion.div>
        )
      case 'contact':
        return (
          <motion.div key="contact" {...panelMotion} className="min-h-full">
            <ContactSection {...sectionProps} />
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex h-[100dvh] min-h-0 flex-col overflow-hidden bg-[var(--color-bg-deep)] text-[var(--color-text)] lg:flex-row">
      {isLg && (
        <aside className="flex min-h-0 w-[25%] shrink-0 flex-col gap-1 border-r border-[var(--color-border-subtle)] bg-[var(--color-bg-deep)] px-2 pb-2 pt-2">
          <div className="h-[60vh] min-h-0 w-full min-w-0 shrink-0 overflow-hidden">
            <HeroSection shell />
          </div>
          <div className="flex min-h-0 w-full min-w-0 flex-1 basis-0 flex-col">
            <CommandTerminal
              lines={terminalLines}
              onSubmitLine={onSubmitLine}
              className="h-full min-h-0"
              contentClassName="min-h-0 flex-1"
            />
          </div>
        </aside>
      )}

      <div className="flex min-h-0 min-w-0 flex-1 flex-col lg:w-[75%]">
        <main
          ref={mainRef}
          id="main-content"
          tabIndex={-1}
          className="min-h-0 flex-1 overflow-y-auto outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-terminal)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-deep)]"
          aria-live="polite"
        >
          <AnimatePresence mode="wait">{renderMainInner()}</AnimatePresence>
        </main>

        {!isLg && (
          <div className="h-[min(40vh,280px)] min-h-[200px] shrink-0 border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-deep)] p-2">
            <CommandTerminal lines={terminalLines} onSubmitLine={onSubmitLine} className="h-full" />
          </div>
        )}
      </div>
    </div>
  )
}

export default PortfolioShell
