import { useEffect, useState } from 'react'
import Column from './Column.jsx'
import ColumnForm from './ColumnForm.jsx'
import styles from './Board.module.css'

const columnsKey = 'sprintboard.board.v1'
const cardsKey = 'sprintboard.cards.v1'

function createDefaultColumns() {
  return ['To do', 'Doing', 'Done'].map((title) => ({
    id: crypto.randomUUID(),
    title,
  }))
}

function loadColumns() {
  const saved = localStorage.getItem(columnsKey)

  if (saved === null) {
    return createDefaultColumns()
  }

  try {
    return JSON.parse(saved)
  } catch {
    return createDefaultColumns()
  }
}

function loadCards() {
  const saved = localStorage.getItem(cardsKey)

  if (saved === null) {
    return []
  }

  try {
    return JSON.parse(saved)
  } catch {
    return []
  }
}

function Board() {
  const [columns, setColumns] = useState(loadColumns)
  const [cards, setCards] = useState(loadCards)

  useEffect(() => {
    localStorage.setItem(columnsKey, JSON.stringify(columns))
  }, [columns])

  useEffect(() => {
    localStorage.setItem(cardsKey, JSON.stringify(cards))
  }, [cards])

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
    setCards(cards.filter((card) => card.columnId !== id))
  }

  function addCard(columnId, title) {
    setCards([...cards, { id: crypto.randomUUID(), columnId, title }])
  }

  function deleteCard(id) {
    setCards(cards.filter((card) => card.id !== id))
  }

  function updateCard(id, changes) {
    setCards(cards.map((card) => (card.id === id ? { ...card, ...changes } : card)))
  }

  return (
    <div className={styles.board}>
      {columns.map((column) => (
        <Column
          key={column.id}
          column={column}
          columns={columns}
          cards={cards.filter((card) => card.columnId === column.id)}
          onRename={renameColumn}
          onDelete={deleteColumn}
          onAddCard={addCard}
          onUpdateCard={updateCard}
          onDeleteCard={deleteCard}
        />
      ))}

      <ColumnForm columns={columns} onAdd={addColumn} />
    </div>
  )
}

export default Board
