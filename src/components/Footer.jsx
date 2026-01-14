import { Github, Linkedin, Mail } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-copy">
            <span>© {currentYear}</span>
            <span className="footer-copy-name text-gradient">Praveen Kumar</span>
            <span>•</span>
            <span>All rights reserved</span>
          </div>

          <div className="footer-socials">
            <a
              href="https://github.com/Praveen-kumar0"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/praveen-kumar0/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:praveen30032002@gmail.com"
              className="footer-social-link"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--space-lg)' }}>
          <a href="#home" className="footer-back-top">
            ↑ Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
