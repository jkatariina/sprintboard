import { useState } from 'react'
import ErrorMessage from '../ui/ErrorMessage.jsx'
import { validateColumnTitle } from '../../utils/validation.js'
import styles from './Column.module.css'

function Column({ column, columns, onRename }) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(column.title)
  const [error, setError] = useState('')

  function startEditing() {
    setTitle(column.title)
    setError('')
    setIsEditing(true)
  }

  function cancelEditing() {
    setTitle(column.title)
    setError('')
    setIsEditing(false)
  }

  function save(event) {
    event.preventDefault()

    const message = validateColumnTitle(title, columns, column.id)

    if (message) {
      setError(message)
      return
    }

    onRename(column.id, title.trim())
    setError('')
    setIsEditing(false)
  }

  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      cancelEditing()
    }
  }

  return (
    <section className={styles.column}>
      {isEditing ? (
        <form className={styles.form} onSubmit={save}>
          <input
            className={styles.input}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            onBlur={save}
            onKeyDown={handleKeyDown}
            autoFocus
            aria-label="Column name"
          />

          {error && <ErrorMessage>{error}</ErrorMessage>}
        </form>
      ) : (
        <button type="button" className={styles.title} onClick={startEditing}>
          {column.title}
        </button>
      )}
    </section>
  )
}

export default Column
