import Column from './Column.jsx'
import ColumnForm from './ColumnForm.jsx'
import Button from '../ui/Button.jsx'
import EmptyState from '../ui/EmptyState.jsx'
import { useBoard } from '../../hooks/useBoard.js'
import styles from './Board.module.css'

function Board() {
  const { columns, visibleCards, isFiltering, isDragging, clearFilters } =
    useBoard()


  if (isFiltering && visibleCards.length === 0) {
    return (
      <EmptyState
        title="No cards match your filters"
        description="Try a different search, or clear the filters to see everything."
      >
        <Button onClick={clearFilters}>Clear filters</Button>
      </EmptyState>
    )
  }

  if (columns.length === 0) {
    return (
      <div className={styles.boardEmpty}>
        <ColumnForm />

        <div className={styles.message}>
          <p className={styles.messageTitle}>Your board is empty</p>
          <p className={styles.messageText}>Create a column to get started.</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={styles.board}
      data-dragging={isDragging ? 'true' : undefined}
    >
      {columns.map((column, index) => (
        <Column
          key={column.id}
          column={column}
          isFirst={index === 0}
          isLast={index === columns.length - 1}
        />
      ))}

      <ColumnForm />
    </div>
  )
}

export default Board
