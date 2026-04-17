import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Linkedin, Github, Download, Send, CheckCircle } from 'lucide-react'
import ScrollSection from './ScrollSection'
import TerminalPanel from './terminal/TerminalPanel'
import { motionEnter, staggerChildren } from '../lib/motion'

const fieldClass =
  'min-h-[44px] w-full rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] px-4 py-3 text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-terminal)] focus:outline-none focus:ring-1 focus:ring-[var(--color-terminal)]'

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.06,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" aria-hidden />,
      title: 'Email',
      value: 'bocksteink@gmail.com',
      link: 'mailto:bocksteink@gmail.com',
    },
    {
      icon: <Linkedin className="h-6 w-6" aria-hidden />,
      title: 'LinkedIn',
      value: 'linkedin.com/in/brettbocks',
      link: 'https://linkedin.com/in/brettbocks',
    },
    {
      icon: <Github className="h-6 w-6" aria-hidden />,
      title: 'GitHub',
      value: 'github.com/bbocks',
      link: 'https://github.com/bbocks',
    },
  ]

  return (
    <ScrollSection id="contact" className="bg-[var(--color-bg-deep)] py-20" movement={28}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={motionEnter}
          className="mb-14 text-center"
        >
          <h2 className="font-mono text-3xl font-bold tracking-tight text-[var(--color-text)] md:text-5xl">
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-[var(--color-text-muted)]">
            Interested in collaborating on systems engineering projects or have questions about my work? Let&apos;s connect and
            discuss how we can work together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ ...motionEnter, delay: staggerChildren * 2 }}
          >
            <TerminalPanel title="compose" subtitle="--to brett" contentClassName="p-6 md:p-8">
              <h3 className="mb-6 font-mono text-xl font-semibold text-[var(--color-text)]">Send a message</h3>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={motionEnter}
                  className="py-8 text-center"
                  role="status"
                  aria-live="polite"
                >
                  <CheckCircle className="mx-auto mb-4 h-16 w-16 text-[var(--color-accent)]" aria-hidden />
                  <h4 className="mb-2 font-mono text-xl font-semibold text-[var(--color-text)]">Message sent</h4>
                  <p className="text-[var(--color-text-muted)]">Thank you for reaching out. I&apos;ll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" aria-busy={isSubmitting}>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm font-medium text-[var(--color-text-muted)]">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        autoComplete="name"
                        className={fieldClass}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium text-[var(--color-text-muted)]">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        autoComplete="email"
                        className={fieldClass}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="mb-2 block text-sm font-medium text-[var(--color-text-muted)]">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className={fieldClass}
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-[var(--color-text-muted)]">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className={`${fieldClass} resize-none`}
                      placeholder="Tell me about your project or question..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ y: isSubmitting ? 0 : -1 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    transition={motionEnter}
                    className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-md bg-[var(--color-terminal)] px-6 py-3 font-mono text-sm font-semibold text-[var(--color-bg-deep)] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:focus-ring"
                  >
                    {isSubmitting ? (
                      <>
                        <span
                          className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--color-bg-deep)] border-t-transparent"
                          aria-hidden
                        />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" aria-hidden />
                        <span>Send message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </TerminalPanel>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ ...motionEnter, delay: staggerChildren * 3 }}
            className="space-y-8"
          >
            <TerminalPanel title="contact.rc" subtitle="links" contentClassName="p-6 md:p-8">
              <h3 className="mb-6 font-mono text-xl font-semibold text-[var(--color-text)]">Contact information</h3>
              <div className="space-y-3">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.title}
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 12 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ ...motionEnter, delay: 0.15 + index * staggerChildren }}
                    whileHover={{ y: -2 }}
                    className="flex items-center gap-4 rounded-md border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] p-4 transition-colors hover:border-[var(--color-border)] focus-visible:focus-ring"
                  >
                    <div className="text-[var(--color-terminal)]">{info.icon}</div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-[var(--color-text-muted)]">{info.title}</div>
                      <div className="truncate font-mono text-sm text-[var(--color-text)]">{info.value}</div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </TerminalPanel>

            <TerminalPanel title="resume.pdf" subtitle="artifact" contentClassName="p-6">
              <h4 className="mb-2 font-mono text-lg font-semibold text-[var(--color-text)]">Download resume</h4>
              <p className="mb-4 text-sm text-[var(--color-text-muted)]">
                Get a detailed overview of my experience, skills, and projects in PDF format.
              </p>
              <motion.a
                href="/Brett_Resume_8-20-25.pdf"
                download="Brett_Bockstein_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={motionEnter}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-[var(--color-terminal)] px-4 py-2 font-mono text-sm font-medium text-[var(--color-bg-deep)] focus-visible:focus-ring"
              >
                <Download className="h-4 w-4" aria-hidden />
                <span>Download PDF</span>
              </motion.a>
            </TerminalPanel>

            <TerminalPanel title="status" subtitle="availability" contentClassName="p-6">
              <h4 className="mb-3 font-mono text-lg font-semibold text-[var(--color-text)]">Availability</h4>
              <div className="space-y-2 text-sm text-[var(--color-text-muted)]">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400" aria-hidden />
                  <span>Open to new opportunities</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400" aria-hidden />
                  <span>Available for freelance projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400" aria-hidden />
                  <span>Interested in collaboration</span>
                </div>
              </div>
            </TerminalPanel>
          </motion.div>
        </div>
      </div>
    </ScrollSection>
  )
}

export default ContactSection
