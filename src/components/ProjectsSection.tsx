import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Github,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Terminal,
  X,
  ZoomIn,
  Home,
  Cog,
  Globe,
  BookOpen,
  type LucideIcon,
} from 'lucide-react'
import InteractiveTerminal from './InteractiveTerminal'
import ScrollSection from './ScrollSection'
import TerminalPanel from './terminal/TerminalPanel'
import { motionEnter, staggerChildren } from '../lib/motion'

interface Project {
  id: string
  title: string
  description: string
  image: string
  githubUrl: string
  liveUrl?: string
  techStack: string[]
  category: 'homelab' | 'systems' | 'web' | 'coursework'
  terminalCommands?: string[]
  expanded?: boolean
}

const projects: Project[] = [
  {
    id: 'homelab',
    title: 'Proxmox Homelab Infrastructure',
    description:
      'Enterprise-grade virtualization setup with automated monitoring, backup systems, and container orchestration. Features Discord webhook notifications and Grafana dashboards.',
    image: '/Homelab-Dashboard.png',
    githubUrl: 'https://github.com/Bbocks/Docker-Compose-Files.git',
    techStack: ['Proxmox', 'Docker', 'Grafana', 'Prometheus', 'Discord Webhooks', 'Bash', 'Linux', 'ZFS'],
    category: 'homelab',
    terminalCommands: [
      'ssh root@proxmox.local',
      'pvesm status',
      'docker ps',
      'systemctl status grafana-server',
    ],
  },
  {
    id: 'portfolio-website',
    title: 'Personal Portfolio Website',
    description:
      'A modern, responsive portfolio website showcasing my projects, skills, and experience. Features interactive animations, gradient borders, image modals, and a terminal-style project demo. Built with React and TypeScript for optimal performance and developer experience.',
    image: '',
    githubUrl: 'https://github.com/Bbocks/bbock_portfolio_site',
    liveUrl: 'https://brettbockstein.com',
    techStack: [
      'React 18',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Framer Motion',
      'Lucide React',
      'PostHog Analytics',
      'Cloudflare Pages',
      'ESLint',
      'PostCSS',
    ],
    category: 'web',
    terminalCommands: ['npm install', 'npm run dev', 'npm run build', 'npm run preview'],
  },
  {
    id: 'snipe-it-automation',
    title: 'Snipe-IT License Import Script',
    description:
      'Python automation script for bulk assignment of software license seats in Snipe-IT using its REST API. Handles CSV/Excel imports with rate limiting and error handling.',
    image: '',
    githubUrl: 'https://github.com/Bbocks/Snipe-IT-License-Import-Script',
    techStack: ['Python', 'REST API', 'Pandas', 'CSV/Excel', 'Snipe-IT', 'Automation'],
    category: 'systems',
    terminalCommands: [
      'pip install pandas requests python-dotenv openpyxl',
      'python get_seat_id.py',
      'python license_import.py',
    ],
  },
  {
    id: 'construct-a-flow-ai',
    title: 'Construct-a-Flow AI Web',
    description:
      'The website for Construct-a-Flow AI, a modern web application for automating the construction bid process using AI-powered solutions. Built for estimators by estimators to streamline workflows and increase efficiency in the construction industry.',
    image: '/Construct-A-Flow.png',
    githubUrl: 'https://github.com/Bbocks/construct-a-flow-ai-web.git',
    liveUrl: 'https://construct-a-flow.com',
    techStack: [
      'React 18',
      'TypeScript',
      'Vite',
      'React Router DOM',
      'Tailwind CSS',
      'shadcn/ui',
      'Radix UI',
      'Lucide React',
      'React Hook Form',
      'Zod',
      'TanStack Query',
      'Cloudflare Workers',
      'Gmail API',
      'ESLint',
      'PostCSS',
    ],
    category: 'web',
    terminalCommands: ['npm install', 'npm run dev', 'npm run build'],
  },
]

const categoryIcon: Record<Project['category'], LucideIcon> = {
  homelab: Home,
  systems: Cog,
  web: Globe,
  coursework: BookOpen,
}

