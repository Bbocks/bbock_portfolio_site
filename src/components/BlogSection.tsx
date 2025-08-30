import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  tags: string[]
  category: 'homelab' | 'systems' | 'tutorial' | 'debugging'
  featured?: boolean
}

const blogPosts: BlogPost[] = [
  {
    id: 'proxmox-setup',
    title: 'Building a Proxmox Homelab on Old Hardware',
    excerpt: 'How I transformed an old Dell OptiPlex into a powerful virtualization server using Proxmox VE, complete with automated backups and monitoring.',
    content: 'Full article content would go here...',
    date: '2024-01-15',
    readTime: '8 min read',
    tags: ['Proxmox', 'Homelab', 'Virtualization', 'Hardware'],
    category: 'homelab',
    featured: true
  },
  {
    id: 'docker-optimization',
    title: 'Optimizing Docker Compose for Production',
    excerpt: 'Best practices for structuring Docker Compose files, implementing health checks, and achieving zero-downtime deployments.',
    content: 'Full article content would go here...',
    date: '2024-01-10',
    readTime: '12 min read',
    tags: ['Docker', 'Docker Compose', 'DevOps', 'Deployment'],
    category: 'tutorial'
  },
  {
    id: 'c-memory-debugging',
    title: 'Debugging C Memory Leaks in Teaching Labs',
    excerpt: 'Common memory management pitfalls in C programming and how to use Valgrind and GDB to identify and fix memory leaks.',
    content: 'Full article content would go here...',
    date: '2024-01-05',
    readTime: '10 min read',
    tags: ['C Programming', 'Memory Management', 'Debugging', 'Valgrind'],
    category: 'debugging'
  },
  {
    id: 'grafana-monitoring',
    title: 'Setting Up Grafana Monitoring for Homelab',
    excerpt: 'Complete guide to monitoring your homelab infrastructure with Grafana, Prometheus, and custom dashboards.',
    content: 'Full article content would go here...',
    date: '2023-12-28',
    readTime: '15 min read',
    tags: ['Grafana', 'Prometheus', 'Monitoring', 'Homelab'],
    category: 'homelab'
  },
  {
    id: 'systems-programming',
    title: 'Systems Programming Fundamentals',
    excerpt: 'Understanding the basics of systems programming, from process management to inter-process communication.',
    content: 'Full article content would go here...',
    date: '2023-12-20',
    readTime: '20 min read',
    tags: ['Systems Programming', 'Linux', 'Process Management', 'IPC'],
    category: 'systems'
  },
  {
    id: 'ansible-automation',
    title: 'Infrastructure Automation with Ansible',
    excerpt: 'Automating server provisioning and configuration management using Ansible playbooks and roles.',
    content: 'Full article content would go here...',
    date: '2023-12-15',
    readTime: '14 min read',
    tags: ['Ansible', 'Automation', 'DevOps', 'Configuration Management'],
    category: 'tutorial'
  }
]

const BlogSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const categories = [
    { id: 'all', name: 'All Posts', count: blogPosts.length },
    { id: 'homelab', name: 'Homelab', count: blogPosts.filter(p => p.category === 'homelab').length },
    { id: 'systems', name: 'Systems', count: blogPosts.filter(p => p.category === 'systems').length },
    { id: 'tutorial', name: 'Tutorials', count: blogPosts.filter(p => p.category === 'tutorial').length },
    { id: 'debugging', name: 'Debugging', count: blogPosts.filter(p => p.category === 'debugging').length }
  ]

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'homelab': return 'bg-primary-500'
      case 'systems': return 'bg-accent-500'
      case 'tutorial': return 'bg-purple-500'
      case 'debugging': return 'bg-orange-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <section id="blog" className="py-20 bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-mono mb-4">
            <span className="gradient-text">Blog & Notes</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Technical articles, tutorials, and insights from my journey in systems engineering 
            and infrastructure management.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
              }`}
            >
              <span>{category.name}</span>
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                {category.count}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Featured Post */}
        {selectedCategory === 'all' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            {blogPosts.filter(post => post.featured).map((post) => (
              <div key={post.id} className="bg-dark-700 rounded-lg p-8 card-hover">
                <div className="flex items-center space-x-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </span>
                  <span className="text-primary-400 text-sm font-medium">Featured</span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">{post.title}</h3>
                <p className="text-gray-300 mb-6 text-lg leading-relaxed">{post.excerpt}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <span>Read More</span>
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.filter(post => !post.featured || selectedCategory !== 'all').map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
              className="bg-dark-700 rounded-lg overflow-hidden card-hover"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </span>
                  <div className="flex items-center space-x-1 text-xs text-gray-400">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">{post.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">{post.excerpt}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="flex items-center space-x-1 text-xs text-gray-500">
                      <Tag className="h-3 w-3" />
                      <span>{tag}</span>
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="text-xs text-gray-500">+{post.tags.length - 3} more</span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-xs text-gray-400">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-1 text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors"
                  >
                    <span>Read</span>
                    <ArrowRight className="h-3 w-3" />
                  </motion.button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-primary-900/20 to-accent-900/20 rounded-lg p-8 border border-primary-500/20"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Get notified when I publish new articles about homelab setup, systems programming, 
              and infrastructure automation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-400"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default BlogSection
