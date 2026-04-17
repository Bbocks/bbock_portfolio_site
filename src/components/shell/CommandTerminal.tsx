import { useEffect, useRef, type ReactNode } from 'react'
import { HelpCircle } from 'lucide-react'
import TerminalPanel from '../terminal/TerminalPanel'
import type { TerminalLine } from '../../lib/terminalCommands'

export type CommandTerminalVariant = 'full' | 'compact'

interface CommandTerminalProps {
  lines: TerminalLine[]
  onSubmitLine: (raw: string) => void
  className?: string
  contentClassName?: string
  /** `compact` = single input row + optional help button (mobile). `full` = desktop log + panel chrome. */
  variant?: CommandTerminalVariant
  /** Shown only in `compact` variant; opens the tips sheet. */
  onOpenHelp?: () => void
}

const CommandTerminal = ({
  lines,
  onSubmitLine,
  className = '',
  contentClassName = '',
  variant = 'full',
  onOpenHelp,
}: CommandTerminalProps) => {
  const logRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = logRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  if (variant === 'compact') {
    return (
      <div
        className={`rounded-lg border border-[var(--color-border)] bg-[var(--color-panel)] shadow-[0_0_0_1px_rgba(56,189,248,0.06),0_4px_16px_rgba(0,0,0,0.25)] ${className}`}
      >
        <TerminalInput
          onSubmit={onSubmitLine}
          compact
          trailing={
            onOpenHelp ? (
              <button
                type="button"
                onClick={onOpenHelp}
                className="shrink-0 rounded-md p-1.5 text-[var(--color-terminal)] hover:bg-[var(--color-bg-elevated)] focus-visible:focus-ring"
                aria-label="Open terminal tips"
              >
                <HelpCircle className="h-5 w-5" aria-hidden />
              </button>
            ) : null
          }
        />
      </div>
    )
  }

  return (
    <TerminalPanel
      title="~/portfolio"
      subtitle="zsh"
      className={`flex min-h-0 flex-col ${className}`}
      contentClassName={`flex min-h-0 flex-col font-mono text-xs text-[var(--color-text-muted)] ${contentClassName}`}
    >
      <div
        ref={logRef}
        className="max-h-[min(28vh,220px)] min-h-[6rem] flex-1 overflow-y-auto px-3 py-2 sm:max-h-[min(32vh,260px)] lg:max-h-none lg:flex-1"
        aria-live="polite"
      >
        {lines.map((line, i) => (
          <div
            key={i}
            className={
              line.kind === 'cmd'
                ? 'mb-1 text-[var(--color-terminal)]'
                : line.kind === 'err'
                  ? 'mb-1 whitespace-pre-wrap text-red-400/90'
                  : 'mb-1 whitespace-pre-wrap'
            }
          >
            {line.kind === 'cmd' ? (
              <>
                <span className="text-[var(--color-text-muted)]">$ </span>
                {line.text}
              </>
            ) : (
              line.text
            )}
          </div>
        ))}
      </div>
      <TerminalInput onSubmit={onSubmitLine} compact={false} />
    </TerminalPanel>
  )
}

function TerminalInput({
  onSubmit,
  compact = false,
  trailing,
}: {
  onSubmit: (raw: string) => void
  compact?: boolean
  trailing?: ReactNode
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const fd = new FormData(e.currentTarget)
        const raw = String(fd.get('cmd') ?? '')
        onSubmit(raw)
        e.currentTarget.reset()
      }}
      className={`flex shrink-0 items-center gap-2 border-[var(--color-border-subtle)] bg-[var(--color-panel-header)]/80 ${
        compact
          ? 'border-none px-2 py-1.5'
          : 'border-t border-[var(--color-border-subtle)] px-3 py-2'
      }`}
    >
      <span className="shrink-0 font-mono text-[var(--color-accent)]" aria-hidden>
        &gt;
      </span>
      <input
        name="cmd"
        className="min-w-0 flex-1 bg-transparent font-mono text-sm text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-muted)]/60"
        placeholder="help"
        aria-label="Terminal command"
        autoComplete="off"
        spellCheck={false}
      />
      {trailing}
    </form>
  )
}

export default CommandTerminal
