# Brett Bockstein — Portfolio

Interactive portfolio site for systems engineering, homelab work, and projects. Built with **Vite**, **React 18**, **TypeScript**, and **Tailwind CSS**, with a **terminal-driven shell** for navigation instead of a long scrolling landing page.

## Features

### Terminal shell and navigation

- **Command-line navigation**: Type commands in the shell to switch views (`help`, `home`, `projects`, `experience`, `skills`, `homelab`, `blog`, `contact`, plus `cd` / `open` aliases).
- **Layout**
  - **Desktop (lg+)**: Left column (~25% width) with **hero** (~60vh) and **command terminal** below; main pane (~75%) shows one section at a time with transitions.
  - **Mobile**: Scrollable **main** area with the **terminal docked at the bottom**; `home` shows the hero in the main pane.
- **No full-page scroll**: Document scroll is disabled; long section content scrolls inside the main pane.
- **Deep links**: URL hash sync (e.g. `#projects`) and browser back/forward via `hashchange`.
- **Analytics**: PostHog event `portfolio_section_changed` when the active view changes (when PostHog is configured).

### Hero

- **Tegaki** animated handwriting for rotating role lines (Caveat subset); font files are served from **`public/fonts/tegaki/`** so `FontFace` loads stable URLs (avoids dev-bundler paths that some browsers reject).
- **Headshot** (`public/Headshot-3.jpg`) between the name and Tegaki line; circular frame with terminal-styled border.
- **Resume**: “View resume” opens the PDF **in a new tab on the same origin** (no `download` attribute) so visitors can bookmark or save from the browser PDF UI. URL is centralized in **`src/lib/resume.ts`** (`RESUME_PDF_HREF`; currently `Brett_Bockstein_CV.pdf` in `public/`).

### Sections (main pane)

Each section (Projects, Experience, Skills, Homelab, Blog, Contact) is shown one at a time in the shell. **`ScrollSection`** supports **`enableParallax`**; in the shell it is off so motion is not tied to a nested scroll container.

- **Projects**: Cards, modals, optional **InteractiveTerminal** demos for homelab-style commands.
- **Experience**: Timeline-style roles with expandable detail.
- **Skills**: Tabs, charts (Recharts), skill bubbles.
- **Homelab**: Status-style panels and metrics.
- **Blog**: Posts with category styling.
- **Contact**: Form plus contact channels and resume panel.

### Design system

- **Tokens** in `src/styles/globals.css` (terminal-forward colors, borders, motion-related CSS variables).
- **Typography**: **Source Sans 3** + **JetBrains Mono** (preloaded from `index.html`).
- **Primitives**: `TerminalPanel`, shared motion helpers in `src/lib/motion.ts`.

## Tech stack

| Area | Choice |
|------|--------|
| Build | Vite 5 |
| UI | React 18, TypeScript |
| Styling | Tailwind CSS |
| Motion | Framer Motion |
| Charts | Recharts |
| Icons | Lucide React |
| Handwriting | [Tegaki](https://github.com/KurtGokhan/tegaki) (`tegaki` + React adapter) |
| Analytics | PostHog (`posthog-js`, React provider in `src/main.tsx`) |

Note: **`react-terminal-ui`** is listed in `package.json` but the site uses a **custom** `CommandTerminal` built with `TerminalPanel` for consistent styling.

## Getting started

```bash
git clone https://github.com/<your-username>/bbock_portfolio_site.git
cd bbock_portfolio_site
npm install
npm run dev
```

Dev server: **http://localhost:3000** (see `vite.config.ts`).

```bash
npm run build    # tsc + vite build
npm run preview  # serve dist (default port 4173)
npm run lint     # eslint (ensure config extends resolve correctly in your env)
```

## Environment variables

PostHog (optional; wired in `main.tsx`):

```env
VITE_PUBLIC_POSTHOG_KEY=<your-project-api-key>
VITE_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

Do not commit real keys; use a local `.env` (see `.gitignore`).

## Customization

| What | Where |
|------|--------|
| Hero copy, headshot, Tegaki | `src/components/HeroSection.tsx` |
| Desktop “home” right pane copy | `src/components/shell/HeroWelcome.tsx` |
| Terminal commands / help text | `src/lib/terminalCommands.ts`, `src/lib/portfolioViews.ts` |
| Shell layout / routing / hash | `src/components/shell/PortfolioShell.tsx` |
| Resume file name / path | `public/` PDF + `src/lib/resume.ts` |
| Projects, experience, skills, etc. | respective `src/components/*Section.tsx` |
| Global theme tokens | `src/styles/globals.css`, `tailwind.config.js` |

Replace **`public/Headshot-3.jpg`** and the CV PDF referenced in **`src/lib/resume.ts`** with your own assets as needed.

## Project structure (high level)

```
src/
  App.tsx                 # Shell wrapper, background, no top nav
  main.tsx                # PostHog provider + React root
  components/
    shell/
      PortfolioShell.tsx  # Layout, active view, hash sync, terminal placement
      CommandTerminal.tsx # Prompt + scrollback
      HeroWelcome.tsx     # Desktop home pane when hero is in the left rail
    terminal/
      TerminalPanel.tsx   # Shared panel chrome
    HeroSection.tsx
    ProjectsSection.tsx
    ExperienceSection.tsx
    SkillsSection.tsx
    HomelabSection.tsx
    BlogSection.tsx
    ContactSection.tsx
    ScrollSection.tsx
    InteractiveTerminal.tsx  # Scripted “demo” terminal (e.g. projects/homelab)
  lib/
    resume.ts             # RESUME_PDF_HREF
    portfolioViews.ts     # View ids + hash helpers
    terminalCommands.ts   # Command parsing
    motion.ts
    useBreakpoint.ts
  styles/
    globals.css
public/
  Brett_Bockstein_CV.pdf  # Resume (name must match resume.ts)
  Headshot-3.jpg
  fonts/tegaki/           # Caveat TTFs for Tegaki
index.html
vite.config.ts
tailwind.config.js
```

The old **`Navigation.tsx`** top bar was removed; navigation is intentionally **terminal-first**.

## Deployment

Standard static hosting for the Vite **`dist`** output:

- **Vercel / Netlify**: build `npm run build`, publish **`dist`**.
- **Self-hosted**: serve `dist` behind Nginx/Traefik/Caddy; ensure **`*.pdf`** is served with correct `Content-Type` if you rely on in-tab PDF viewing.

If the site uses a non-root **`base`** in Vite, **`RESUME_PDF_HREF`** and asset URLs already use **`import.meta.env.BASE_URL`**.

## Performance and SEO

- Manual chunks for vendor / Framer / Recharts in `vite.config.ts`.
- Meta tags and font preloads in `index.html`.
- Prefer GPU-friendly transforms where Framer Motion is used.

## License

[MIT License](LICENSE).

## Acknowledgments

- [Vite](https://vitejs.dev/), [React](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/), [Lucide](https://lucide.dev/), [Recharts](https://recharts.org/)
- [Tegaki](https://github.com/KurtGokhan/tegaki), [PostHog](https://posthog.com/)

This project was previously migrated from **Next.js** to **Vite** for a simpler SPA setup and faster dev feedback.
