import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { Building2, Calendar, MapPin, ChevronRight, X, GraduationCap } from 'lucide-react'

const experiences = [
  {
    role: 'Software Engineer I',
    company: 'Shaadi.com',
    location: 'Mumbai, India',
    period: 'July 2024 - Present',
    current: true,
    tech: ['React', 'Go', 'JavaScript', 'Node.js', 'PHP', 'MySQL', 'Redis', 'AWS', 'Datadog'],
    summary: 'Building scalable web applications and leading key feature developments for India\'s leading matchmaking platform.',
    highlights: [
      'Passport Verification: Built end-to-end passport-based verification flow, developing UI and integrating backend APIs with bureau services to improve verification success rates.',
      'Search: Revamped search UI with reusable components and bottom sheets using MUI boosting user experience; Premiumized filters, added dynamic promo cards in swipe cards and gamified nudges.',
      'Payments: Restructured and optimized Payment page into a modular, data-driven flow using reusable components and dynamic plan rendering. Built premium vs free comparison layer; Developed payment fishnet to recover drop-offs.',
      'Service Migrations: Migrated Inbox and Tracking endpoints from monolith to Go microservices (REST APIs), improving latency by 80%, scalability and significantly offloading high-volume traffic.',
      'Photo Album Premiumization: Led album view premiumization with time-bound free access; implemented privacy-aware gating logic, Redis + Redux–driven eligibility checks, and contextual upgrade nudges with gamification.',
      'Enhanced UI/UX: Redesigned mobile navigation to match native app experience, moved sub-navigation to bottom, integrated smooth animations, standardized headers, and optimized redirection flows.',
      'Registration: Integrated payments into registration flow, driving 7% monetization boost; Built redesigned flow with auto-advancing bottom sheet using React Final Form, reducing friction and improving completion rates.',
    ],
  },
  {
    role: 'Web Developer Intern',
    company: 'Hackveda',
    location: 'Remote',
    period: 'Dec 2023 - May 2024',
    current: false,
    tech: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'PHP', 'MySQL', 'Adalo'],
    summary: 'Developed full-stack web applications and led documentation efforts for enterprise projects.',
    highlights: [
      'Developed a Doctor Search Website with HTML, CSS and JavaScript. Used MySQL and PHP for backend.',
      'Led planning & documentation for a Real-Time Stock Market Data Web App; created synopses and Gantt charts.',
      'Built responsive Adalo web apps with custom themes, navigation flows, form handling, & dynamic data visualizations.',
      'Designed Wellness Synergy Platform scope: defined user roles, features, and professional documentation for stakeholder presentations.',
    ],
  },
  {
    role: 'Web Developer Intern',
    company: 'DRDO',
    location: 'Gwalior, India',
    period: 'May 2023 - July 2023',
    current: false,
    tech: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'PHP', 'AJAX', 'MySQL'],
    summary: 'Developed and deployed a Library Management System for government use with role-based access.',
    highlights: [
      'Developed & deployed Hindi Library Management System on DRDO\'s Drona server with user and admin roles.',
      'Enabled book search, detail viewing, and issue status tracking for users; added CRUD operations, issue/return management for admins.',
      'Implemented asynchronous search and real-time backend form validation for a faster user experience.',
    ],
  },
]

const ExperienceCard = ({ exp, index, isInView, onViewDetails, cardRef }) => {
  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    onViewDetails(exp, rect)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <div
        className="card card-hover experience-card"
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      >
        {exp.current && (
          <div className="experience-current-badge">
            <span className="experience-current-dot" />
            Current
          </div>
        )}

        <div className="experience-card-header">
          <h3 className="experience-card-title">{exp.role}</h3>
          <div className="experience-card-company">
            <Building2 size={16} />
            <span>{exp.company}</span>
            {exp.team && <span style={{ opacity: 0.6 }}>• {exp.team}</span>}
          </div>
        </div>

        <div className="experience-card-meta">
          <span className="experience-card-meta-item">
            <Calendar size={14} />
            {exp.period}
          </span>
          <span className="experience-card-meta-item">
            <MapPin size={14} />
            {exp.location}
          </span>
        </div>

        <p style={{ 
          fontSize: '0.875rem', 
          color: 'var(--color-text-secondary)', 
          marginTop: 'var(--space-md)',
          lineHeight: 1.7 
        }}>
          {exp.summary}
        </p>

        <button className="card-expand-btn">
          View details
          <ChevronRight size={16} />
        </button>
      </div>
    </motion.div>
  )
}

