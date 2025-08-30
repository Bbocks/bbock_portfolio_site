'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, MapPin, Building, ChevronDown, ChevronUp } from 'lucide-react'

interface Experience {
  id: string
  title: string
  company: string
  location: string
  period: string
  description: string
  achievements: string[]
  skills: string[]
  icon: string
  expanded?: boolean
}

const experiences: Experience[] = [
  {
    id: 'ta-role',
    title: 'Teaching Assistant - Computer Science',
    company: 'University Name',
    location: 'City, State',
    period: 'Jan 2024 - Present',
    description: 'Supporting students in understanding complex computer science concepts, particularly in systems programming and data structures.',
    achievements: [
      'Reduced debugging time for students by 50% through improved pointer visualization techniques',
      'Developed interactive debugging workshops that improved student comprehension by 40%',
      'Mentored 30+ students in C programming and memory management concepts',
      'Created comprehensive study guides and practice problems for systems programming course'
    ],
    skills: ['C Programming', 'Debugging', 'Teaching', 'Memory Management', 'GDB', 'Valgrind'],
    icon: '🎓'
  },
  {
    id: 'internship-1',
    title: 'Systems Engineering Intern',
    company: 'Tech Company',
    location: 'Remote',
    period: 'May 2023 - Aug 2023',
    description: 'Worked on infrastructure automation and system optimization projects, gaining hands-on experience with enterprise-level systems.',
    achievements: [
      'Automated laptop provisioning process, reducing setup time from 4 hours to 30 minutes',
      'Implemented monitoring solutions that improved system uptime by 15%',
      'Developed documentation for deployment procedures used by 20+ team members',
      'Participated in on-call rotation, handling critical system issues'
    ],
    skills: ['Ansible', 'Docker', 'Linux', 'Monitoring', 'Automation', 'Bash Scripting'],
    icon: '⚙️'
  },
  {
    id: 'homelab-admin',
    title: 'Homelab Administrator',
    company: 'Personal Project',
    location: 'Home Lab',
    period: '2022 - Present',
    description: 'Self-managed infrastructure project demonstrating enterprise-level system administration and automation skills.',
    achievements: [
      'Built and maintained 99.9% uptime homelab infrastructure with Proxmox virtualization',
      'Implemented automated backup systems with Discord webhook notifications',
      'Deployed monitoring stack with Grafana, Prometheus, and custom dashboards',
      'Containerized applications using Docker and orchestrated with Docker Compose',
      'Set up reverse proxy with Traefik and automatic SSL certificate management'
    ],
    skills: ['Proxmox', 'Docker', 'Grafana', 'Prometheus', 'Traefik', 'Discord Webhooks'],
    icon: '🏠'
  }
]

const ExperienceSection = () => {
  const [expandedExperience, setExpandedExperience] = useState<string | null>(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const toggleExperience = (experienceId: string) => {
    setExpandedExperience(expandedExperience === experienceId ? null : experienceId)
  }

  return (
    <section id="experience" className="py-20 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-mono mb-4">
            <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            My journey through systems engineering, from hands-on internships to teaching 
            the next generation of developers.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-dark-600"></div>

          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="timeline-item"
              >
                <div className="flex items-start space-x-6">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-16 h-16 bg-dark-700 rounded-full flex items-center justify-center text-2xl border-2 border-dark-600">
                    {experience.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-dark-700 rounded-lg p-6 card-hover">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{experience.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
                          <div className="flex items-center space-x-1">
                            <Building className="h-4 w-4" />
                            <span>{experience.company}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{experience.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{experience.period}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleExperience(experience.id)}
                        className="text-gray-400 hover:text-primary-400 transition-colors"
                      >
                        {expandedExperience === experience.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </button>
                    </div>

                    <p className="text-gray-300 mb-4">{experience.description}</p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {experience.skills.map((skill) => (
                        <span key={skill} className="skill-bubble text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Expanded Content */}
                    <AnimatePresence>
                      {expandedExperience === experience.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="pt-4 border-t border-dark-600"
                        >
                          <h4 className="text-sm font-medium text-gray-300 mb-3">Key Achievements:</h4>
                          <ul className="space-y-2">
                            {experience.achievements.map((achievement, idx) => (
                              <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.1 }}
                                className="flex items-start space-x-2 text-sm text-gray-400"
                              >
                                <span className="text-primary-400 mt-1">•</span>
                                <span>{achievement}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
