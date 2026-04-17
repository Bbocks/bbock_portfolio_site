import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { helpText, mobileTipsIntro } from '../../lib/terminalCommands'

interface TerminalHelpSheetProps {
  onClose: () => void
}

/** Bottom-sheet tips for mobile shell; mount only when visible. */
const TerminalHelpSheet = ({ onClose }: TerminalHelpSheetProps) => {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const id = window.requestAnimationFrame(() => closeRef.current?.focus())
    return () => window.cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[70] flex flex-col justify-end lg:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        aria-label="Close tips"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="terminal-help-title"
        className="relative z-[71] max-h-[min(85dvh,560px)] overflow-hidden rounded-t-xl border border-[var(--color-border)] border-b-0 bg-[var(--color-panel)] shadow-[0_-8px_40px_rgba(0,0,0,0.45)]"
      >
        <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] bg-[var(--color-panel-header)] px-4 py-3">
          <h2 id="terminal-help-title" className="font-mono text-sm font-semibold text-[var(--color-text)]">
            Terminal tips
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-[var(--color-text-muted)] hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text)] focus-visible:focus-ring"
            aria-label="Close tips"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>
        <div className="max-h-[calc(min(85dvh,560px)-3.5rem)] overflow-y-auto px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <p className="mb-4 text-sm leading-relaxed text-[var(--color-text-muted)]">{mobileTipsIntro()}</p>
          <pre className="whitespace-pre-wrap rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-bg-deep)] p-3 font-mono text-[11px] leading-relaxed text-[var(--color-text-muted)] sm:text-xs">
            {helpText()}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default TerminalHelpSheet
