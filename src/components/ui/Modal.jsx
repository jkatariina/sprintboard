import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import styles from './Modal.module.css'

function Modal({ isOpen, onClose, title, children }) {
  const panel = useRef(null)
  const opener = useRef(null)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    opener.current = document.activeElement
    panel.current.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab') {
        return
      }

      const focusable = panel.current.querySelectorAll(
        'button, input, textarea, select, a[href]',
      )

      if (focusable.length === 0) {
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      }

      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)

      if (opener.current) {
        opener.current.focus()
      }
    }
  }, [isOpen, onClose])

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={panel}
            tabIndex={-1}
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            onClick={(event) => event.stopPropagation()}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
          >
            <h3 className={styles.title}>{title}</h3>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

export default Modal
