import styles from './ErrorMessage.module.css'

function ErrorMessage({ children }) {
  return (
    <p className={styles.error} role="alert">
      {children}
    </p>
  )
}

export default ErrorMessage
