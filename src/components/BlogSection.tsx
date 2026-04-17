import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'
import ScrollSection from './ScrollSection'
import TerminalPanel from './terminal/TerminalPanel'
import { motionEnter, staggerChildren } from '../lib/motion'

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
    excerpt:
      'How I transformed an old Dell OptiPlex into a powerful virtualization server using Proxmox VE, complete with automated backups and monitoring.',
    content: 'Full article content would go here...',
    date: '2024-01-15',
    readTime: '8 min read',
    tags: ['Proxmox', 'Homelab', 'Virtualization', 'Hardware'],
    category: 'homelab',
    featured: true,
  },
  {
    id: 'docker-optimization',
    title: 'Optimizing Docker Compose for Production',
    excerpt:
      'Best practices for structuring Docker Compose files, implementing health checks, and achieving zero-downtime deployments.',
    content: 'Full article content would go here...',
    date: '2024-01-10',
    readTime: '12 min read',
    tags: ['Docker', 'Docker Compose', 'DevOps', 'Deployment'],
    category: 'tutorial',
  },
  {
    id: 'c-memory-debugging',
    title: 'Debugging C Memory Leaks in Teaching Labs',
    excerpt:
      'Common memory management pitfalls in C programming and how to use Valgrind and GDB to identify and fix memory leaks.',
    content: 'Full article content would go here...',
    date: '2024-01-05',
    readTime: '10 min read',
    tags: ['C Programming', 'Memory Management', 'Debugging', 'Valgrind'],
    category: 'debugging',
  },
  {
    id: 'grafana-monitoring',
    title: 'Setting Up Grafana Monitoring for Homelab',
    excerpt: 'Complete guide to monitoring your homelab infrastructure with Grafana, Prometheus, and custom dashboards.',
    content: 'Full article content would go here...',
    date: '2023-12-28',
    readTime: '15 min read',
    tags: ['Grafana', 'Prometheus', 'Monitoring', 'Homelab'],
    category: 'homelab',
  },
  {
    id: 'systems-programming',
    title: 'Systems Programming Fundamentals',
    excerpt:
      'Understanding the basics of systems programming, from process management to inter-process communication.',
    content: 'Full article content would go here...',
    date: '2023-12-20',
    readTime: '20 min read',
    tags: ['Systems Programming', 'Linux', 'Process Management', 'IPC'],
    category: 'systems',
  },
  {
    id: 'ansible-automation',
    title: 'Infrastructure Automation with Ansible',
    excerpt: 'Automating server provisioning and configuration management using Ansible playbooks and roles.',
    content: 'Full article content would go here...',
    date: '2023-12-15',
    readTime: '14 min read',
    tags: ['Ansible', 'Automation', 'DevOps', 'Configuration Management'],
    category: 'tutorial',
  },
]

