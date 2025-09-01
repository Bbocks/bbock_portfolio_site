import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, ExternalLink, ChevronDown, ChevronUp, Terminal, X, ZoomIn } from 'lucide-react'
import InteractiveTerminal from './InteractiveTerminal'

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
    description: 'Enterprise-grade virtualization setup with automated monitoring, backup systems, and container orchestration. Features Discord webhook notifications and Grafana dashboards.',
    image: '/Homelab-Dashboard.png',
    githubUrl: 'https://github.com/Bbocks/Docker-Compose-Files.git',
    techStack: ['Proxmox', 'Docker', 'Grafana', 'Prometheus', 'Discord Webhooks', 'Ansible'],
    category: 'homelab',
    terminalCommands: [
      'ssh root@proxmox.local',
      'pvesm status',
      'docker ps',
      'systemctl status grafana-server'
    ]
  },
  {
    id: 'portfolio-website',
    title: 'Personal Portfolio Website',
    description: 'A modern, responsive portfolio website showcasing my projects, skills, and experience. Features interactive animations, gradient borders, image modals, and a terminal-style project demo. Built with React and TypeScript for optimal performance and developer experience.',
    image: '', // No image - will show emoji
    githubUrl: 'https://github.com/Bbocks/bbock_portfolio_site',
    liveUrl: 'https://brettbockstein.com', // Update this to your actual domain
    techStack: [
      'React 18', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 
      'Lucide React', 'PostHog Analytics', 'Cloudflare Pages', 'ESLint', 'PostCSS'
    ],
    category: 'web',
    terminalCommands: [
      'npm install',
      'npm run dev',
      'npm run build',
      'npm run preview'
    ]
  },
  {
    id: 'snipe-it-automation',
    title: 'Snipe-IT License Import Script',
    description: 'Python automation script for bulk assignment of software license seats in Snipe-IT using its REST API. Handles CSV/Excel imports with rate limiting and error handling.',
    image: '',
    githubUrl: 'https://github.com/Bbocks/Snipe-IT-License-Import-Script',
    techStack: ['Python', 'REST API', 'Pandas', 'CSV/Excel', 'Snipe-IT', 'Automation'],
    category: 'systems',
    terminalCommands: [
      'pip install pandas requests python-dotenv openpyxl',
      'python get_seat_id.py',
      'python license_import.py'
    ]
  },
  {
    id: 'construct-a-flow-ai',
    title: 'Construct-a-Flow AI Web',
    description: 'The website for Construct-a-Flow AI, a modern web application for automating the construction bid process using AI-powered solutions. Built for estimators by estimators to streamline workflows and increase efficiency in the construction industry.',
    image: '/Construct-A-Flow.png',
    githubUrl: 'https://github.com/Bbocks/construct-a-flow-ai-web.git',
    liveUrl: 'https://construct-a-flow.com',
    techStack: [
      'React 18', 'TypeScript', 'Vite', 'React Router DOM', 'Tailwind CSS', 
      'shadcn/ui', 'Radix UI', 'Lucide React', 'React Hook Form', 'Zod', 
      'TanStack Query', 'Cloudflare Workers', 'Gmail API', 'ESLint', 'PostCSS'
    ],
    category: 'web',
    terminalCommands: [
      'npm install',
      'npm run dev',
      'npm run build'
    ]
  }
]

const ProjectsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'homelab':
        return 'bg-blue-500'
      case 'systems':
        return 'bg-green-500'
      case 'web':
        return 'bg-purple-500'
      case 'coursework':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <section id="projects" className="py-20 bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-mono mb-4">
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From homelab infrastructure to systems programming, explore my technical projects 
            and see them in action with interactive demos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="gradient-border"
            >
              <div className="bg-dark-700 rounded-lg overflow-hidden card-hover h-full relative z-10">
                {/* Project Image */}
                <div className="h-48 bg-gradient-to-br from-primary-900/20 to-accent-900/20 flex items-center justify-center overflow-hidden relative group">
                  {project.image && project.image.startsWith('/') ? (
                    // Show actual image if it exists and has a valid path
                    <>
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          // Fallback to emoji if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log('Image clicked:', project.title); // Debug log
                          openImageModal(project.image, project.title);
                        }}
                      />
                      {/* Zoom overlay */}
                      <div 
                        className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log('Overlay clicked:', project.title); // Debug log
                          openImageModal(project.image, project.title);
                        }}
                      >
                        <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </>
                  ) : null}
                  <div className={`text-6xl opacity-20 ${project.image && project.image.startsWith('/') ? 'hidden' : ''}`}>
                    {project.category === 'homelab' && '🏠'}
                    {project.category === 'systems' && '⚙️'}
                    {project.category === 'web' && '🌐'}
                    {project.category === 'coursework' && '📚'}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6 relative z-20">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(project.category)}`}>
                      {project.category}
                    </span>
                    <button
                      onClick={() => toggleProject(project.id)}
                      className="text-gray-400 hover:text-primary-400 transition-colors"
                    >
                      {expandedProject === project.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </button>
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span key={tech} className="skill-bubble text-xs">
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="skill-bubble text-xs">+{project.techStack.length - 3}</span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 relative z-30">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center space-x-2 bg-dark-600 hover:bg-dark-500 text-white px-3 py-2 rounded text-sm transition-colors"
                    >
                      <Github className="h-4 w-4" />
                      <span>Code</span>
                    </motion.a>
                    
                    {project.liveUrl && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-3 py-2 rounded text-sm transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>Demo</span>
                      </motion.a>
                    )}
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {expandedProject === project.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-dark-600"
                      >
                        {/* Terminal Demo */}
                        {project.terminalCommands && (
                          <div className="mb-4">
                            <div className="flex items-center space-x-2 mb-2">
                              <Terminal className="h-4 w-4 text-primary-400" />
                              <span className="text-sm font-medium text-gray-300">Interactive Terminal</span>
                            </div>
                            <InteractiveTerminal commands={project.terminalCommands} />
                          </div>
                        )}

                        {/* Full Tech Stack */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-300 mb-2">Full Tech Stack:</h4>
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
              </div>
            </motion.div>
          ))}
        </div>

        {/* Image Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
              onClick={closeImageModal}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-[80vw] h-[80vh] max-w-none max-h-none"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={closeImageModal}
                  className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
                >
                  <X className="h-8 w-8" />
                </button>
                
                {/* Image */}
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain rounded-lg shadow-2xl"
                />
                
                {/* Title */}
                <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-70 text-white p-3 rounded-lg">
                  <h3 className="text-lg font-semibold">{selectedImage.title}</h3>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default ProjectsSection
