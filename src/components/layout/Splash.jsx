import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import logoDark from '../../assets/logo-dark.svg'
import logoLight from '../../assets/logo-light.svg'
import { loadTheme } from '../../hooks/useTheme.js'
import styles from './Splash.module.css'

function Splash({ onDone }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 900)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {isVisible && (
        <motion.div
          className={styles.splash}
          exit={{ opacity: 0, transition: { duration: 0.22, delay: 0.5 } }}
        >
          <motion.img
            className={styles.logo}
            src={loadTheme() === 'dark' ? logoDark : logoLight}
            alt=""
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.6, ease: 'easeOut' },
            }}
            exit={{ opacity: 0, scale: 0.75, transition: { duration: 0.55 } }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Splash
