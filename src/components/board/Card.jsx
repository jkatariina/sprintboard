import { useState } from 'react'
import Avatar from '../ui/Avatar.jsx'
import Badge from '../ui/Badge.jsx'
import Modal from '../ui/Modal.jsx'
import CardForm from './CardForm.jsx'
import styles from './Card.module.css'

function Card({ card, onUpdate }) {
  const [isOpen, setIsOpen] = useState(false)

  const hasDetails = card.label || card.assignee || card.dueDate

  function close() {
    setIsOpen(false)
  }

  function save(changes) {
    onUpdate(card.id, changes)
    close()
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

      <Modal isOpen={isOpen} onClose={close} title="Card details">
        <CardForm card={card} onSave={save} onCancel={close} />
      </Modal>
    </>
  )
}

export default Card
