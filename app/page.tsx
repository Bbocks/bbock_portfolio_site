'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import HeroSection from '@/components/HeroSection'
import Navigation from '@/components/Navigation'
import ProjectsSection from '@/components/ProjectsSection'
import ExperienceSection from '@/components/ExperienceSection'
import SkillsSection from '@/components/SkillsSection'
import HomelabSection from '@/components/HomelabSection'
import BlogSection from '@/components/BlogSection'
import ContactSection from '@/components/ContactSection'
import NetworkAnimation from '@/components/NetworkAnimation'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time for smooth animations
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="text-4xl font-mono gradient-text mb-4">Brett Bock</div>
          <div className="text-primary-400">Loading systems...</div>
        </motion.div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-dark-900">
      {/* Background Network Animation */}
      <div className="fixed inset-0 z-0 opacity-20">
        <NetworkAnimation />
      </div>
      
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Projects Section */}
      <ProjectsSection />
      
      {/* Experience Section */}
      <ExperienceSection />
      
      {/* Skills Section */}
      <SkillsSection />
      
      {/* Homelab Section */}
      <HomelabSection />
      
      {/* Blog Section */}
      <BlogSection />
      
      {/* Contact Section */}
      <ContactSection />
    </main>
  )
}
