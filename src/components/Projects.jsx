import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, Github, Folder, ChevronDown } from 'lucide-react'

const projects = [
  {
    title: 'RESTful API',
    summary: 'Full-featured REST API with authentication and JWT protection.',
    description:
      'Full-featured REST API with authentication, JWT route protection, CORS handling, and Mongoose validation. Includes user signup/login functionality.',
    tech: ['Node.js', 'Express.js', 'MongoDB', 'JWT'],
    year: '2022',
    github: 'https://github.com/Praveen-kumar0/RESTful-API',
    live: null,
  },
  {
    title: 'ChatGPT Clone',
    summary: 'Interactive AI chat application with OpenAI integration.',
    description:
      'Interactive AI chat application built with Vanilla JavaScript and OpenAI\'s ChatGPT API. Fast build setup using Vite.',
    tech: ['JavaScript', 'Express.js', 'OpenAI API', 'Vite'],
    year: '2022',
    github: 'https://github.com/Praveen-kumar0/ChatGPT-Clone',
    live: null,
  },
  {
    title: 'Calories Burnt Prediction',
    summary: 'ML model to predict calories burnt using XGBoost.',
    description:
      'Machine learning model using XGBoost algorithm to predict calories burnt based on various attributes. Deployed on cloud via Streamlit.',
    tech: ['Python', 'Sklearn', 'XGBoost', 'Streamlit'],
    year: '2023',
    github: 'https://github.com/Praveen-kumar0/Calories-Burnt-Prediction',
    live: null,
  },
  {
    title: 'Travelia',
    summary: 'Responsive travel website with mobile-first design.',
    description:
      'Responsive travel website built from scratch with mobile-first methodology. Features advanced grid/flex layouts and reusable styles.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    year: '2023',
    github: 'https://github.com/praveenk/travelia',
    live: null,
  },
]

const ProjectCard = ({ project, index, isInView }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div
        className={`card card-hover project-card ${isExpanded ? 'project-card-expanded' : ''}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="project-card-image">
          <Folder size={48} className="project-card-image-icon" />
          <span className="project-card-year badge">{project.year}</span>
          <div className="project-card-links">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card-link"
                aria-label="View on GitHub"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={18} />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card-link"
                aria-label="View live demo"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>

        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-description">
          {isExpanded ? project.description : project.summary}
        </p>

        <button className="card-expand-btn" style={{ marginBottom: 'var(--space-md)' }}>
          {isExpanded ? 'Show less' : 'View details'}
          <ChevronDown 
            size={16} 
            className={`card-expand-icon ${isExpanded ? 'expanded' : ''}`} 
          />
        </button>
        
        <div 
          className="project-card-tech"
          onClick={(e) => {
            e.stopPropagation()
            // Prevent card transform when clicking tech stack in expanded card
            if (isExpanded) {
              const card = e.currentTarget.closest('.project-card')
              if (card) {
                card.classList.add('tech-stack-clicked')
                setTimeout(() => {
                  card.classList.remove('tech-stack-clicked')
                }, 100)
              }
            }
          }}
        >
          {project.tech.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" className="section projects" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2 className="section-title">Projects</h2>
          <div className="section-divider" />
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="projects-cta"
        >
          <a
            href="https://github.com/Praveen-kumar0"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            <Github size={18} />
            View All Projects
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
