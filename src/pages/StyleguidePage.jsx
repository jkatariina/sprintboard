import Avatar from '../components/ui/Avatar.jsx'
import Badge from '../components/ui/Badge.jsx'
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
    </div>
  )
}

export default StyleguidePage
