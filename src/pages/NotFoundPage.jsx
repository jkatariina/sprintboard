import { Link } from 'react-router-dom'
import styles from './NotFoundPage.module.css'

function NotFoundPage() {
  return (
    <section className={styles.page}>
      <p className={styles.code}>404</p>

      <h2 className={styles.title}>Page not found</h2>

      <p className={styles.text}>There is nothing at this address.</p>

      <Link to="/" className={styles.link}>
        Back to the board
      </Link>
    </section>
  )
}

export default NotFoundPage
