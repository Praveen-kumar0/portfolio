// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'

const Preloader = () => {
  return (
    <motion.div
      className="preloader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <motion.div
        className="preloader-logo text-gradient"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        PK
      </motion.div>
      <div className="preloader-bar">
        <div className="preloader-bar-inner" />
      </div>
    </motion.div>
  )
}

export default Preloader
