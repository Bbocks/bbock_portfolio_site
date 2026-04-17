import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Code2, Wrench, Monitor, Zap } from 'lucide-react'
import ScrollSection from './ScrollSection'
import TerminalPanel from './terminal/TerminalPanel'
import { motionEnter, staggerChildren } from '../lib/motion'

interface Skill {
  name: string
  level: number
  category: 'languages' | 'tools' | 'os' | 'frameworks'
  color: string
}

const skills: Skill[] = [
  { name: 'Java', level: 50, category: 'languages', color: '#f89820' },
  { name: 'C', level: 60, category: 'languages', color: '#00599c' },
  { name: 'Python', level: 70, category: 'languages', color: '#3776ab' },
  { name: 'JavaScript', level: 75, category: 'languages', color: '#f7df1e' },
  { name: 'TypeScript', level: 80, category: 'languages', color: '#3178c6' },
  { name: 'Bash', level: 73, category: 'languages', color: '#4eaa25' },
  { name: 'Docker', level: 90, category: 'tools', color: '#2496ed' },
  { name: 'Git', level: 80, category: 'tools', color: '#f05032' },
  { name: 'Vite', level: 70, category: 'tools', color: '#646cff' },
  { name: 'ESLint', level: 30, category: 'tools', color: '#4b32c3' },
  { name: 'PostCSS', level: 40, category: 'tools', color: '#dc3a0c' },
  { name: 'Pandas', level: 45, category: 'tools', color: '#130654' },
  { name: 'REST API', level: 68, category: 'tools', color: '#ff6b6b' },
  { name: 'CSV/Excel', level: 80, category: 'tools', color: '#217346' },
  { name: 'Discord Webhooks', level: 75, category: 'tools', color: '#5865f2' },
  { name: 'Cloudflare Pages', level: 57, category: 'tools', color: '#f38020' },
  { name: 'Gmail API', level: 65, category: 'tools', color: '#ea4335' },
  { name: 'PostHog Analytics', level: 43, category: 'tools', color: '#6366f1' },
  { name: 'Snipe-IT', level: 75, category: 'tools', color: '#ff6b35' },
  { name: 'Ubuntu', level: 70, category: 'os', color: '#e95420' },
  { name: 'Proxmox', level: 80, category: 'os', color: '#e57000' },
  { name: 'Linux', level: 70, category: 'os', color: '#fcc624' },
  { name: 'Windows', level: 90, category: 'os', color: '#0078d4' },
  { name: 'macOS', level: 65, category: 'os', color: '#94a3b8' },
  { name: 'React', level: 75, category: 'frameworks', color: '#61dafb' },
  { name: 'Node.js', level: 70, category: 'frameworks', color: '#339933' },
  { name: 'Express', level: 70, category: 'frameworks', color: '#cbd5e1' },
  { name: 'Next.js', level: 50, category: 'frameworks', color: '#cbd5e1' },
  { name: 'React Router DOM', level: 75, category: 'frameworks', color: '#ca4245' },
  { name: 'Tailwind CSS', level: 85, category: 'frameworks', color: '#06b6d4' },
  { name: 'Framer Motion', level: 70, category: 'frameworks', color: '#0055ff' },
  { name: 'Lucide React', level: 60, category: 'frameworks', color: '#94a3b8' },
  { name: 'shadcn/ui', level: 50, category: 'frameworks', color: '#94a3b8' },
  { name: 'Radix UI', level: 22, category: 'frameworks', color: '#94a3b8' },
  { name: 'React Hook Form', level: 75, category: 'frameworks', color: '#ec5990' },
  { name: 'Zod', level: 30, category: 'frameworks', color: '#e53e3e' },
  { name: 'TanStack Query', level: 15, category: 'frameworks', color: '#ff4154' },
]

