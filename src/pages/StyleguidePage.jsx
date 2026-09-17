import Avatar from '../components/ui/Avatar.jsx'
import Badge from '../components/ui/Badge.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import ErrorMessage from '../components/ui/ErrorMessage.jsx'
import Spinner from '../components/ui/Spinner.jsx'
import styles from './StyleguidePage.module.css'

function StyleguidePage() {
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
          <button type="button">Clear filters</button>
        </EmptyState>
      </div>
    </div>
  )
}

export default StyleguidePage
