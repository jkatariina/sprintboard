import { useState } from 'react'
import Column from './Column.jsx'
import ColumnForm from './ColumnForm.jsx'
import styles from './Board.module.css'

const initialColumns = ['To do', 'Doing', 'Done'].map((title) => ({
  id: crypto.randomUUID(),
  title,
}))

function Board() {
  const [columns, setColumns] = useState(initialColumns)

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

  return (
    <div className={styles.board}>
      {columns.map((column) => (
        <Column
          key={column.id}
          column={column}
          columns={columns}
          onRename={renameColumn}
        />
      ))}

      <ColumnForm columns={columns} onAdd={addColumn} />
    </div>
  )
}

export default Board
