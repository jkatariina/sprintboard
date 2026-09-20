import { useState } from 'react'
import { motion } from 'motion/react'
import Avatar from '../ui/Avatar.jsx'
import Badge from '../ui/Badge.jsx'
import Button from '../ui/Button.jsx'
import Modal from '../ui/Modal.jsx'
import CardForm from './CardForm.jsx'
import { useBoard } from '../../hooks/useBoard.js'
import { isOverdue } from '../../utils/dates.js'
import styles from './Card.module.css'

function Card({ card, canMoveLeft, canMoveRight }) {
  const { updateCard, deleteCard, moveCard } = useBoard()
  const [isOpen, setIsOpen] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)

  function close() {
    setIsOpen(false)
    setIsConfirming(false)
  }

  function save(changes) {
    updateCard(card.id, changes)
    close()
  }

  function remove() {
    close()
    deleteCard(card.id)
  }

  return (
    <motion.article
      layout
      className={styles.card}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.18 }}
    >
      <button
        type="button"
        className={styles.open}
        onClick={() => setIsOpen(true)}
      >
        <span className={styles.title}>{card.title}</span>

        {(card.label || card.assignee) && (
          <span className={styles.row}>
            {card.label && <Badge variant="accent">{card.label}</Badge>}

            {card.assignee && (
              <span className={styles.assignee}>
                <Avatar name={card.assignee} />
              </span>
            )}
          </span>
        )}
      </button>

      <div className={styles.moves}>
        {card.dueDate && (
          <Badge variant={isOverdue(card.dueDate) ? 'danger' : 'neutral'}>
            {card.dueDate}
          </Badge>
        )}

        <span className={styles.arrows}>
          <button
            type="button"
            className={styles.move}
            onClick={() => moveCard(card.id, -1)}
            disabled={!canMoveLeft}
            aria-label={`Move ${card.title} to the previous column`}
          >
            ‹
          </button>

          <button
            type="button"
            className={styles.move}
            onClick={() => moveCard(card.id, 1)}
            disabled={!canMoveRight}
            aria-label={`Move ${card.title} to the next column`}
          >
            ›
          </button>
        </span>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={close}
        title={isConfirming ? 'Delete card?' : 'Card details'}
      >
        {isConfirming ? (
          <div className={styles.confirm}>
            <p>{card.title} will be removed from the board.</p>

            <div className={styles.actions}>
              <Button onClick={() => setIsConfirming(false)}>Cancel</Button>
              <Button variant="danger" onClick={remove}>
                Delete card
              </Button>
            </div>
          </div>
        ) : (
          <CardForm
            card={card}
            onSave={save}
            onDelete={() => setIsConfirming(true)}
            onCancel={close}
          />
        )}
      </Modal>
    </motion.article>
  )
}

export default Card
