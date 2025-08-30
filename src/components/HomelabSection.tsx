import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Server, Cpu, HardDrive, Wifi, Activity, Clock, AlertCircle, CheckCircle } from 'lucide-react'

interface SystemStatus {
  name: string
  status: 'online' | 'offline' | 'warning'
  uptime: string
  cpu: number
  memory: number
  disk: number
  network: number
  lastUpdate: string
}

const HomelabSection = () => {
  const [systems, setSystems] = useState<SystemStatus[]>([
    {
      name: 'Proxmox Host',
      status: 'online',
      uptime: '15 days, 8 hours',
      cpu: 45,
      memory: 67,
      disk: 23,
      network: 12,
      lastUpdate: '2 minutes ago'
    },
    {
      name: 'Docker Server',
      status: 'online',
      uptime: '7 days, 12 hours',
      cpu: 28,
      memory: 45,
      disk: 18,
      network: 8,
      lastUpdate: '1 minute ago'
    },
    {
      name: 'Monitoring Stack',
      status: 'online',
      uptime: '30 days, 2 hours',
      cpu: 15,
      memory: 32,
      disk: 12,
      network: 5,
      lastUpdate: '30 seconds ago'
    },
    {
      name: 'Backup Server',
      status: 'warning',
      uptime: '2 days, 5 hours',
      cpu: 8,
      memory: 25,
      disk: 78,
      network: 3,
      lastUpdate: '5 minutes ago'
    }
  ])

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystems(prev => prev.map(system => ({
        ...system,
        cpu: Math.max(5, Math.min(95, system.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(10, Math.min(90, system.memory + (Math.random() - 0.5) * 5)),
        network: Math.max(1, Math.min(50, system.network + (Math.random() - 0.5) * 8)),
        lastUpdate: 'Just now'
      })))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-400'
      case 'warning': return 'text-yellow-400'
      case 'offline': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle className="h-5 w-5 text-green-400" />
      case 'warning': return <AlertCircle className="h-5 w-5 text-yellow-400" />
      case 'offline': return <AlertCircle className="h-5 w-5 text-red-400" />
      default: return <Activity className="h-5 w-5 text-gray-400" />
    }
  }

  const getUsageColor = (usage: number) => {
    if (usage < 50) return 'text-green-400'
    if (usage < 80) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <section id="homelab" className="py-20 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-mono mb-4">
            <span className="gradient-text">Homelab Status</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Live monitoring of my enterprise-grade homelab infrastructure. 
            Real-time system metrics and uptime statistics.
          </p>
        </motion.div>

        {/* Overall Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-dark-700 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">99.9%</div>
            <div className="text-gray-400">Overall Uptime</div>
          </div>
          <div className="bg-dark-700 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-primary-400 mb-2">4</div>
            <div className="text-gray-400">Active Systems</div>
          </div>
          <div className="bg-dark-700 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-accent-400 mb-2">15+</div>
            <div className="text-gray-400">Running Containers</div>
          </div>
          <div className="bg-dark-700 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
            <div className="text-gray-400">Monitoring</div>
          </div>
        </motion.div>

        {/* System Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {systems.map((system, index) => (
            <motion.div
              key={system.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
              className="bg-dark-700 rounded-lg p-6 card-hover"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Server className="h-6 w-6 text-primary-400" />
                  <h3 className="text-xl font-bold text-white">{system.name}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(system.status)}
                  <span className={`text-sm font-medium ${getStatusColor(system.status)}`}>
                    {system.status.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Uptime */}
              <div className="flex items-center space-x-2 mb-4 text-sm text-gray-400">
                <Clock className="h-4 w-4" />
                <span>Uptime: {system.uptime}</span>
              </div>

              {/* Metrics */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Cpu className="h-4 w-4 text-blue-400" />
                    <span className="text-sm text-gray-400">CPU</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-dark-600 rounded-full h-2">
                      <div 
                        className="bg-blue-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${system.cpu}%` }}
                      ></div>
                    </div>
                    <span className={`text-sm font-medium ${getUsageColor(system.cpu)}`}>
                      {Math.round(system.cpu)}%
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <HardDrive className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-gray-400">Memory</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-dark-600 rounded-full h-2">
                      <div 
                        className="bg-green-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${system.memory}%` }}
                      ></div>
                    </div>
                    <span className={`text-sm font-medium ${getUsageColor(system.memory)}`}>
                      {Math.round(system.memory)}%
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <HardDrive className="h-4 w-4 text-purple-400" />
                    <span className="text-sm text-gray-400">Disk</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-dark-600 rounded-full h-2">
                      <div 
                        className="bg-purple-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${system.disk}%` }}
                      ></div>
                    </div>
                    <span className={`text-sm font-medium ${getUsageColor(system.disk)}`}>
                      {Math.round(system.disk)}%
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Wifi className="h-4 w-4 text-orange-400" />
                    <span className="text-sm text-gray-400">Network</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-dark-600 rounded-full h-2">
                      <div 
                        className="bg-orange-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${system.network}%` }}
                      ></div>
                    </div>
                    <span className={`text-sm font-medium ${getUsageColor(system.network)}`}>
                      {Math.round(system.network)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-dark-600">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Last updated: {system.lastUpdate}</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Live</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Infrastructure Overview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 bg-dark-700 rounded-lg p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Infrastructure Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="text-lg font-semibold text-primary-400">Virtualization</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Proxmox VE 8.0</li>
                <li>• 4 VMs running</li>
                <li>• LXC containers</li>
                <li>• Automated backups</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-semibold text-accent-400">Containerization</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Docker & Docker Compose</li>
                <li>• 15+ containers</li>
                <li>• Traefik reverse proxy</li>
                <li>• Auto SSL certificates</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-semibold text-purple-400">Monitoring</h4>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Grafana dashboards</li>
                <li>• Prometheus metrics</li>
                <li>• Discord notifications</li>
                <li>• Uptime monitoring</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HomelabSection
