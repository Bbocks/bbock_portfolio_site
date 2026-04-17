import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.css'
import { PostHogProvider } from 'posthog-js/react'

// https://posthog.com/docs/libraries/js — init(apiKey, { api_host, defaults, ... })
const posthogApiHost =
  import.meta.env.VITE_PUBLIC_POSTHOG_HOST?.trim() || 'https://us.i.posthog.com'
const posthogKey = import.meta.env.VITE_PUBLIC_POSTHOG_KEY?.trim()

const posthogOptions = {
  api_host: posthogApiHost,
  defaults: '2026-01-30' as const,
  capture_exceptions: true,
  debug: import.meta.env.MODE === 'development',
  person_profiles: 'always' as const,
  autocapture: true,
  cookieless_mode: 'always' as const,
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {posthogKey ? (
      <PostHogProvider apiKey={posthogKey} options={posthogOptions}>
        <App />
      </PostHogProvider>
    ) : (
      <App />
    )}
  </React.StrictMode>,
)