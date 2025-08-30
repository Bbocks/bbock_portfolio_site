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
    id: 'rcm-internship',
    title: 'IT Intern',
    company: 'RCM Healthcare Services',
    location: 'Long Island, NY',
    period: 'May 2024 - August 2025 (Summers)',
    description: 'Gained hands-on experience in IT infrastructure management and process optimization for healthcare services.',
    achievements: [
      'Reduced laptop provisioning and setup time by 50%, enhancing operational efficiency and productivity',
      'Contributed to the development of a company-wide email management naming scheme, improving organization and consistency',
      'Supported the research and implementation of new IT asset management tools, streamlining asset tracking and resource allocation'
    ],
    skills: ['IT Infrastructure', 'Asset Management', 'Process Optimization', 'System Administration', 'Documentation'],
    icon: '🏥'
  },
  {
    id: 'ud-ta-role',
    title: 'Teaching Assistant – CISC210: Introduction to Systems Programming',
    company: 'University of Delaware',
    location: 'Newark, DE',
    period: 'February 2024 - May 2024',
    description: 'Provided comprehensive support for students learning systems programming concepts and low-level programming techniques.',
    achievements: [
      'Provided support for student projects involving embedded systems and interactive objects',
      'Held weekly office hours to offer one-on-one guidance on debugging, low-level programming, and efficient resource usage',
      'Graded assignments and labs with attention to correctness, style, and performance',
      'Reinforced key concepts such as pointer arithmetic, memory allocation, and interfacing with hardware',
      'Guided students in understanding and applying system-level constraints in code design'
    ],
    skills: ['C/C++', 'Systems Programming', 'Teaching', 'Debugging', 'Memory Management', 'Hardware Interface'],
    icon: '🎓'
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
      'Analyzed the type of LED on the PCB and the markings on the PCB of each bulb to classify which factory the bulb originated from'
    ],
    skills: ['Technical Analysis', 'Data Organization', 'Microsoft Excel', 'PCB Analysis', 'Patent Research'],
    icon: '💡'
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
      'Directed and developed a woodworking program to teach kids valuable project design and problem-solving skills'
    ],
    skills: ['Leadership', 'Teaching', 'Program Development', 'Fitness Training', 'Woodworking', 'Child Development'],
    icon: '🏞️'
  },
  {
    id: 'homelab-project',
    title: 'Homelab Infrastructure Project',
    company: 'Personal Project',
    location: 'Home Lab',
    period: 'September 2021 – Present',
    description: 'Self-managed enterprise-grade infrastructure project demonstrating advanced system administration and automation skills.',
    achievements: [
      'Deployed multiple instances of Proxmox Virtual Environment on many different ranges of hardware to host several different operating systems',
      'Utilized multiple Ubuntu 22.04 and 23.04 instances to run different services using a combination of virtual machines and lxc containers',
      'Implemented many different Docker containers using Docker Compose as well as Docker Run for media streaming, media organization, network administration, remote management, remote access, internal DNS filtering, and several others',
      'Implemented different methods of data storage and access across the network for local and remote access',
      'Implemented real-time detection of up-time statistics for all running programs and services with notifications via a discord webhook if anything fails to decrease downtime by 20 percent'
    ],
    skills: ['Proxmox', 'Docker', 'Ubuntu', 'LXC Containers', 'Network Administration', 'Discord Webhooks', 'System Monitoring'],
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
