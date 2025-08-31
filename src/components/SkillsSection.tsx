import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

interface Skill {
  name: string
  level: number
  category: 'languages' | 'tools' | 'os' | 'frameworks'
  color: string
}

const skills: Skill[] = [
  // Languages
  { name: 'Java', level: 50, category: 'languages', color: '#f89820' },
  { name: 'C', level: 60, category: 'languages', color: '#00599c' },
  { name: 'Python', level: 70, category: 'languages', color: '#3776ab' },
  { name: 'JavaScript', level: 75, category: 'languages', color: '#f7df1e' },
  { name: 'TypeScript', level: 80, category: 'languages', color: '#3178c6' },
  { name: 'Bash', level: 73, category: 'languages', color: '#4eaa25' },
  
  // Tools
  { name: 'Docker', level: 90, category: 'tools', color: '#2496ed' },
  { name: 'Git', level: 80, category: 'tools', color: '#f05032' },
  //{ name: 'Ansible', level: 75, category: 'tools', color: '#ee0000' },
  //{ name: 'Grafana', level: 80, category: 'tools', color: '#f46800' },
  //{ name: 'Prometheus', level: 75, category: 'tools', color: '#e6522c' },
  
  // OS
  { name: 'Ubuntu', level: 70, category: 'os', color: '#e95420' },
  { name: 'Proxmox', level: 80, category: 'os', color: '#e57000' },
  { name: 'Linux', level: 70, category: 'os', color: '#fcc624' },
  { name: 'Windows', level: 90, category: 'os', color: '#0078d4' },
  { name: 'macOS', level: 65, category: 'os', color: '#000000' },
  
  // Frameworks
  { name: 'React', level: 75, category: 'frameworks', color: '#61dafb' },
  { name: 'Node.js', level: 70, category: 'frameworks', color: '#339933' },
  { name: 'Express', level: 70, category: 'frameworks', color: '#000000' },
  { name: 'Next.js', level: 25, category: 'frameworks', color: '#000000' }
]

const SkillsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<'languages' | 'tools' | 'os' | 'frameworks'>('languages')
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const categories = [
    { id: 'languages', name: 'Languages', icon: '💻' },
    { id: 'tools', name: 'Tools', icon: '🔧' },
    { id: 'os', name: 'Operating Systems', icon: '🖥️' },
    { id: 'frameworks', name: 'Frameworks', icon: '⚡' }
  ]

  const filteredSkills = skills.filter(skill => skill.category === selectedCategory)
  const chartData = filteredSkills.map(skill => ({
    name: skill.name,
    level: skill.level,
    color: skill.color
  }))

  const pieData = [
    { name: 'Languages', value: skills.filter(s => s.category === 'languages').length, color: '#0ea5e9' },
    { name: 'Tools', value: skills.filter(s => s.category === 'tools').length, color: '#22c55e' },
    { name: 'OS', value: skills.filter(s => s.category === 'os').length, color: '#f59e0b' },
    { name: 'Frameworks', value: skills.filter(s => s.category === 'frameworks').length, color: '#8b5cf6' }
  ]

  return (
    <section id="skills" className="py-20 bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-mono mb-4">
            <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A comprehensive overview of my technical skills, from programming languages 
            to infrastructure tools and operating systems.
          </p>
        </motion.div>

        {/* Category Tabs */}
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
              onClick={() => setSelectedCategory(category.id as any)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span>{category.name}</span>
            </motion.button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-dark-700 rounded-lg p-6"
          >
            <h3 className="text-xl font-bold text-white mb-6">Skill Proficiency</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#f9fafb'
                    }}
                  />
                  <Bar dataKey="level" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-dark-700 rounded-lg p-6"
          >
            <h3 className="text-xl font-bold text-white mb-6">Skill Distribution</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#f9fafb'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Skill Bubbles */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">All Skills</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ scale: 1.1 }}
                onHoverStart={() => setHoveredSkill(skill.name)}
                onHoverEnd={() => setHoveredSkill(null)}
                className="relative"
              >
                <div
                  className="skill-bubble text-sm font-medium cursor-pointer"
                  style={{
                    backgroundColor: hoveredSkill === skill.name ? skill.color + '20' : undefined,
                    borderColor: hoveredSkill === skill.name ? skill.color : undefined,
                    color: hoveredSkill === skill.name ? skill.color : undefined
                  }}
                >
                  {skill.name}
                </div>
                
                {/* Skill Level Indicator */}
                {hoveredSkill === skill.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-dark-800 border border-dark-600 rounded px-2 py-1 text-xs text-gray-300 whitespace-nowrap"
                  >
                    Level: {skill.level}%
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SkillsSection
