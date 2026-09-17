import Column from './Column.jsx'
import styles from './Board.module.css'

const columns = ['To do', 'Doing', 'Done']

function Board() {
  return (
    <div className={styles.board}>
      {columns.map((title) => (
        <Column key={title} title={title} />
      ))}
    </div>
  )
}

export default Board
