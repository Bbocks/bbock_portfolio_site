import TerminalPanel from '../terminal/TerminalPanel'

/** Desktop “home” view for the right pane while hero stays in the left column. */
const HeroWelcome = () => {
  return (
    <div className="h-full px-4 py-6 sm:px-8 sm:py-10">
      <TerminalPanel title="~/readme" subtitle="cat session.txt" contentClassName="p-6 sm:p-8">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          <span className="text-[var(--color-accent)]">session</span> — overview
        </p>
        <h2 className="font-mono text-2xl font-semibold text-[var(--color-text)] sm:text-3xl">
          Welcome to my portfolio
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--color-text-muted)]">
          Use the shell in the left column to open sections: projects, experience, skills, homelab, blog, and contact.
          Type <span className="text-[var(--color-terminal)]">help</span> anytime for commands, or{' '}
          <span className="text-[var(--color-terminal)]">home</span> to return here.
        </p>
        <ul className="mt-6 space-y-2 font-mono text-sm text-[var(--color-text-muted)]">
          <li>
            <span className="text-[var(--color-terminal)]">→</span> cd projects
          </li>
          <li>
            <span className="text-[var(--color-terminal)]">→</span> open contact
          </li>
        </ul>
      </TerminalPanel>
    </div>
  )
}

export default HeroWelcome
