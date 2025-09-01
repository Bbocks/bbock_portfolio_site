import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Download, Linkedin, Github, ChevronDown } from 'lucide-react'

const HeroSection = () => {
  const [text, setText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const fullText = "Computer Science Major | Systems Programmer | DevOps Enthusiast"
  const typingSpeed = 100

  useEffect(() => {
    if (inView && currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setText(fullText.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, typingSpeed)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, fullText, inView])

  const scrollToNext = () => {
    const element = document.querySelector('#projects')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-16 md:pt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-6 md:space-y-8"
        >
          {/* Main Title */}
          <div className="space-y-3 md:space-y-4">
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold font-mono"
            >
              <span className="gradient-text">Brett Bockstein</span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl lg:text-2xl text-gray-300 font-mono h-6 md:h-8"
            >
              {text}
              <span className="animate-blink">|</span>
            </motion.div>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed px-2 sm:pt-4"
          >
            Building robust systems and infrastructure solutions. From homelab automation 
            to full stack development, I bridge the gap between development and operations 
            with a focus on reliability and performance.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          > 
            <motion.a
              href="/Brett_Resume_8-20-25.pdf"
              download="Brett_Bockstein_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              <Download className="h-5 w-5" />
              <span>Download Resume</span>
            </motion.a>
            
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://linkedin.com/in/brettbocks"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors duration-200"
              >
                <Linkedin className="h-6 w-6 text-primary-400" />
              </motion.a>
              
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href="https://github.com/bbocks"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors duration-200"
              >
                <Github className="h-6 w-6 text-primary-400" />
              </motion.a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-2.5xl mx-auto pt-6 md:pt-8"
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary-400">3+</div>
              <div className="text-sm md:text-base text-gray-400">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-accent-400">15+</div>
              <div className="text-sm md:text-base text-gray-400">Services Deployed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary-400">3+</div>
              <div className="text-sm md:text-base text-gray-400">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-accent-400">99.9%</div>
              <div className="text-sm md:text-base text-gray-400">Uptime</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.2 }}
        onClick={scrollToNext}
        className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <ChevronDown className="h-6 w-6 md:h-8 md:w-8 text-primary-400" />
      </motion.button>
    </section>
  )
}

export default HeroSection