const ExperienceModal = ({ exp, onClose, originRect }) => {
  if (!exp) return null

  // Calculate the starting position based on the clicked card
  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1024
  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 768
  
  // Calculate center position for the final modal
  const modalWidth = Math.min(700, windowWidth - 32)
  const modalHeight = Math.min(windowHeight * 0.85, 600)
  
  // Calculate scale and position for animation from card
  const scaleX = originRect ? originRect.width / modalWidth : 0.5
  const scaleY = originRect ? originRect.height / modalHeight : 0.5
  const scale = Math.max(scaleX, scaleY)
  
  // Calculate the offset from center to the card position
  const centerX = windowWidth / 2
  const centerY = windowHeight / 2
  const cardCenterX = originRect ? originRect.left + originRect.width / 2 : centerX
  const cardCenterY = originRect ? originRect.top + originRect.height / 2 : centerY
  const offsetX = cardCenterX - centerX
  const offsetY = cardCenterY - centerY

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-content"
        initial={{ 
          opacity: 0, 
          scale: scale,
          x: offsetX,
          y: offsetY
        }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          x: 0,
          y: 0
        }}
        exit={{ 
          opacity: 0, 
          scale: scale,
          x: offsetX,
          y: offsetY
        }}
        transition={{ 
          type: 'spring', 
          damping: 25, 
          stiffness: 300,
          duration: 0.4
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-scroll-content">
          {exp.current && (
            <div className="experience-current-badge" style={{ position: 'static', marginBottom: 'var(--space-md)', display: 'inline-flex', width: 'auto' }}>
              <span className="experience-current-dot" />
              Current Position
            </div>
          )}

          <h2 className="modal-title">{exp.role}</h2>
          
          <div className="experience-card-company" style={{ marginBottom: 'var(--space-md)' }}>
            <Building2 size={18} />
            <span style={{ fontSize: '1.1rem' }}>{exp.company}</span>
            {exp.team && <span style={{ opacity: 0.6 }}>• {exp.team}</span>}
          </div>

          <div className="experience-card-meta" style={{ marginBottom: 'var(--space-lg)' }}>
            <span className="experience-card-meta-item">
              <Calendar size={14} />
              {exp.period}
            </span>
            <span className="experience-card-meta-item">
              <MapPin size={14} />
              {exp.location}
            </span>
          </div>

          <p style={{ 
            fontSize: '1rem', 
            color: 'var(--color-text-secondary)', 
            marginBottom: 'var(--space-lg)',
            lineHeight: 1.8 
          }}>
            {exp.summary}
          </p>

          <div className="modal-section">
            <h4 className="modal-section-title">Technologies Used</h4>
            <div className="experience-card-tech">
              {exp.tech.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>

          <div className="modal-section">
            <h4 className="modal-section-title">Key Achievements</h4>
            <ul className="experience-card-highlights">
              {exp.highlights.map((highlight, i) => (
                <li key={i} className="experience-card-highlight">
                  <ChevronRight size={16} className="experience-card-highlight-icon" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const Experience = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedExp, setSelectedExp] = useState(null)
  const [originRect, setOriginRect] = useState(null)

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedExp) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedExp])

  const handleViewDetails = (exp, rect) => {
    setOriginRect(rect)
    setSelectedExp(exp)
  }

  const handleClose = () => {
    setSelectedExp(null)
  }

  return (
    <section id="experience" className="section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2 className="section-title">Work Experience</h2>
          <div className="section-divider" />
        </motion.div>

        <div className="experience-grid">
          {experiences.map((exp, index) => (
            <ExperienceCard 
              key={index} 
              exp={exp} 
              index={index} 
              isInView={isInView}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {/* Education Section */}
        <div className="education-section">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="section-header"
          >
            <h2 className="section-title">Education</h2>
            <div className="section-divider" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="card card-hover education-card">
              <div className="education-icon-wrapper">
                <div className="education-icon">
                  <GraduationCap size={40} />
                </div>
              </div>
              <div className="education-content">
                <h4 className="education-degree">Bachelor of Technology (B.Tech)</h4>
                <p className="education-field">Computer Engineering</p>
                <p className="education-school">
                  NMIMS Mukesh Patel School of Technology Management and Engineering
                </p>
                <div className="education-stats">
                  <div className="education-stat">
                    <div className="education-stat-value">3.53</div>
                    <div className="education-stat-label">CGPA</div>
                  </div>
                  <div className="education-stat">
                    <div className="education-stat-value">2024</div>
                    <div className="education-stat-label">Graduated</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedExp && (
          <ExperienceModal 
            exp={selectedExp} 
            onClose={handleClose} 
            originRect={originRect}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default Experience