const ProjectsSection = ({ enableParallax = true }: { enableParallax?: boolean }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.08,
  })
  const [expandedProject, setExpandedProject] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null)

  const toggleProject = (projectId: string) => {
    setExpandedProject(expandedProject === projectId ? null : projectId)
  }

  const openImageModal = (imageSrc: string, title: string) => {
    setSelectedImage({ src: imageSrc, title })
  }

  const closeImageModal = () => {
    setSelectedImage(null)
  }

  const getCategoryStyles = (category: Project['category']) => {
    switch (category) {
      case 'homelab':
        return 'bg-sky-500/90 text-white'
      case 'systems':
        return 'bg-emerald-500/90 text-white'
      case 'web':
        return 'bg-violet-500/90 text-white'
      case 'coursework':
        return 'bg-amber-500/90 text-white'
      default:
        return 'bg-slate-500 text-white'
    }
  }

  return (
    <ScrollSection
      id="projects"
      className="bg-[var(--color-bg-elevated)] py-12 lg:py-20"
      movement={48}
      enableParallax={enableParallax}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={motionEnter}
          className="mb-14 text-center"
        >
          <h2 className="font-mono text-3xl font-bold tracking-tight text-[var(--color-text)] md:text-5xl">
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-[var(--color-text-muted)]">
            From homelab infrastructure to systems programming, explore my technical projects and see them in action with
            interactive demos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const PlaceholderIcon = categoryIcon[project.category]
            const hasImage = Boolean(project.image && project.image.startsWith('/'))
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ ...motionEnter, delay: index * staggerChildren }}
              >
                <TerminalPanel
                  title={project.title}
                  subtitle={`~/work/${project.id}`}
                  className="card-hover h-full"
                  contentClassName="p-0"
                >
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[var(--color-terminal)]/10 to-[var(--color-accent)]/10">
                    {hasImage ? (
                      <>
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full cursor-pointer object-cover transition-transform duration-motion-enter ease-out hover:scale-[1.02]"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                            target.nextElementSibling?.classList.remove('hidden')
                          }}
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            openImageModal(project.image, project.title)
                          }}
                        />
                        <div
                          className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/0 transition-colors duration-motion-enter hover:bg-black/30"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            openImageModal(project.image, project.title)
                          }}
                          role="presentation"
                        >
                          <ZoomIn className="h-8 w-8 text-white opacity-0 transition-opacity hover:opacity-100" />
                        </div>
                      </>
                    ) : null}
                    <div
                      className={`flex h-full w-full items-center justify-center ${hasImage ? 'hidden' : ''}`}
                      aria-hidden={hasImage}
                    >
                      <PlaceholderIcon className="h-20 w-20 text-[var(--color-text-muted)]/35" strokeWidth={1.25} />
                    </div>
                  </div>

                  <div className="border-t border-[var(--color-border-subtle)] p-6">
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <span
                        className={`stamp-pill border-0 px-2.5 py-1 text-[11px] font-medium normal-case tracking-normal text-white ${getCategoryStyles(project.category)}`}
                      >
                        {project.category}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleProject(project.id)}
                        className="rounded p-1 text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-terminal)] focus-visible:focus-ring"
                        aria-expanded={expandedProject === project.id}
                        aria-controls={`project-${project.id}-details`}
                        aria-label={expandedProject === project.id ? 'Collapse project details' : 'Expand project details'}
                      >
                        {expandedProject === project.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </button>
                    </div>

                    <h3 className="mb-2 font-mono text-lg font-semibold text-[var(--color-text)]">{project.title}</h3>
                    <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-[var(--color-text-muted)]">{project.description}</p>

                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span key={tech} className="skill-bubble text-xs">
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="skill-bubble text-xs">+{project.techStack.length - 3}</span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <motion.a
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        transition={motionEnter}
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-1 items-center justify-center gap-2 rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-panel-header)] px-3 py-2 font-mono text-sm text-[var(--color-text)] hover:border-[var(--color-border)] focus-visible:focus-ring"
                      >
                        <Github className="h-4 w-4 shrink-0" aria-hidden />
                        <span>Code</span>
                      </motion.a>
                      {project.liveUrl && (
                        <motion.a
                          whileHover={{ y: -1 }}
                          whileTap={{ scale: 0.98 }}
                          transition={motionEnter}
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--color-terminal)] px-3 py-2 font-mono text-sm font-medium text-[var(--color-bg-deep)] hover:brightness-110 focus-visible:focus-ring"
                        >
                          <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
                          <span>Demo</span>
                        </motion.a>
                      )}
                    </div>

                    <AnimatePresence>
                      {expandedProject === project.id && (
                        <motion.div
                          id={`project-${project.id}-details`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.28, ease: [0.4, 0, 1, 1] }}
                          className="mt-4 border-t border-[var(--color-border-subtle)] pt-4"
                        >
                          {project.terminalCommands && (
                            <div className="mb-4">
                              <div className="mb-2 flex items-center gap-2">
                                <Terminal className="h-4 w-4 text-[var(--color-terminal)]" aria-hidden />
                                <span className="text-sm font-medium text-[var(--color-text-muted)]">Interactive Terminal</span>
                              </div>
                              <InteractiveTerminal commands={project.terminalCommands} />
                            </div>
                          )}
                          <div>
                            <h4 className="mb-2 text-sm font-medium text-[var(--color-text-muted)]">Full Tech Stack</h4>
                            <div className="flex flex-wrap gap-1">
                              {project.techStack.map((tech) => (
                                <span key={tech} className="skill-bubble text-xs">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </TerminalPanel>
              </motion.div>
            )
          })}
        </div>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
              onClick={closeImageModal}
              role="presentation"
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ type: 'spring', damping: 26, stiffness: 320 }}
                className="relative h-[80vh] w-[80vw] max-w-6xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={closeImageModal}
                  className="absolute -top-12 right-0 rounded p-1 text-white hover:text-[var(--color-terminal)] focus-visible:focus-ring"
                  aria-label="Close image"
                >
                  <X className="h-8 w-8" />
                </button>
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="h-full w-full rounded-lg object-contain shadow-2xl"
                />
                <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-black/70 p-3 text-white">
                  <h3 className="text-lg font-semibold">{selectedImage.title}</h3>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ScrollSection>
  )
}

export default ProjectsSection
