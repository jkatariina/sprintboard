import styles from './Card.module.css'

function Card({ card }) {
  return <article className={styles.card}>{card.title}</article>
}

export default Card
