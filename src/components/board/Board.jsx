import { useEffect, useRef } from 'react'
import Column from './Column.jsx'
import ColumnForm from './ColumnForm.jsx'
import Button from '../ui/Button.jsx'
import EmptyState from '../ui/EmptyState.jsx'
import { useBoard } from '../../hooks/useBoard.js'
import styles from './Board.module.css'

function Board() {
  const { columns, visibleCards, isFiltering, isDragging, clearFilters } =
    useBoard()

  const board = useRef(null)

  useEffect(() => {
    if (!isDragging) {
      return
    }

    const edge = 100
    const speed = 12
    let x = 0
    let y = 0

    function handlePointerMove(event) {
      const rect = board.current.getBoundingClientRect()

      if (event.clientX < rect.left + edge) {
        x = -1
      } else if (event.clientX > rect.right - edge) {
        x = 1
      } else {
        x = 0
      }

      if (event.clientY < edge) {
        y = -1
      } else if (event.clientY > window.innerHeight - edge) {
        y = 1
      } else {
        y = 0
      }
    }

    const timer = setInterval(() => {
      board.current.scrollLeft += x * speed
      window.scrollBy(0, y * speed)
    }, 16)

    document.addEventListener('pointermove', handlePointerMove)

    return () => {
      document.removeEventListener('pointermove', handlePointerMove)
      clearInterval(timer)
    }
  }, [isDragging])


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
      ref={board}
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
