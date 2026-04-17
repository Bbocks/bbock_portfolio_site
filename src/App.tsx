import PortfolioShell from './components/shell/PortfolioShell'
import { motion, useReducedMotion } from 'framer-motion'

function App() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="relative h-[100dvh] overflow-hidden bg-[var(--color-bg-deep)] text-[var(--color-text)]">
      <div
        className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-0.5 bg-gradient-to-r from-[var(--color-terminal)] via-[var(--color-accent)] to-[var(--color-terminal-dim)] opacity-90"
        aria-hidden
      />
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="page-grid absolute inset-0 opacity-90" aria-hidden />
        <div className="page-noise absolute inset-0 mix-blend-overlay" aria-hidden />
        <div className="surface-grit absolute inset-0" aria-hidden />
        {!prefersReducedMotion && (
          <>
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -left-32 top-24 h-72 w-72 rounded-full bg-[var(--color-terminal)]/10 blur-3xl"
              aria-hidden
            />
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
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
      <div className="relative z-10 h-full min-h-0">
        <PortfolioShell />
      </div>
    </div>
  )
}

export default App
