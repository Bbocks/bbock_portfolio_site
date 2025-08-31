import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, ExternalLink, ChevronDown, ChevronUp, Terminal } from 'lucide-react'
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
    image: '/images/homelab.jpg',
    githubUrl: 'https://github.com/your-username/homelab',
    techStack: ['Proxmox', 'Docker', 'Grafana', 'Prometheus', 'Discord Webhooks', 'Ansible'],
    category: 'homelab',
    terminalCommands: [
      'ssh root@proxmox.local',
      'pvesm status',
      'docker ps',
      'systemctl status grafana-server'
    ]
  },
  /*{
    id: 'docker-automation',
    title: 'Docker Compose Automation Suite',
    description: 'Automated deployment system for microservices with health checks, load balancing, and zero-downtime updates.',
    image: '/images/docker.jpg',
    githubUrl: 'https://github.com/your-username/docker-automation',
    liveUrl: 'https://demo.yourdomain.com',
    techStack: ['Docker', 'Docker Compose', 'Nginx', 'Traefik', 'Let\'s Encrypt'],
    category: 'homelab',
    terminalCommands: [
      'docker-compose up -d',
      'docker-compose logs -f',
      'docker system prune -a'
    ]
  },*/
  {
    id: 'snipe-it-automation',
    title: 'Snipe-IT License Import Script',
    description: 'Python automation script for bulk assignment of software license seats in Snipe-IT using its REST API. Handles CSV/Excel imports with rate limiting and error handling.',
    image: '/images/automation.jpg',
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
    image: 'Construct-a-Flow.png',
    githubUrl: 'https://construct-a-flow.com',
    techStack: ['React', 'TypeScript', 'Web Development', 'Workflow Automation'],
    category: 'web',
    terminalCommands: [
      'npm install',
      'npm run dev',
      'npm run build'
    ]
  },
  /*{
    id: 'systems-programming',
    title: 'Systems Programming Projects',
    description: 'Collection of C programs demonstrating memory management, process control, and system-level programming concepts.',
    image: '/images/c-programming.jpg',
    githubUrl: 'https://github.com/your-username/systems-programming',
    techStack: ['C', 'Linux', 'GDB', 'Make', 'Valgrind'],
    category: 'systems',
    terminalCommands: [
      'gcc -g -o program program.c',
      'gdb ./program',
      'valgrind --leak-check=full ./program'
    ]
  },*/
  /*{
    id: 'web-app',
    title: 'Full-Stack Web Application',
    description: 'Modern web application built with React and Node.js, featuring real-time updates and responsive design.',
    image: '/images/web-app.jpg',
    githubUrl: 'https://github.com/your-username/web-app',
    liveUrl: 'https://app.yourdomain.com',
    techStack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'TypeScript'],
    category: 'web',
    terminalCommands: [
      'npm install',
      'npm run dev',
      'npm run build'
    ]
  },*/
  /*{
    id: 'coursework',
    title: 'Data Structures & Algorithms',
    description: 'Implementation of fundamental data structures and algorithms in Java, including performance analysis and optimization.',
    image: '/images/algorithms.jpg',
    githubUrl: 'https://github.com/your-username/algorithms',
    techStack: ['Java', 'JUnit', 'Maven', 'Algorithm Analysis'],
    category: 'coursework',
    terminalCommands: [
      'javac *.java',
      'java -cp . Main',
      'mvn test'
    ]
  }*/
]

const ProjectsSection = () => {
  const [expandedProject, setExpandedProject] = useState<string | null>(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const toggleProject = (projectId: string) => {
    setExpandedProject(expandedProject === projectId ? null : projectId)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'homelab': return 'bg-primary-500'
      case 'systems': return 'bg-accent-500'
      case 'web': return 'bg-purple-500'
      case 'coursework': return 'bg-orange-500'
      default: return 'bg-gray-500'
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
              className="bg-dark-700 rounded-lg overflow-hidden card-hover"
            >
              {/* Project Image */}
              <div className="h-48 bg-gradient-to-br from-primary-900/20 to-accent-900/20 flex items-center justify-center">
                <div className="text-6xl opacity-20">
                  {project.category === 'homelab' && '🏠'}
                  {project.category === 'systems' && '⚙️'}
                  {project.category === 'web' && '🌐'}
                  {project.category === 'coursework' && '📚'}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
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
                <div className="flex space-x-2">
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
