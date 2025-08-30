'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface InteractiveTerminalProps {
  commands: string[]
}

const InteractiveTerminal = ({ commands }: InteractiveTerminalProps) => {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0)
  const [displayedCommands, setDisplayedCommands] = useState<Array<{
    command: string
    output: string
    isExecuting: boolean
  }>>([])
  const [isTyping, setIsTyping] = useState(false)

  const commandOutputs: { [key: string]: string } = {
    'ssh root@proxmox.local': 'Welcome to Ubuntu 22.04.3 LTS (GNU/Linux 5.15.0-88-generic x86_64)\nroot@proxmox:~#',
    'pvesm status': 'local: local\n  lvmthin: local-lvm\n  nfs: backup-nfs\n  dir: local\n  iso: local\n  vztmpl: local',
    'docker ps': 'CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES\nabc123def456   nginx     "/docker-entrypoint.…"   2 hours ago   Up 2 hours   0.0.0.0:80->80/tcp   web-server',
    'systemctl status grafana-server': '● grafana-server.service - Grafana instance\n   Loaded: loaded (/etc/systemd/system/grafana-server.service; enabled; vendor preset: enabled)\n   Active: active (running) since Mon 2024-01-15 10:30:00 UTC; 2h 30min ago',
    'docker-compose up -d': 'Creating network "app_default"\nCreating app_web_1 ... done\nCreating app_db_1  ... done\nCreating app_redis_1 ... done',
    'docker-compose logs -f': 'web_1  | [INFO] Server starting on port 3000\nweb_1  | [INFO] Database connection established\ndb_1   | [INFO] PostgreSQL started successfully',
    'docker system prune -a': 'WARNING! This will remove:\n  - all stopped containers\n  - all networks not used by at least one container\n  - all images without at least one container associated to them\nDeleted Containers: 5\nDeleted Images: 12\nDeleted Networks: 2\nTotal reclaimed space: 2.1GB',
    'gcc -g -o program program.c': '',
    'gdb ./program': 'GNU gdb (Ubuntu 12.1-0ubuntu1~22.04.1) 12.1\nCopyright (C) 2022 Free Software Foundation, Inc.\n(gdb)',
    'valgrind --leak-check=full ./program': '==12345== Memcheck, a memory error detector\n==12345== Copyright (C) 2002-2022, and GNU GPL\'d\n==12345== Using Valgrind-3.19.0 and LibVEX\n==12345== All heap blocks were freed -- no leaks are possible',
    'npm install': 'added 1254 packages, and audited 1255 packages in 1.2s\nfound 0 vulnerabilities',
    'npm run dev': '> app@0.1.0 dev\n> next dev\n\nready - started server on 0.0.0.0:3000, url: http://localhost:3000',
    'npm run build': '> app@0.1.0 build\n> next build\n\n✓ Compiled successfully\n✓ Collecting page data\n✓ Finalizing page optimization',
    'javac *.java': '',
    'java -cp . Main': 'Hello, World!\nProgram executed successfully.',
    'mvn test': '[INFO] Scanning for projects...\n[INFO] Running tests...\n[INFO] Tests run: 15, Failures: 0, Errors: 0, Skipped: 0\n[INFO] BUILD SUCCESS'
  }

  useEffect(() => {
    if (currentCommandIndex < commands.length) {
      setIsTyping(true)
      const timer = setTimeout(() => {
        const command = commands[currentCommandIndex]
        setDisplayedCommands(prev => [...prev, {
          command,
          output: commandOutputs[command] || 'Command executed successfully.',
          isExecuting: false
        }])
        setCurrentCommandIndex(prev => prev + 1)
        setIsTyping(false)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [currentCommandIndex, commands])

  const resetTerminal = () => {
    setCurrentCommandIndex(0)
    setDisplayedCommands([])
    setIsTyping(false)
  }

  return (
    <div className="terminal-window">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <button
          onClick={resetTerminal}
          className="text-xs text-gray-400 hover:text-white transition-colors"
        >
          Reset
        </button>
      </div>
      
      <div className="space-y-2 font-mono text-sm">
        {displayedCommands.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-1"
          >
            <div className="flex items-center space-x-2">
              <span className="text-green-400">$</span>
              <span className="text-white">{item.command}</span>
            </div>
            {item.output && (
              <div className="text-gray-300 ml-4 whitespace-pre-line">
                {item.output}
              </div>
            )}
          </motion.div>
        ))}
        
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-2"
          >
            <span className="text-green-400">$</span>
            <span className="text-white">{commands[currentCommandIndex]}</span>
            <span className="animate-blink text-white">|</span>
          </motion.div>
        )}
        
        {!isTyping && currentCommandIndex < commands.length && (
          <div className="text-gray-500 text-xs">
            Next command in 2s...
          </div>
        )}
      </div>
    </div>
  )
}

export default InteractiveTerminal
