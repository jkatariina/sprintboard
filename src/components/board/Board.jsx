import { useState } from 'react'
import Column from './Column.jsx'
import ColumnForm from './ColumnForm.jsx'
import styles from './Board.module.css'

function Board() {
  const [columns, setColumns] = useState(['To do', 'Doing', 'Done'])

  function addColumn(title) {
    setColumns([...columns, title])
  }

  return (
    <div className={styles.board}>
      {columns.map((title) => (
        <Column key={title} title={title} />
      ))}

      <ColumnForm columns={columns} onAdd={addColumn} />
    </div>
  )
}

export default Board
