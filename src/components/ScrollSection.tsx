import type { ReactNode } from 'react'
import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

interface ScrollSectionProps {
  id: string
  className: string
  children: ReactNode
  movement?: number
  /** When false, skip window scroll-linked parallax (use inside scrollable panes). */
  enableParallax?: boolean
}

const ScrollSection = ({
  id,
  className,
  children,
  movement = 60,
  enableParallax = true,
}: ScrollSectionProps) => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [movement, -movement])
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    prefersReducedMotion ? [1, 1, 1, 1] : [0.55, 1, 1, 0.55],
  )

  if (!enableParallax) {
    return (
      <section id={id} ref={sectionRef} className={`relative ${className}`}>
        {children}
      </section>
    )
  }

  return (
    <section id={id} ref={sectionRef} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y, opacity }}>
        {children}
      </motion.div>
    </section>
  )
}

export default ScrollSection
