import { useEffect, useState } from 'react'
import { BoardContext } from './boardContext.js'

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

export function BoardProvider({ children }) {
  const [columns, setColumns] = useState(loadColumns)
  const [cards, setCards] = useState(loadCards)
  const [query, setQuery] = useState('')
  const [labelFilter, setLabelFilter] = useState('')
  const [assigneeFilter, setAssigneeFilter] = useState('')

  function clearFilters() {
    setQuery('')
    setLabelFilter('')
    setAssigneeFilter('')
  }

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

  function moveColumn(id, direction) {
    const index = columns.findIndex((column) => column.id === id)
    const target = index + direction

    if (target < 0 || target >= columns.length) {
      return
    }

    const next = [...columns]
    next[index] = columns[target]
    next[target] = columns[index]
    setColumns(next)
  }

  function deleteColumn(id) {
    setColumns(columns.filter((column) => column.id !== id))
    setCards(cards.filter((card) => card.columnId !== id))
  }

  function addCard(columnId, title) {
    setCards([...cards, { id: crypto.randomUUID(), columnId, title }])
  }

  function importIssues(columnId, issues) {
    const imported = issues
      .filter((issue) => !cards.some((card) => card.id === `gh-${issue.id}`))
      .map((issue) => ({
        id: `gh-${issue.id}`,
        columnId,
        title: issue.title,
        description: issue.body ? issue.body.slice(0, 500) : '',
        label: issue.labels[0] ? issue.labels[0].name : '',
        assignee: issue.user.login,
        dueDate: '',
        githubUrl: issue.html_url,
        githubNumber: issue.number,
      }))

    setCards([...cards, ...imported])

    return imported.length
  }

  function updateCard(id, changes) {
    setCards(
      cards.map((card) => (card.id === id ? { ...card, ...changes } : card)),
    )
  }

  function deleteCard(id) {
    setCards(cards.filter((card) => card.id !== id))
  }

  function moveCard(id, direction) {
    const card = cards.find((item) => item.id === id)
    const index = columns.findIndex((column) => column.id === card.columnId)
    const target = columns[index + direction]

    if (!target) {
      return
    }

    updateCard(id, { columnId: target.id })
  }

  const value = {
    columns,
    cards,
    query,
    setQuery,
    labelFilter,
    setLabelFilter,
    assigneeFilter,
    setAssigneeFilter,
    clearFilters,
    addColumn,
    renameColumn,
    moveColumn,
    deleteColumn,
    addCard,
    importIssues,
    updateCard,
    deleteCard,
    moveCard,
  }

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
}
