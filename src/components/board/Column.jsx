import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Card from './Card.jsx'
import CardComposer from './CardComposer.jsx'
import Button from '../ui/Button.jsx'
import ErrorMessage from '../ui/ErrorMessage.jsx'
import Modal from '../ui/Modal.jsx'
import { useBoard } from '../../hooks/useBoard.js'
import { validateColumnTitle } from '../../utils/validation.js'
import styles from './Column.module.css'

function Column({ column, isFirst, isLast }) {
  const { columns, cards, query, renameColumn, deleteColumn, moveColumn } =
    useBoard()

  const columnCards = cards.filter((card) => {
    if (card.columnId !== column.id) {
      return false
    }

    if (query === '') {
      return true
    }

    return card.title.toLowerCase().includes(query.toLowerCase())
  })

  const [isEditing, setIsEditing] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [title, setTitle] = useState(column.title)
  const [error, setError] = useState('')

  function startEditing() {
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
    <motion.section layout className={styles.column}>
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
        <div className={styles.header}>
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
