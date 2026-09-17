import styles from './EmptyState.module.css'

function EmptyState({ title, description, children }) {
  return (
    <div className={styles.empty}>
      <p className={styles.title}>{title}</p>
      {description && <p className={styles.description}>{description}</p>}
      {children}
    </div>
  )
}

export default EmptyState
