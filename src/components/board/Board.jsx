import { useEffect, useState } from 'react'
import Column from './Column.jsx'
import ColumnForm from './ColumnForm.jsx'
import styles from './Board.module.css'

const storageKey = 'sprintboard.board.v1'

function createDefaultColumns() {
  return ['To do', 'Doing', 'Done'].map((title) => ({
    id: crypto.randomUUID(),
    title,
  }))
}

function loadColumns() {
  const saved = localStorage.getItem(storageKey)

  if (saved === null) {
    return createDefaultColumns()
  }

  try {
    return JSON.parse(saved)
  } catch {
    return createDefaultColumns()
  }
}

function Board() {
  const [columns, setColumns] = useState(loadColumns)

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(columns))
  }, [columns])

  function addColumn(title) {
    setColumns([...columns, { id: crypto.randomUUID(), title }])
  }

  function renameColumn(id, title) {
    setColumns(
      columns.map((column) =>
        column.id === id ? { ...column, title } : column,
      ),
    )
  }

  function deleteColumn(id) {
    setColumns(columns.filter((column) => column.id !== id))
  }

  return (
    <div className={styles.board}>
      {columns.map((column) => (
        <Column
          key={column.id}
          column={column}
          columns={columns}
          onRename={renameColumn}
          onDelete={deleteColumn}
        />
      ))}

      <ColumnForm columns={columns} onAdd={addColumn} />
    </div>
  )
}

export default Board
