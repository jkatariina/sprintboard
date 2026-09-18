import { useState } from 'react'
import Button from '../ui/Button.jsx'
import ErrorMessage from '../ui/ErrorMessage.jsx'
import styles from './CardForm.module.css'

function CardForm({ card, onSave, onCancel }) {
  const [title, setTitle] = useState(card.title)
  const [description, setDescription] = useState(card.description ?? '')
  const [label, setLabel] = useState(card.label ?? '')
  const [assignee, setAssignee] = useState(card.assignee ?? '')
  const [dueDate, setDueDate] = useState(card.dueDate ?? '')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (title.trim() === '') {
      setError('Give the card a title')
      return
    }

    onSave({
      title: title.trim(),
      description: description.trim(),
      label: label.trim(),
      assignee: assignee.trim(),
      dueDate,
    })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <label className={styles.field}>
        <span className={styles.label}>Title</span>
        <input
          className={styles.input}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Description</span>
        <textarea
          className={styles.textarea}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={3}
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Label</span>
        <input
          className={styles.input}
          value={label}
          onChange={(event) => setLabel(event.target.value)}
          placeholder="Add a label"
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Assignee</span>
        <input
          className={styles.input}
          value={assignee}
          onChange={(event) => setAssignee(event.target.value)}
          placeholder="Add a name"
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Due date</span>
        <input
          className={styles.input}
          type="date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
        />
      </label>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div className={styles.actions}>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="primary">
          Save
        </Button>
      </div>
    </form>
  )
}

export default CardForm
