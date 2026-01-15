import { useState, useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react'

const roles = [
  'Full Stack Developer',
  'Frontend Engineer',
  'Backend Developer',
  'React Specialist',
  'Go Developer',
]

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const role = roles[currentRole]
    const timeout = isDeleting ? 40 : 80

    if (!isDeleting && displayedText === role) {
      const timer = setTimeout(() => setIsDeleting(true), 2500)
      return () => clearTimeout(timer)
    }

    if (isDeleting && displayedText === '') {
      // Use setTimeout to avoid synchronous state updates in effect
      const timer = setTimeout(() => {
        setIsDeleting(false)
        setCurrentRole((prev) => (prev + 1) % roles.length)
      }, 0)
      return () => clearTimeout(timer)
    }

    const timer = setTimeout(() => {
      setDisplayedText(
        isDeleting
          ? role.substring(0, displayedText.length - 1)
          : role.substring(0, displayedText.length + 1)
      )
    }, timeout)

    return () => clearTimeout(timer)
  }, [displayedText, isDeleting, currentRole])

  return (
    <section id="home" className="hero">
      <div className="hero-bg">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
      </div>

      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="status-available"
          onClick={(e) => {
            // Clear any text selection when clicking
            const selection = window.getSelection()
            if (selection) {
              selection.removeAllRanges()
            }
            // Blur to remove focus
            if (e.currentTarget.blur) {
              e.currentTarget.blur()
            }
          }}
        >
          <div className="status-dot-wrapper">
            <div className="status-dot" />
          </div>
          <span>Available for opportunities</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hero-title"
        >
          Hi, I'm <span className="text-gradient">Praveen Kumar</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hero-role"
        >
          <span className="text-accent">{'<'}</span>
          <span className="hero-role-text">{displayedText}</span>
          <span className="hero-cursor" />
          <span className="text-accent">{'/>'}</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hero-description"
        >
          Software Engineer at Shaadi.com building scalable web applications.
          Passionate about creating seamless user experiences and optimizing performance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="hero-cta"
        >
          <a href="#projects" className="btn btn-primary">
            View My Work
          </a>
          <a href="#contact" className="btn btn-secondary">
            Get In Touch
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="hero-socials"
        >
          <a
            href="https://github.com/Praveen-kumar0"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social-link"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/praveen-kumar0/"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social-link"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="mailto:praveen30032002@gmail.com"
            className="hero-social-link"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="hero-scroll"
      >
        <span>Scroll</span>
        <ChevronDown size={18} className="hero-scroll-icon" />
      </motion.div>
    </section>
  )
}

export default Hero
