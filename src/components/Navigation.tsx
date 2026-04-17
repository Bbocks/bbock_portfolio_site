import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Terminal } from 'lucide-react'
import { motionEnter } from '../lib/motion'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Homelab', href: '#homelab' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={motionEnter}
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-[background,border-color] duration-motion-enter ${
        scrolled
          ? 'border-[var(--color-border-subtle)] bg-[var(--color-panel-header)]/90 backdrop-blur-md'
          : 'border-transparent bg-transparent'
      }`}
      aria-label="Primary"
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={motionEnter}
          className="flex cursor-pointer items-center gap-2 rounded-md font-mono text-sm text-[var(--color-text)] focus-visible:focus-ring"
          onClick={() => scrollToSection('#home')}
        >
          <Terminal className="h-6 w-6 shrink-0 text-[var(--color-terminal)]" aria-hidden />
          <span className="hidden font-semibold tracking-tight gradient-text sm:inline">brett@portfolio</span>
          <span className="stamp-pill hidden sm:inline">session</span>
        </motion.button>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <motion.button
              key={item.name}
              type="button"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={motionEnter}
              onClick={() => scrollToSection(item.href)}
              className="rounded px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-terminal)] focus-visible:focus-ring"
            >
              {item.name}
            </motion.button>
          ))}
        </div>

        <div className="md:hidden">
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            transition={motionEnter}
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-md p-2 text-[var(--color-text-muted)] hover:text-[var(--color-terminal)] focus-visible:focus-ring"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>
      </div>

      {isOpen && (
        <motion.div
          id="mobile-nav"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-[var(--color-border-subtle)] bg-[var(--color-panel-header)]/95 backdrop-blur-md md:hidden"
        >
          <div className="mx-auto max-w-7xl space-y-1 px-4 py-3">
            {navItems.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => scrollToSection(item.href)}
                className="block w-full rounded-md px-3 py-2.5 text-left font-mono text-sm text-[var(--color-text)] hover:bg-[var(--color-panel)] focus-visible:focus-ring"
              >
                <span className="text-[var(--color-terminal)]">$</span> cd {item.name.toLowerCase().replace(/\s+/g, '-')}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

export default Navigation
