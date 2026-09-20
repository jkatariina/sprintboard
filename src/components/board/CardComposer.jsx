import { useState } from 'react'
import Button from '../ui/Button.jsx'
import { useBoard } from '../../hooks/useBoard.js'
import styles from './CardComposer.module.css'

function CardComposer({ columnId }) {
  const { addCard } = useBoard()
  const [title, setTitle] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    addCard(columnId, title.trim())
    setTitle('')
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Add a card"
        aria-label="Card title"
      />

      <Button type="submit" disabled={title.trim() === ''}>
        Add
      </Button>
    </form>
  )
}

export default CardComposer
