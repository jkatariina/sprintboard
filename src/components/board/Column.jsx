import { useRef, useState } from 'react'
import { AnimatePresence, motion, useDragControls } from 'motion/react'
import Card from './Card.jsx'
import CardComposer from './CardComposer.jsx'
import Button from '../ui/Button.jsx'
import ErrorMessage from '../ui/ErrorMessage.jsx'
import Modal from '../ui/Modal.jsx'
import { useBoard } from '../../hooks/useBoard.js'
import { validateColumnTitle } from '../../utils/validation.js'
import styles from './Column.module.css'

const isSmallScreen = window.matchMedia('(max-width: 40rem)').matches

function Column({ column, index, isFirst, isLast }) {
  const {
    columns,
    visibleCards,
    renameColumn,
    deleteColumn,
    moveColumn,
    moveColumnTo,
  } = useBoard()

  const columnCards = visibleCards.filter((card) => card.columnId === column.id)

  const [isEditing, setIsEditing] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [title, setTitle] = useState(column.title)
  const [error, setError] = useState('')

  const dragControls = useDragControls()
  const dragged = useRef(false)

  function startDrag(event) {
    dragged.current = false
    dragControls.start(event)
  }

  function handleDragEnd(event) {
    const others = document.querySelectorAll('[data-column-id]')

    for (const node of others) {
      if (node.dataset.columnId === column.id) {
        continue
      }

      const rect = node.getBoundingClientRect()

      if (event.clientX >= rect.left && event.clientX <= rect.right) {
        moveColumnTo(column.id, node.dataset.columnId)
        return
      }
    }
  }

  function startEditing() {
    if (dragged.current) {
      return
    }

    setTitle(column.title)
    setError('')
    setIsEditing(true)
  }

  function cancelEditing() {
    setTitle(column.title)
    setError('')
    setIsEditing(false)
  }

  function save(event) {
    event.preventDefault()

    const message = validateColumnTitle(title, columns, column.id)

    if (message) {
      setError(message)
      return
    }

    renameColumn(column.id, title.trim())
    setError('')
    setIsEditing(false)
  }

  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      cancelEditing()
    }
  }

  function confirmDelete() {
    setIsConfirming(false)
    deleteColumn(column.id)
  }

  return (
    <motion.section
      layout
      className={styles.column}
      data-column-id={column.id}
      initial={isSmallScreen ? false : { opacity: 0, y: 12 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.35, delay: index * 0.09 },
      }}
      drag="x"
      dragListener={false}
      dragControls={dragControls}
      dragSnapToOrigin
      dragMomentum={false}
      dragElastic={0.2}
      whileDrag={{ scale: 1.02, zIndex: 10 }}
      onDragStart={() => {
        dragged.current = true
      }}
      onDragEnd={handleDragEnd}
    >
      {isEditing ? (
        <form className={styles.form} onSubmit={save}>
          <input
            className={styles.input}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            onBlur={save}
            onKeyDown={handleKeyDown}
            autoFocus
            aria-label="Column name"
          />

          {error && <ErrorMessage>{error}</ErrorMessage>}
        </form>
      ) : (
        <div
          className={styles.header}
          onPointerDown={startDrag}
          style={{ touchAction: 'none' }}
        >
          <button type="button" className={styles.title} onClick={startEditing}>
            {column.title}
          </button>

          <span className={styles.arrows}>
            <button
              type="button"
              className={styles.action}
              onClick={() => moveColumn(column.id, -1)}
              disabled={isFirst}
              aria-label={`Move ${column.title} left`}
            >
              ‹
            </button>

            <button
              type="button"
              className={styles.action}
              onClick={() => moveColumn(column.id, 1)}
              disabled={isLast}
              aria-label={`Move ${column.title} right`}
            >
              ›
            </button>
          </span>

          <button
            type="button"
            className={`${styles.action} ${styles.delete}`}
            onClick={() => setIsConfirming(true)}
            aria-label={`Delete ${column.title}`}
          >
            ×
          </button>
        </div>
      )}

      <div className={styles.cards}>
        <AnimatePresence initial={false}>
          {columnCards.map((card) => (
            <Card
              key={card.id}
              card={card}
              canMoveLeft={!isFirst}
              canMoveRight={!isLast}
            />
          ))}
        </AnimatePresence>
      </div>

      <CardComposer columnId={column.id} />

      <Modal
        isOpen={isConfirming}
        onClose={() => setIsConfirming(false)}
        title={`Delete ${column.title}?`}
      >
        <p>The column will be removed from the board.</p>

        <div className={styles.actions}>
          <Button onClick={() => setIsConfirming(false)}>Cancel</Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete column
          </Button>
        </div>
      </Modal>
    </motion.section>
  )
}

export default Column
