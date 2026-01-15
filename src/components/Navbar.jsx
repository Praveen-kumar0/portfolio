import { useState, useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Skills', href: '#tech' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset'
  }, [isMobileMenuOpen])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}
      >
        <div className="container">
          <div className="navbar-inner">
            <a href="#home" className="navbar-logo text-gradient">
              PK
            </a>

            <div className="navbar-links">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="navbar-link">
                  {link.name}
                </a>
              ))}
            </div>

            <a
              href="https://drive.google.com/file/d/1gA8p7lpIxNJOmm58_yZrKlxY3qd5Mj8L/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="navbar-cta btn btn-primary"
            >
              Resume
            </a>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`navbar-toggle ${isMobileMenuOpen ? 'active' : ''}`}
              aria-label="Toggle menu"
            >
              <span className="navbar-toggle-bar" />
              <span className="navbar-toggle-bar" />
              <span className="navbar-toggle-bar" />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mobile-menu"
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="mobile-menu-link"
              >
                {link.name}
              </motion.a>
            ))}
            <motion.a
              href="https://drive.google.com/file/d/1gA8p7lpIxNJOmm58_yZrKlxY3qd5Mj8L/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="btn btn-primary"
              style={{ marginTop: '1rem' }}
            >
              Resume
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
