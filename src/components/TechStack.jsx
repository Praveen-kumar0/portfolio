// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code2, Layers, Wrench, Database } from 'lucide-react'
import TiltCard from './TiltCard'

const technologies = [
  { name: 'JavaScript', icon: '⚡' },
  { name: 'React', icon: '⚛️' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Go', icon: '🔵' },
  { name: 'TypeScript', icon: '🔷' },
  { name: 'Python', icon: '🐍' },
  { name: 'MySQL', icon: '🐬' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'Redis', icon: '🔴' },
  { name: 'AWS', icon: '☁️' },
  { name: 'Docker', icon: '🐳' },
  { name: 'Git', icon: '📦' },
]

const skillCategories = [
  {
    title: 'Languages',
    icon: Code2,
    skills: [
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'GoLang', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg' },
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
      { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
    ],
  },
  {
    title: 'Frameworks',
    icon: Layers,
    skills: [
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Redux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg' },
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
    ],
  },
  {
    title: 'Databases',
    icon: Database,
    skills: [
      { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
    ],
  },
  {
    title: 'Tools',
    icon: Wrench,
    skills: [
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
      { name: 'Jira', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg' },
      { name: 'Kafka', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg' },
      { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg' },
    ],
  },
]

const TechStack = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="tech" className="section tech" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2 className="section-title">Technical Skills</h2>
          <div className="section-divider" />
        </motion.div>

        <div className="tech-marquee">
          <div className="tech-marquee-inner">
            {[...technologies, ...technologies].map((tech, index) => (
              <div 
                key={index} 
                className="tech-item"
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
                <span className="tech-item-icon">{tech.icon}</span>
                <span className="tech-item-name">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="tech-grid"
        >
          {skillCategories.map((category, index) => (
            <TiltCard key={index}>
              <h3 className="tech-category-title">
                <category.icon size={18} className="tech-category-icon" />
                {category.title}
              </h3>
              <div 
                className="tech-tags"
                onClick={() => {
                  // Clear any text selection when clicking tech tags
                  const selection = window.getSelection()
                  if (selection) {
                    selection.removeAllRanges()
                  }
                }}
              >
                {category.skills.map((skill) => (
                  <span 
                    key={skill.name} 
                    className="tag"
                    onClick={(e) => {
                      // Clear any text selection when clicking individual tag
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
                    <img 
                      src={skill.icon} 
                      alt={skill.name} 
                      className="tag-icon"
                      onError={(e) => { e.target.style.display = 'none' }}
                    />
                    {skill.name}
                  </span>
                ))}
              </div>
            </TiltCard>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default TechStack
