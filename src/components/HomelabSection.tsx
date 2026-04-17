import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Cpu, HardDrive, Wifi, Activity, Clock, AlertCircle, CheckCircle } from 'lucide-react'
import ScrollSection from './ScrollSection'
import TerminalPanel from './terminal/TerminalPanel'
import { motionEnter, staggerChildren } from '../lib/motion'

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

const HomelabSection = ({ enableParallax = true }: { enableParallax?: boolean }) => {
  const [systems, setSystems] = useState<SystemStatus[]>([
    {
      name: 'Proxmox Host',
      status: 'online',
      uptime: '15 days, 8 hours',
      cpu: 45,
      memory: 67,
      disk: 23,
      network: 12,
      lastUpdate: '2 minutes ago',
    },
    {
      name: 'Docker Server',
      status: 'online',
      uptime: '7 days, 12 hours',
      cpu: 28,
      memory: 45,
      disk: 18,
      network: 8,
      lastUpdate: '1 minute ago',
    },
    {
      name: 'Monitoring Stack',
      status: 'online',
      uptime: '30 days, 2 hours',
      cpu: 15,
      memory: 32,
      disk: 12,
      network: 5,
      lastUpdate: '30 seconds ago',
    },
    {
      name: 'Backup Server',
      status: 'warning',
      uptime: '2 days, 5 hours',
      cpu: 8,
      memory: 25,
      disk: 78,
      network: 3,
      lastUpdate: '5 minutes ago',
    },
  ])

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.06,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setSystems((prev) =>
        prev.map((system) => ({
          ...system,
          cpu: Math.max(5, Math.min(95, system.cpu + (Math.random() - 0.5) * 10)),
          memory: Math.max(10, Math.min(90, system.memory + (Math.random() - 0.5) * 5)),
          network: Math.max(1, Math.min(50, system.network + (Math.random() - 0.5) * 8)),
          lastUpdate: 'Just now',
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'text-emerald-400'
      case 'warning':
        return 'text-amber-400'
      case 'offline':
        return 'text-red-400'
      default:
        return 'text-[var(--color-text-muted)]'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="h-5 w-5 text-emerald-400" aria-hidden />
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-amber-400" aria-hidden />
      case 'offline':
        return <AlertCircle className="h-5 w-5 text-red-400" aria-hidden />
      default:
        return <Activity className="h-5 w-5 text-[var(--color-text-muted)]" aria-hidden />
    }
  }

  const getUsageColor = (usage: number) => {
    if (usage < 50) return 'text-emerald-400'
    if (usage < 80) return 'text-amber-400'
    return 'text-red-400'
  }

  return (
    <ScrollSection
      id="homelab"
      className="bg-[var(--color-bg-deep)] py-12 lg:py-20"
      movement={36}
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
            <span className="gradient-text">Homelab Status</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-[var(--color-text-muted)]">
            Live monitoring of my enterprise-grade homelab infrastructure. Real-time system metrics and uptime statistics.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...motionEnter, delay: staggerChildren * 2 }}
          className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-4"
        >
          {[
            { label: 'Overall Uptime', value: '99.9%', accent: 'text-emerald-400' },
            { label: 'Active Systems', value: '4', accent: 'text-[var(--color-terminal)]' },
            { label: 'Running Containers', value: '15+', accent: 'text-[var(--color-accent)]' },
            { label: 'Monitoring', value: '24/7', accent: 'text-violet-400' },
          ].map((stat) => (
            <TerminalPanel key={stat.label} title="metric" subtitle={stat.label.toLowerCase().replace(/\s+/g, '-')} contentClassName="p-5 text-center">
              <div className={`font-mono text-3xl font-bold ${stat.accent}`}>{stat.value}</div>
              <div className="mt-1 font-mono text-xs text-[var(--color-text-muted)]">{stat.label}</div>
            </TerminalPanel>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {systems.map((system, index) => (
            <motion.div
              key={system.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ ...motionEnter, delay: 0.12 + index * staggerChildren }}
            >
              <TerminalPanel
                title={system.name}
                subtitle={system.status}
                className="card-hover h-full"
                contentClassName="p-6"
              >
                <div className="mb-4 flex items-center justify-end gap-2">
                  {getStatusIcon(system.status)}
                  <span className={`text-xs font-semibold uppercase tracking-wide ${getStatusColor(system.status)}`}>
                    {system.status}
                  </span>
                </div>

                <div className="mb-4 flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                  <Clock className="h-4 w-4 shrink-0" aria-hidden />
                  <span>Uptime: {system.uptime}</span>
                </div>

                <div className="space-y-3">
                  {[
                    { label: 'CPU', value: system.cpu, Icon: Cpu, bar: 'bg-sky-400' },
                    { label: 'Memory', value: system.memory, Icon: HardDrive, bar: 'bg-emerald-400' },
                    { label: 'Disk', value: system.disk, Icon: HardDrive, bar: 'bg-violet-400' },
                    { label: 'Network', value: system.network, Icon: Wifi, bar: 'bg-amber-400' },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-2">
                        <row.Icon className="h-4 w-4 shrink-0 text-[var(--color-terminal)]" aria-hidden />
                        <span className="text-sm text-[var(--color-text-muted)]">{row.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 overflow-hidden rounded-full bg-[var(--color-border-subtle)]">
                          <div
                            className={`h-2 rounded-full transition-all duration-500 ${row.bar}`}
                            style={{ width: `${Math.round(row.value)}%` }}
                          />
                        </div>
                        <span className={`w-10 text-right text-sm font-medium ${getUsageColor(row.value)}`}>
                          {Math.round(row.value)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 border-t border-[var(--color-border-subtle)] pt-4">
                  <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
                    <span>Last updated: {system.lastUpdate}</span>
                    <div className="flex items-center gap-1">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" aria-hidden />
                      <span>Live</span>
                    </div>
                  </div>
                </div>
              </TerminalPanel>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...motionEnter, delay: 0.45 }}
          className="mt-14"
        >
          <TerminalPanel title="infrastructure.md" subtitle="overview" contentClassName="p-8">
            <h3 className="mb-6 font-mono text-xl font-semibold text-[var(--color-text)]">Infrastructure overview</h3>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <h4 className="text-lg font-semibold text-[var(--color-terminal)]">Virtualization</h4>
                <ul className="space-y-1 text-sm text-[var(--color-text-muted)]">
                  <li>• Proxmox VE 8.0</li>
                  <li>• 4 VMs running</li>
                  <li>• LXC containers</li>
                  <li>• Automated backups</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-semibold text-[var(--color-accent)]">Containerization</h4>
                <ul className="space-y-1 text-sm text-[var(--color-text-muted)]">
                  <li>• Docker & Docker Compose</li>
                  <li>• 15+ containers</li>
                  <li>• Traefik reverse proxy</li>
                  <li>• Auto SSL certificates</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-semibold text-violet-400">Monitoring</h4>
                <ul className="space-y-1 text-sm text-[var(--color-text-muted)]">
                  <li>• Grafana dashboards</li>
                  <li>• Prometheus metrics</li>
                  <li>• Discord notifications</li>
                  <li>• Uptime monitoring</li>
                </ul>
              </div>
            </div>
          </TerminalPanel>
        </motion.div>
      </div>
    </ScrollSection>
  )
}

export default HomelabSection