const SkillsSection = ({ enableParallax = true }: { enableParallax?: boolean }) => {
  const [selectedCategory, setSelectedCategory] = useState<'languages' | 'tools' | 'os' | 'frameworks'>('languages')
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.08,
  })

  const categories = [
    { id: 'languages' as const, name: 'Languages', Icon: Code2 },
    { id: 'tools' as const, name: 'Tools', Icon: Wrench },
    { id: 'os' as const, name: 'Operating Systems', Icon: Monitor },
    { id: 'frameworks' as const, name: 'Frameworks', Icon: Zap },
  ]

  const filteredSkills = skills.filter((skill) => skill.category === selectedCategory)
  const chartData = filteredSkills.map((skill) => ({
    name: skill.name,
    level: skill.level,
    color: skill.color,
  }))

  const pieData = [
    { name: 'Languages', value: skills.filter((s) => s.category === 'languages').length, color: '#0ea5e9' },
    { name: 'Tools', value: skills.filter((s) => s.category === 'tools').length, color: '#22c55e' },
    { name: 'OS', value: skills.filter((s) => s.category === 'os').length, color: '#f59e0b' },
    { name: 'Frameworks', value: skills.filter((s) => s.category === 'frameworks').length, color: '#8b5cf6' },
  ]

  const tooltipStyles = {
    backgroundColor: 'var(--color-panel-header)',
    border: '1px solid var(--color-border-subtle)',
    borderRadius: '8px',
    color: 'var(--color-text)',
  }

  return (
    <ScrollSection
      id="skills"
      className="bg-[var(--color-bg-elevated)] py-12 lg:py-20"
      movement={40}
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
            <span className="gradient-text">Skills</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-[var(--color-text-muted)]">
            A comprehensive overview of my technical skills, from programming languages to infrastructure tools and operating
            systems.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...motionEnter, delay: staggerChildren * 2 }}
          className="mb-12 flex flex-wrap justify-center gap-3"
          role="tablist"
          aria-label="Skill categories"
        >
          {categories.map((category) => {
            const selected = selectedCategory === category.id
            const Icon = category.Icon
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
                className={`inline-flex items-center gap-2 rounded-md border px-4 py-2.5 font-mono text-sm transition-colors focus-visible:focus-ring ${
                  selected
                    ? 'border-[var(--color-terminal)] bg-[var(--color-terminal)]/15 text-[var(--color-terminal)]'
                    : 'border-[var(--color-border-subtle)] bg-[var(--color-panel-header)] text-[var(--color-text-muted)] hover:border-[var(--color-border)] hover:text-[var(--color-text)]'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden />
                {category.name}
              </motion.button>
            )
          })}
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ ...motionEnter, delay: staggerChildren * 3 }}
          >
            <TerminalPanel title="skill-profile.json" subtitle="bar" contentClassName="p-6">
              <h3 className="mb-4 font-mono text-lg font-semibold text-[var(--color-text)]">Skill proficiency</h3>
              <div className="h-80" role="img" aria-label="Bar chart of skill levels for the selected category">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 12, right: 12, left: 4, bottom: 4 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-subtle)" />
                    <XAxis dataKey="name" stroke="var(--color-text-muted)" fontSize={11} tickLine={false} />
                    <YAxis stroke="var(--color-text-muted)" fontSize={11} tickLine={false} />
                    <Tooltip contentStyle={tooltipStyles} />
                    <Bar dataKey="level" fill="var(--color-terminal)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TerminalPanel>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ ...motionEnter, delay: staggerChildren * 4 }}
          >
            <TerminalPanel title="distribution.svg" subtitle="pie" contentClassName="p-6">
              <h3 className="mb-4 font-mono text-lg font-semibold text-[var(--color-text)]">Skill distribution</h3>
              <div className="h-80" role="img" aria-label="Pie chart of skill counts by category">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={88}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyles} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </TerminalPanel>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...motionEnter, delay: staggerChildren * 5 }}
          className="mt-14"
        >
          <TerminalPanel title="tags.txt" subtitle="all skills" contentClassName="p-6 md:p-8">
            <h3 className="mb-6 text-center font-mono text-xl font-semibold text-[var(--color-text)]">All skills</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ ...motionEnter, delay: index * 0.02 }}
                  whileHover={{ scale: 1.06 }}
                  onHoverStart={() => setHoveredSkill(skill.name)}
                  onHoverEnd={() => setHoveredSkill(null)}
                  className="relative"
                >
                  <div
                    className="skill-bubble cursor-pointer text-sm font-medium"
                    style={{
                      backgroundColor: hoveredSkill === skill.name ? `${skill.color}22` : undefined,
                      borderColor: hoveredSkill === skill.name ? skill.color : undefined,
                      color: hoveredSkill === skill.name ? skill.color : undefined,
                    }}
                  >
                    {skill.name}
                  </div>
                  {hoveredSkill === skill.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={motionEnter}
                      className="absolute -bottom-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded border border-[var(--color-border-subtle)] bg-[var(--color-panel-header)] px-2 py-1 font-mono text-xs text-[var(--color-text-muted)]"
                      role="tooltip"
                    >
                      Level: {skill.level}%
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </TerminalPanel>
        </motion.div>
      </div>
    </ScrollSection>
  )
}

export default SkillsSection