const BlogSection = ({ enableParallax = true }: { enableParallax?: boolean }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.06,
  })

  const categories = [
    { id: 'all', name: 'All Posts', count: blogPosts.length },
    { id: 'homelab', name: 'Homelab', count: blogPosts.filter((p) => p.category === 'homelab').length },
    { id: 'systems', name: 'Systems', count: blogPosts.filter((p) => p.category === 'systems').length },
    { id: 'tutorial', name: 'Tutorials', count: blogPosts.filter((p) => p.category === 'tutorial').length },
    { id: 'debugging', name: 'Debugging', count: blogPosts.filter((p) => p.category === 'debugging').length },
  ]

  const filteredPosts =
    selectedCategory === 'all' ? blogPosts : blogPosts.filter((post) => post.category === selectedCategory)

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'homelab':
        return 'bg-sky-500/90 text-white'
      case 'systems':
        return 'bg-emerald-500/90 text-white'
      case 'tutorial':
        return 'bg-violet-500/90 text-white'
      case 'debugging':
        return 'bg-amber-500/90 text-white'
      default:
        return 'bg-slate-500 text-white'
    }
  }

  return (
    <ScrollSection
      id="blog"
      className="bg-[var(--color-bg-elevated)] py-12 lg:py-20"
      movement={32}
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
            <span className="gradient-text">Blog & Notes</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-[var(--color-text-muted)]">
            Technical articles, tutorials, and insights from my journey in systems engineering and infrastructure management.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...motionEnter, delay: staggerChildren * 2 }}
          className="mb-12 flex flex-wrap justify-center gap-3"
          role="tablist"
          aria-label="Filter posts by category"
        >
          {categories.map((category) => {
            const selected = selectedCategory === category.id
            return (
              <motion.button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={selected}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={motionEnter}
                onClick={() => setSelectedCategory(category.id)}
                className={`inline-flex items-center gap-2 rounded-md border px-4 py-2 font-mono text-sm transition-colors focus-visible:focus-ring ${
                  selected
                    ? 'border-[var(--color-terminal)] bg-[var(--color-terminal)]/15 text-[var(--color-terminal)]'
                    : 'border-[var(--color-border-subtle)] bg-[var(--color-panel-header)] text-[var(--color-text-muted)] hover:border-[var(--color-border)]'
                }`}
              >
                {category.name}
                <span className="stamp-pill border-0 bg-white/10 px-2 py-0.5 text-[10px] text-[var(--color-text)]">
                  {category.count}
                </span>
              </motion.button>
            )
          })}
        </motion.div>

        {selectedCategory === 'all' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...motionEnter, delay: staggerChildren * 3 }}
            className="mb-12"
          >
            {blogPosts
              .filter((post) => post.featured)
              .map((post) => (
                <TerminalPanel
                  key={post.id}
                  title={`${post.id}.md`}
                  subtitle="featured"
                  className="card-hover"
                  contentClassName="p-8"
                >
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span className={`stamp-pill border-0 px-2.5 py-1 text-[11px] font-medium normal-case ${getCategoryStyles(post.category)}`}>
                      {post.category}
                    </span>
                    <span className="font-mono text-xs text-[var(--color-accent)]">featured</span>
                  </div>
                  <h3 className="mb-3 font-mono text-2xl font-semibold text-[var(--color-text)]">{post.title}</h3>
                  <p className="mb-6 text-lg leading-relaxed text-[var(--color-text-muted)]">{post.excerpt}</p>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-text-muted)]">
                      <span className="stamp-pill inline-flex items-center gap-1 normal-case">
                        <Calendar className="h-3.5 w-3.5" aria-hidden />
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-4 w-4" aria-hidden />
                        {post.readTime}
                      </span>
                    </div>
                    <motion.button
                      type="button"
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      transition={motionEnter}
                      className="inline-flex items-center gap-2 rounded-md bg-[var(--color-terminal)] px-4 py-2 font-mono text-sm font-medium text-[var(--color-bg-deep)] focus-visible:focus-ring"
                    >
                      <span>Read more</span>
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </motion.button>
                  </div>
                </TerminalPanel>
              ))}
          </motion.div>
        )}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts
            .filter((post) => !post.featured || selectedCategory !== 'all')
            .map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ ...motionEnter, delay: 0.08 + index * staggerChildren }}
              >
                <TerminalPanel
                  title={post.title.slice(0, 28) + (post.title.length > 28 ? '…' : '')}
                  subtitle={post.id}
                  className="card-hover h-full"
                  contentClassName="p-6"
                >
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <span className={`stamp-pill border-0 px-2 py-1 text-[10px] font-medium normal-case ${getCategoryStyles(post.category)}`}>
                      {post.category}
                    </span>
                    <span className="inline-flex items-center gap-1 font-mono text-xs text-[var(--color-text-muted)]">
                      <Clock className="h-3.5 w-3.5" aria-hidden />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="mb-2 line-clamp-2 font-mono text-lg font-semibold text-[var(--color-text)]">{post.title}</h3>
                  <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-[var(--color-text-muted)]">{post.excerpt}</p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1 font-mono text-[11px] text-[var(--color-text-muted)]">
                        <Tag className="h-3 w-3 text-[var(--color-terminal)]" aria-hidden />
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="font-mono text-[11px] text-[var(--color-text-muted)]">+{post.tags.length - 3}</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between border-t border-[var(--color-border-subtle)] pt-4">
                    <span className="stamp-pill inline-flex items-center gap-1 normal-case">
                      <Calendar className="h-3 w-3" aria-hidden />
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                    <motion.button
                      type="button"
                      whileHover={{ x: 2 }}
                      transition={motionEnter}
                      className="inline-flex items-center gap-1 font-mono text-sm font-medium text-[var(--color-terminal)] focus-visible:focus-ring"
                    >
                      Read
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </motion.button>
                  </div>
                </TerminalPanel>
              </motion.article>
            ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...motionEnter, delay: 0.5 }}
          className="mt-16"
        >
          <TerminalPanel title="notify.list" subtitle="mailing" contentClassName="p-8 text-center">
            <h3 className="mb-3 font-mono text-2xl font-semibold text-[var(--color-text)]">Stay updated</h3>
            <p className="mx-auto mb-6 max-w-2xl text-[var(--color-text-muted)]">
              Get notified when I publish new articles about homelab setup, systems programming, and infrastructure automation.
            </p>
            <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
              <label htmlFor="blog-email" className="sr-only">
                Email for updates
              </label>
              <input
                id="blog-email"
                type="email"
                placeholder="you@example.com"
                className="min-h-[44px] flex-1 rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] px-4 py-3 text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-terminal)] focus:outline-none focus:ring-1 focus:ring-[var(--color-terminal)]"
              />
              <motion.button
                type="button"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={motionEnter}
                className="min-h-[44px] rounded-md bg-[var(--color-terminal)] px-6 font-mono text-sm font-medium text-[var(--color-bg-deep)] focus-visible:focus-ring"
              >
                Subscribe
              </motion.button>
            </div>
          </TerminalPanel>
        </motion.div>
      </div>
    </ScrollSection>
  )
}

export default BlogSection
