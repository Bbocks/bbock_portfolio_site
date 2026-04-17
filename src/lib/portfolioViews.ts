export const PORTFOLIO_VIEWS = [
  'home',
  'projects',
  'experience',
  'skills',
  'homelab',
  'blog',
  'contact',
] as const

export type PortfolioView = (typeof PORTFOLIO_VIEWS)[number]

export function isPortfolioView(value: string): value is PortfolioView {
  return (PORTFOLIO_VIEWS as readonly string[]).includes(value)
}

export function parseViewFromHash(): PortfolioView {
  const raw = window.location.hash.replace(/^#/, '').trim().toLowerCase()
  if (!raw || raw === 'home') return 'home'
  return isPortfolioView(raw) ? raw : 'home'
}

export function hashForView(view: PortfolioView): string {
  return view === 'home' ? '' : `#${view}`
}
