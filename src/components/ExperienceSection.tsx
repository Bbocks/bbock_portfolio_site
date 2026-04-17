import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Calendar,
  MapPin,
  Building,
  ChevronDown,
  ChevronUp,
  Scale,
  Building2,
  GraduationCap,
  Lightbulb,
  Home,
  Trees,
  type LucideIcon,
} from 'lucide-react'
import ScrollSection from './ScrollSection'
import TerminalPanel from './terminal/TerminalPanel'
import { motionEnter, staggerChildren } from '../lib/motion'

type ExperienceIconKey = 'scale' | 'hospital' | 'graduation' | 'lightbulb' | 'home' | 'trees'

const experienceIcons: Record<ExperienceIconKey, LucideIcon> = {
  scale: Scale,
  hospital: Building2,
  graduation: GraduationCap,
  lightbulb: Lightbulb,
  home: Home,
  trees: Trees,
}

interface Experience {
  id: string
  title: string
  company: string
  location: string
  period: string
  description: string
  achievements: string[]
  skills: string[]
  iconKey: ExperienceIconKey
  expanded?: boolean
}

const experiences: Experience[] = [
  {
    id: 'ods-delaware',
    title: 'Casual/Seasonal IT Support Technician',
    company: 'Office of Defence Services, State of Delaware',
    location: 'Wilmington, DE',
    period: 'September 2025 - Present',
    description:
      'Gained hands-on experience in IT infrastructure management and process optimization for healthcare services.',
    achievements: [
      'Assisted in the deployment and configuration of new workstations, ensuring compliance with organizational standards',
      'Provided technical support for software and hardware issues, improving resolution times by 20%',
    ],
    skills: ['IT Infrastructure', 'System Administration', 'Documentation'],
    iconKey: 'scale',
  },
  {
    id: 'rcm-internship',
    title: 'IT Intern',
    company: 'RCM Healthcare Services',
    location: 'Long Island, NY',
    period: 'May 2024 - August 2025 (Summers)',
    description:
      'Gained hands-on experience in IT infrastructure management and process optimization for healthcare services.',
    achievements: [
      'Reduced laptop provisioning and setup time by 50%, enhancing operational efficiency and productivity',
      'Contributed to the development of a company-wide email management naming scheme, improving organization and consistency',
      'Supported the research and implementation of new IT asset management tools, streamlining asset tracking and resource allocation',
    ],
    skills: ['IT Infrastructure', 'Asset Management', 'Process Optimization', 'System Administration', 'Documentation'],
    iconKey: 'hospital',
  },
  {
    id: 'ud-ta-role',
    title: 'Teaching Assistant – CISC210: Introduction to Systems Programming',
    company: 'University of Delaware',
    location: 'Newark, DE',
    period: 'February 2024 - May 2024',
    description:
      'Provided comprehensive support for students learning systems programming concepts and low-level programming techniques.',
    achievements: [
      'Provided support for student projects involving embedded systems and interactive objects',
      'Held weekly office hours to offer one-on-one guidance on debugging, low-level programming, and efficient resource usage',
      'Graded assignments and labs with attention to correctness, style, and performance',
      'Reinforced key concepts such as pointer arithmetic, memory allocation, and interfacing with hardware',
      'Guided students in understanding and applying system-level constraints in code design',
    ],
    skills: ['C/C++', 'Systems Programming', 'Teaching', 'Debugging', 'Memory Management', 'Hardware Interface'],
    iconKey: 'graduation',
  },
  {
    id: 'radulescu-internship',
    title: 'Product Analysis Intern',
    company: 'Radulescu LLP — Patent Litigators',
    location: 'Long Island, NY',
    period: 'January 2023/24',
    description: 'Conducted technical analysis and organization of LED products for patent litigation support.',
    achievements: [
      'Disassembled and organized hundreds of LED bulbs for patent analysis',
      'Developed a nomenclature system to organize the bulbs inside Microsoft Excel, increasing bulb look-up time by 50 percent',
      'Analyzed the type of LED on the PCB and the markings on the PCB of each bulb to classify which factory the bulb originated from',
    ],
    skills: ['Technical Analysis', 'Data Organization', 'Microsoft Excel', 'PCB Analysis', 'Patent Research'],
    iconKey: 'lightbulb',
  },
  {
    id: 'homelab-project',
    title: 'Homelab Infrastructure Project',
    company: 'Personal Project',
    location: 'Home Lab',
    period: 'September 2021 – Present',
    description:
      'Self-managed enterprise-grade infrastructure project demonstrating advanced system administration and automation skills.',
    achievements: [
      'Deployed multiple instances of Proxmox Virtual Environment on many different ranges of hardware to host several different operating systems',
      'Utilized multiple Ubuntu 22.04 and 23.04 instances to run different services using a combination of virtual machines and lxc containers',
      'Implemented many different Docker containers using Docker Compose as well as Docker Run for media streaming, media organization, network administration, remote management, remote access, internal DNS filtering, and several others',
      'Implemented different methods of data storage and access across the network for local and remote access',
      'Implemented real-time detection of up-time statistics for all running programs and services with notifications via a discord webhook if anything fails to decrease downtime by 20 percent',
    ],
    skills: [
      'Proxmox',
      'Docker',
      'Ubuntu',
      'LXC Containers',
      'Network Administration',
      'Discord Webhooks',
      'System Monitoring',
    ],
    iconKey: 'home',
  },
  {
    id: 'camp-scatico',
    title: 'Assistant Division Leader / Assistant Head of Woodshop',
    company: 'Camp Scatico',
    location: 'New York',
    period: 'May 2021 – August 2023 (Summers)',
    description: 'Led educational programs and fostered positive learning environments for children in fitness and woodworking.',
    achievements: [
      'Fostered an open and welcoming environment to allow children to strengthen and make new connections',
      'Created and organized personalized workout plans for 50+ campers, helping them to further their knowledge of fitness as well achieve their fitness goals',
      'Directed and developed a woodworking program to teach kids valuable project design and problem-solving skills',
    ],
    skills: ['Leadership', 'Teaching', 'Program Development', 'Fitness Training', 'Woodworking', 'Child Development'],
    iconKey: 'trees',
  },
]

