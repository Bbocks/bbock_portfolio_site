import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.css'
import { PostHogProvider } from 'posthog-js/react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PostHogProvider
      apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
      options={{
        api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
        defaults: '2025-05-24',
        capture_exceptions: true, // Enables capturing exceptions using Error Tracking
        debug: import.meta.env.MODE === 'development',
        person_profiles: 'always',
        autocapture: true,
        cookieless_mode: 'always',
      }}
    >
      <App />
    </PostHogProvider>
  </React.StrictMode>,
)