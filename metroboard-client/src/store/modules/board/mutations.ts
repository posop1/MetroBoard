import { IBoard, IBoardState } from '@/store/modules/board/types'

export const setBoards = (state: IBoardState, payload: { boards: IBoard[]; status: string }) => {
  state.boards = payload.boards
  state.status = payload.status
}

export const createBoard = (state: IBoardState, payload: { board: IBoard; status: string }) => {
  state.boards.push(payload.board)
  state.status = payload.status
}

export const removeBoard = (state: IBoardState, payload: { boardId: string; status: string }) => {
  const index = state.boards.findIndex((board) => board._id === payload.boardId)
  state.boards.splice(index, 1)
  state.status = payload.status
}

export const updateBoard = (state: IBoardState, payload: { board: IBoard; status: string }) => {
  const index = state.boards.findIndex((column) => column._id === payload.board._id)
  state.boards[index] = payload.board
}
