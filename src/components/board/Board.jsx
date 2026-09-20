import Column from './Column.jsx'
import ColumnForm from './ColumnForm.jsx'
import { useBoard } from '../../hooks/useBoard.js'
import styles from './Board.module.css'

function Board() {
  const { columns } = useBoard()

  return (
    <div className={styles.board}>
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
