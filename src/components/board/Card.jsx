import { useState } from 'react'
import Avatar from '../ui/Avatar.jsx'
import Badge from '../ui/Badge.jsx'
import Button from '../ui/Button.jsx'
import Modal from '../ui/Modal.jsx'
import CardForm from './CardForm.jsx'
import styles from './Card.module.css'

function Card({ card, onUpdate, onDelete }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)

  const hasDetails = card.label || card.assignee || card.dueDate

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
    <>
      <button
        type="button"
        className={styles.card}
        onClick={() => setIsOpen(true)}
      >
        <span className={styles.title}>{card.title}</span>

        {hasDetails && (
          <span className={styles.details}>
            {card.label && (
              <span className={styles.row}>
                <Badge variant="accent">{card.label}</Badge>
              </span>
            )}

            {(card.dueDate || card.assignee) && (
              <span className={styles.row}>
                {card.dueDate && <Badge>{card.dueDate}</Badge>}

                {card.assignee && (
                  <span className={styles.assignee}>
                    <Avatar name={card.assignee} />
                  </span>
                )}
              </span>
            )}
          </span>
        )}
      </button>

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
    </>
  )
}

export default Card
