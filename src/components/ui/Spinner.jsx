import styles from './Spinner.module.css'

function Spinner({ label = 'Loading' }) {
  return <span className={styles.spinner} role="status" aria-label={label} />
}

export default Spinner
