import { useState } from 'react'
import Button from '../ui/Button.jsx'
import ErrorMessage from '../ui/ErrorMessage.jsx'
import styles from './ColumnForm.module.css'

function ColumnForm({ columns, onAdd }) {
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const name = title.trim()

    if (name === '') {
      setError('Give the column a name')
      return
    }

    const alreadyExists = columns.some(
      (column) => column.toLowerCase() === name.toLowerCase(),
    )

    if (alreadyExists) {
      setError(`There is already a column called ${name}`)
      return
    }

    onAdd(name)
    setTitle('')
    setError('')
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <input
        className={styles.input}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
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