const ExperienceSection = ({ enableParallax = true }: { enableParallax?: boolean }) => {
  const [expandedExperience, setExpandedExperience] = useState<string | null>(null)
  const prefersReducedMotion = useReducedMotion()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.06,
  })

  const toggleExperience = (experienceId: string) => {
    setExpandedExperience(expandedExperience === experienceId ? null : experienceId)
  }

  return (
    <ScrollSection
      id="experience"
      className="bg-[var(--color-bg-deep)] py-12 lg:py-20"
      movement={44}
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
            <span className="gradient-text">Experience</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-[var(--color-text-muted)]">
            My journey through systems engineering, from hands-on internships to teaching the next generation of developers.
          </p>
        </motion.div>

        <div className="relative pl-2 md:pl-4">
          <div
            className="absolute bottom-0 left-[1.125rem] top-2 w-px bg-[var(--color-border-subtle)] md:left-[1.35rem]"
            aria-hidden
          />

          <div className="space-y-10">
            {experiences.map((experience, index) => {
              const Icon = experienceIcons[experience.iconKey]
              return (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ ...motionEnter, delay: index * staggerChildren }}
                  className="relative"
                >
                  <div className="flex items-start gap-4 md:gap-6">
                    <div
                      className="relative z-[1] flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[var(--color-border)] bg-[var(--color-panel-header)] md:h-11 md:w-11"
                      aria-hidden
                    >
                      <Icon className="h-4 w-4 text-[var(--color-terminal)] md:h-5 md:w-5" strokeWidth={2} />
                    </div>

                    <TerminalPanel
                      title={experience.company}
                      subtitle={experience.period}
                      className="min-w-0 flex-1 card-hover"
                      contentClassName="p-5 md:p-6"
                    >
                      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <h3 className="font-mono text-lg font-semibold text-[var(--color-text)]">{experience.title}</h3>
                          <div className="mt-2 flex flex-col gap-2 text-sm text-[var(--color-text-muted)] sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-1">
                            <span className="flex items-center gap-1.5">
                              <Building className="h-4 w-4 shrink-0 text-[var(--color-terminal)]" aria-hidden />
                              {experience.company}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <MapPin className="h-4 w-4 shrink-0 text-[var(--color-terminal)]" aria-hidden />
                              {experience.location}
                            </span>
                            <span className="stamp-pill inline-flex w-fit items-center gap-1 normal-case">
                              <Calendar className="h-3 w-3" aria-hidden />
                              {experience.period}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleExperience(experience.id)}
                          className="shrink-0 rounded p-1 text-[var(--color-text-muted)] hover:text-[var(--color-terminal)] focus-visible:focus-ring"
                          aria-expanded={expandedExperience === experience.id}
                          aria-controls={`exp-${experience.id}-details`}
                          aria-label={
                            expandedExperience === experience.id ? 'Collapse achievements' : 'Expand achievements'
                          }
                        >
                          {expandedExperience === experience.id ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </button>
                      </div>

                      <p className="mb-4 text-[var(--color-text-muted)]">{experience.description}</p>

                      <div className="mb-2 flex flex-wrap gap-2">
                        {experience.skills.map((skill) => (
                          <span key={skill} className="skill-bubble text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>

                      <AnimatePresence>
                        {expandedExperience === experience.id && (
                          <motion.div
                            id={`exp-${experience.id}-details`}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.26, ease: [0.4, 0, 1, 1] }}
                            className="border-t border-[var(--color-border-subtle)] pt-4"
                          >
                            <h4 className="mb-3 text-sm font-medium text-[var(--color-text-muted)]">Key achievements</h4>
                            <ul className="space-y-2">
                              {experience.achievements.map((achievement, idx) => (
                                <motion.li
                                  key={idx}
                                  initial={{ opacity: 0, x: -12 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ ...motionEnter, delay: idx * staggerChildren }}
                                  className="flex gap-2 text-sm text-[var(--color-text-muted)]"
                                >
                                  <span className="mt-0.5 text-[var(--color-accent)]" aria-hidden>
                                    ›
                                  </span>
                                  <span>{achievement}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </TerminalPanel>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </ScrollSection>
  )
}

export default ExperienceSection
