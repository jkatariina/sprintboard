import { useState } from 'react'
import Avatar from '../components/ui/Avatar.jsx'
import Badge from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import ErrorMessage from '../components/ui/ErrorMessage.jsx'
import Modal from '../components/ui/Modal.jsx'
import Spinner from '../components/ui/Spinner.jsx'
import styles from './StyleguidePage.module.css'

function StyleguidePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div>
      <h2>UI components</h2>

      <h3>Badge</h3>

      <p className={styles.label}>Default</p>
      <div className={styles.row}>
        <Badge>3</Badge>
        <Badge>12</Badge>
      </div>

      <p className={styles.label}>Accent</p>
      <div className={styles.row}>
        <Badge variant="accent">Frontend</Badge>
        <Badge variant="accent">Backend</Badge>
      </div>

      <p className={styles.label}>Danger</p>
      <div className={styles.row}>
        <Badge variant="danger">Overdue</Badge>
      </div>

      <h3>Avatar</h3>

      <p className={styles.label}>Two names</p>
      <div className={styles.row}>
        <Avatar name="Jenna Virtanen" />
      </div>

      <p className={styles.label}>One name</p>
      <div className={styles.row}>
        <Avatar name="Jenna" />
      </div>

      <h3>Spinner</h3>

      <p className={styles.label}>Default</p>
      <div className={styles.row}>
        <Spinner />
      </div>

      <h3>ErrorMessage</h3>

      <p className={styles.label}>Default</p>
      <div className={styles.row}>
        <ErrorMessage>No repository found with that name</ErrorMessage>
      </div>

      <h3>EmptyState</h3>

      <p className={styles.label}>Title only</p>
      <div className={styles.row}>
        <EmptyState title="No cards yet" />
      </div>

      <p className={styles.label}>Title and description</p>
      <div className={styles.row}>
        <EmptyState
          title="Your board is empty"
          description="Create a column to get started."
        />
      </div>

      <p className={styles.label}>With a button</p>
      <div className={styles.row}>
        <EmptyState
          title="No cards match your filters"
          description="Try a different search."
        >
          <Button>Clear filters</Button>
        </EmptyState>
      </div>

      <h3>Button</h3>

      <p className={styles.label}>Secondary (default)</p>
      <div className={styles.row}>
        <Button>Cancel</Button>
        <Button disabled>Disabled</Button>
      </div>

      <p className={styles.label}>Primary</p>
      <div className={styles.row}>
        <Button variant="primary">Add card</Button>
        <Button variant="primary">Import selected</Button>
      </div>

      <p className={styles.label}>Danger</p>
      <div className={styles.row}>
        <Button variant="danger">Delete column</Button>
      </div>

      <h3>Modal</h3>

      <p className={styles.label}>Asking before something is deleted</p>
      <div className={styles.row}>
        <Button variant="danger" onClick={() => setIsModalOpen(true)}>
          Delete column
        </Button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Delete Doing?"
      >
        <p>This will also delete the 3 cards in it.</p>
        <div className={styles.row}>
          <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
          <Button variant="danger" onClick={() => setIsModalOpen(false)}>
            Delete column
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default StyleguidePage
