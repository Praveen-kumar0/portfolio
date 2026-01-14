import { useState, useRef } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from 'framer-motion'
import { Send, Mail, MapPin, ArrowUpRight } from 'lucide-react'
import emailjs from '@emailjs/browser'

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  // EmailJS configuration
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || ''
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || ''

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    try {
      // Check if EmailJS is configured
      if (!PUBLIC_KEY || !SERVICE_ID || !TEMPLATE_ID) {
        throw new Error('EmailJS is not configured. Please set up environment variables.')
      }

      // Initialize EmailJS (only needed once, but safe to call multiple times)
      if (PUBLIC_KEY && PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
        emailjs.init(PUBLIC_KEY)
      }
      
      const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'praveen30032002@gmail.com', // Your email
        }
      )
      
      if (result.status === 200) {
        setIsSubmitting(false)
        setSubmitted(true)
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setSubmitted(false), 3000)
      }
    } catch (err) {
      console.error('Email sending failed:', err)
      setIsSubmitting(false)
      setError('Failed to send message. Please try again or email me directly.')
      setTimeout(() => setError(null), 5000)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section id="contact" className="section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2 className="section-title">Get In Touch</h2>
          <div className="section-divider" />
        </motion.div>

        <div className="contact-grid">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="contact-info"
          >
            <div className="card card-hover">
              <h3 className="contact-info-title">Contact Info</h3>
              <div className="contact-info-items">
                <a href="mailto:praveen30032002@gmail.com" className="contact-info-item">
                  <div className="contact-info-icon">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="contact-info-label">Email</p>
                    <p className="contact-info-value">praveen30032002@gmail.com</p>
                  </div>
                  <ArrowUpRight size={16} style={{ marginLeft: 'auto', opacity: 0.5 }} />
                </a>

                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="contact-info-label">Location</p>
                    <p className="contact-info-value">Mumbai, India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card card-hover">
              <h3 className="contact-links-title">Quick Links</h3>
              <div className="contact-links">
                <a
                  href="https://github.com/Praveen-kumar0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary contact-link-btn"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/praveen-kumar0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary contact-link-btn"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="contact-form card card-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="your@email.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="form-textarea"
                  placeholder="Tell me about your project..."
                />
              </div>

              {error && (
                <div style={{
                  padding: 'var(--space-md)',
                  background: 'rgba(239, 68, 68, 0.15)',
                  color: '#ef4444',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: 'var(--space-md)',
                  fontSize: '0.875rem'
                }}>
                  {error}
                </div>
              )}

              <div className="form-submit">
                <button
                  type="submit"
                  disabled={isSubmitting || submitted}
                  className={`btn form-submit-btn ${submitted ? '' : 'btn-primary'}`}
                  style={submitted ? {
                    background: 'rgba(16, 185, 129, 0.15)',
                    color: '#10b981',
                    border: '1px solid rgba(16, 185, 129, 0.3)'
                  } : {}}
                >
                  {isSubmitting ? (
                    <span className="spinner" />
                  ) : submitted ? (
                    '✓ Message Sent!'
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      <style>{`
        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid currentColor;
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}

export default Contact
