import { useState } from 'react'
import Button from '../ui/Button.jsx'
import ErrorMessage from '../ui/ErrorMessage.jsx'
import { useBoard } from '../../hooks/useBoard.js'
import { validateColumnTitle } from '../../utils/validation.js'
import styles from './ColumnForm.module.css'

function ColumnForm() {
  const { columns, addColumn } = useBoard()
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const message = validateColumnTitle(title, columns)

    if (message) {
      setError(message)
      return
    }

    addColumn(title.trim())
    setTitle('')
    setError('')
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <input
        className={styles.input}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        onBlur={() => setError('')}
        placeholder="Column name"
        aria-label="Column name"
      />

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Button type="submit" variant="primary">
        Add column
      </Button>
    </form>
  )
}

export default ColumnForm
