import type { PortfolioView } from './portfolioViews'
import { isPortfolioView } from './portfolioViews'

export type TerminalLine = { kind: 'cmd' | 'out' | 'err'; text: string }

export const TERMINAL_BOOT_LINES: TerminalLine[] = [
  {
    kind: 'out',
    text: 'Portfolio shell — type help for commands.',
  },
]

const NAV_ALIASES: Record<string, PortfolioView> = {
  home: 'home',
  '~': 'home',
  projects: 'projects',
  experience: 'experience',
  skills: 'skills',
  homelab: 'homelab',
  blog: 'blog',
  contact: 'contact',
}

export function helpText(): string {
  return `Commands:
  help              Show this list
  home              Back to hero / welcome
  projects | experience | skills | homelab | blog | contact
  cd <page>         Same as typing the page name
  open <page>       Same as cd`
}

function normalizeTokens(line: string): string[] {
  return line
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
}

/** Returns target view, or null if not a navigation command (e.g. help only). */
export function parseNavigationCommand(line: string): { view: PortfolioView } | { help: true } | { error: string } {
  const tokens = normalizeTokens(line)
  if (tokens.length === 0) return { error: '(empty)' }

  if (tokens[0] === 'help' || tokens[0] === '?') {
    return { help: true }
  }

  if (tokens[0] === 'cd' || tokens[0] === 'open') {
    if (tokens.length < 2) return { error: `${tokens[0]}: missing destination` }
    const dest = tokens[1]
    if (dest === '~' || dest === 'home') return { view: 'home' }
    if (isPortfolioView(dest)) return { view: dest }
    return { error: `unknown destination: ${dest}` }
  }

  const single = tokens[0]
  if (single in NAV_ALIASES) {
    return { view: NAV_ALIASES[single] }
  }

  if (isPortfolioView(single)) {
    return { view: single }
  }

  return { error: `command not found: ${tokens[0]}. Type help` }
}
