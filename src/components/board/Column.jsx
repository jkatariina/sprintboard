import styles from './Column.module.css'

function Column({ title }) {
  return (
    <section className={styles.column}>
      <h2 className={styles.title}>{title}</h2>
    </section>
  )
}

export default Column
