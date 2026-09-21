import Button from '../ui/Button.jsx'
import { useBoard } from '../../hooks/useBoard.js'
import styles from './FilterBar.module.css'

function getLabels(cards) {
  const labels = []

  for (const card of cards) {
    if (card.label && !labels.includes(card.label)) {
      labels.push(card.label)
    }
  }

  return labels
}

function getAssignees(cards) {
  const assignees = []

  for (const card of cards) {
    if (card.assignee && !assignees.includes(card.assignee)) {
      assignees.push(card.assignee)
    }
  }

  return assignees
}

function FilterBar() {
  const {
    cards,
    query,
    labelFilter,
    setLabelFilter,
    assigneeFilter,
    setAssigneeFilter,
    clearFilters,
  } = useBoard()

  const labels = getLabels(cards)
  const assignees = getAssignees(cards)

  const isFiltering = query !== '' || labelFilter !== '' || assigneeFilter !== ''

  return (
    <div className={styles.bar}>
      <label className={styles.field}>
        <span className={styles.label}>Label</span>

        <select
          className={styles.input}
          value={labelFilter}
          onChange={(event) => setLabelFilter(event.target.value)}
        >
          <option value="">All</option>

          {labels.map((label) => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Assignee</span>

        <select
          className={styles.input}
          value={assigneeFilter}
          onChange={(event) => setAssigneeFilter(event.target.value)}
        >
          <option value="">Anyone</option>

          {assignees.map((assignee) => (
            <option key={assignee} value={assignee}>
              {assignee}
            </option>
          ))}
        </select>
      </label>

      {isFiltering && <Button onClick={clearFilters}>Clear filters</Button>}
    </div>
  )
}

export default FilterBar
