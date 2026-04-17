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
  hints | guide     Open tips panel (small screens)
  home              Back to hero / welcome
  projects | experience | skills | homelab | blog | contact
  cd <page>         Same as typing the page name
  open <page>       Same as cd`
}

/** Short intro shown above the command list in the mobile tips sheet. */
export function mobileTipsIntro(): string {
  return 'On mobile, only the command line is shown so content uses most of the screen. Type a command below or open this panel with hints, guide, or the help button on the right of the bar. Command output appears in the full terminal on desktop.'
}

function normalizeTokens(line: string): string[] {
  return line
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
}

/** Parsed shell input: navigate, show help, open mobile tips, or error. */
export function parseNavigationCommand(
  line: string,
): { view: PortfolioView } | { help: true } | { openHelp: true } | { error: string } {
  const tokens = normalizeTokens(line)
  if (tokens.length === 0) return { error: '(empty)' }

  if (tokens[0] === 'help' || tokens[0] === '?') {
    return { help: true }
  }

  if (tokens[0] === 'hints' || tokens[0] === 'guide' || tokens[0] === 'directions') {
    return { openHelp: true }
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
