import type { ReactNode } from 'react'

interface TerminalPanelProps {
  title?: string
  subtitle?: string
  children: ReactNode
  className?: string
  contentClassName?: string
  showTrafficLights?: boolean
}

const TerminalPanel = ({
  title,
  subtitle,
  children,
  className = '',
  contentClassName = '',
  showTrafficLights = true,
}: TerminalPanelProps) => {
  return (
    <div
      className={`overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-panel)] shadow-[0_0_0_1px_rgba(56,189,248,0.06),0_16px_48px_rgba(0,0,0,0.35)] ${className}`}
    >
      {(title !== undefined || subtitle !== undefined || showTrafficLights) && (
        <div className="flex items-center gap-2 border-b border-[var(--color-border-subtle)] bg-[var(--color-panel-header)] px-3 py-2 font-mono text-xs text-[var(--color-text-muted)]">
          {showTrafficLights && (
            <span className="flex gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/75" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/75" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/75" />
            </span>
          )}
          {title && (
            <span className="truncate text-[var(--color-terminal)]" title={title}>
              {title}
            </span>
          )}
          {subtitle && <span className="ml-auto truncate opacity-70">{subtitle}</span>}
        </div>
      )}
      <div className={contentClassName}>{children}</div>
    </div>
  )
}

export default TerminalPanel
