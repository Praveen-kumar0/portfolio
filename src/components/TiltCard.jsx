import { useRef, useState, useEffect } from 'react'

const TiltCard = ({ 
  children, 
  className = '', 
  onClick,
  style = {}
}) => {
  const cardRef = useRef(null)
  const [transform, setTransform] = useState('')
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    // Detect if device supports touch
    const timer = setTimeout(() => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  const handleMouseMove = (e) => {
    // Disable tilt on touch devices
    if (isTouchDevice || !cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Calculate rotation based on mouse position
    const rotateX = ((y - centerY) / centerY) * -10
    const rotateY = ((x - centerX) / centerX) * 10

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`)
  }

  const handleMouseLeave = () => {
    if (!isTouchDevice) {
      setTransform('')
    }
  }

  return (
    <div
      ref={cardRef}
      className={`card card-tilt ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        ...style,
        transform: isTouchDevice ? 'none' : (transform || 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'),
        transition: isTouchDevice ? 'box-shadow 0.3s ease' : (transform ? 'none' : 'transform 0.5s ease-out, box-shadow 0.3s ease')
      }}
    >
      {children}
    </div>
  )
}

export default TiltCard
