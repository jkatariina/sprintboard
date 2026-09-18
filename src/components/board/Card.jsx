import { useState } from 'react'
import Avatar from '../ui/Avatar.jsx'
import Badge from '../ui/Badge.jsx'
import Button from '../ui/Button.jsx'
import Modal from '../ui/Modal.jsx'
import CardForm from './CardForm.jsx'
import { isOverdue } from '../../utils/dates.js'
import styles from './Card.module.css'

function Card({ card, canMoveLeft, canMoveRight, onUpdate, onDelete, onMove }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)

  function close() {
    setIsOpen(false)
    setIsConfirming(false)
  }

  function save(changes) {
    onUpdate(card.id, changes)
    close()
  }

  function remove() {
    close()
    onDelete(card.id)
  }

  return (
    <article className={styles.card}>
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
            onClick={() => onMove(card.id, -1)}
            disabled={!canMoveLeft}
            aria-label={`Move ${card.title} to the previous column`}
          >
            ‹
          </button>

          <button
            type="button"
            className={styles.move}
            onClick={() => onMove(card.id, 1)}
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
    </article>
  )
}

export default Card
