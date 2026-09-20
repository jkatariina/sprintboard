import { useContext } from 'react'
import { BoardContext } from '../context/boardContext.js'

export function useBoard() {
  const board = useContext(BoardContext)

  if (board === null) {
    throw new Error('useBoard must be used inside a BoardProvider')
  }

  return board
}
