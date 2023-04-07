import { IBoardState } from '@/store/modules/board/types'

export const getBoards = (state: IBoardState) => state.boards
