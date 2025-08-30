import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Brett Bock - Systems Engineer Portfolio',
  description: 'Computer Science Major | Systems Programmer | DevOps Enthusiast - Interactive portfolio showcasing homelab projects, systems programming, and full-stack development.',
  keywords: ['systems engineer', 'devops', 'homelab', 'systems programming', 'computer science', 'portfolio'],
  authors: [{ name: 'Brett Bock' }],
  openGraph: {
    title: 'Brett Bock - Systems Engineer Portfolio',
    description: 'Interactive portfolio showcasing systems engineering and DevOps expertise',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
