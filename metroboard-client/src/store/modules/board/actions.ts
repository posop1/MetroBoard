import { IActionsParams } from '@/types/common'
import api from '@/api/instance'
import { IBoard } from '@/store/modules/board/types'

export const fetchBoards = async ({ commit }: IActionsParams) => {
  try {
    const { data } = await api.get<IBoard[]>('/board')

    commit('setBoards', { boards: data, status: 'success' })
  } catch (error: any) {
    console.log(error)
    commit('setBoards', { boards: [], status: error.response?.data.message })
  }
}

export const createBoard = async ({ commit }: IActionsParams, params: { title: string }) => {
  try {
    const { data } = await api.post<IBoard>('/board', params)

    commit('createBoard', { board: data, status: 'success' })
  } catch (error: any) {
    console.log(error)
    commit('createBoard', { board: {}, status: error?.response.data.message })
  }
}

export const removeBoard = async ({ commit }: IActionsParams, params: { id: string }) => {
  try {
    const { data } = await api.put(`/board/${params.id}`)

    commit('removeBoard', { boardId: params.id, status: 'success' })
  } catch (error: any) {
    console.log(error)
    commit('removeBoard', { boardId: null, status: error?.response.data.message })
  }
}

export const updateBoard = async (
  { commit }: IActionsParams,
  params: { id: string; title: string }
) => {
  try {
    const { data } = await api.put(`/board/${params.id}`, { title: params.title })

    commit('updateBoard', { board: data, status: 'success' })
  } catch (error: any) {
    console.log(error)
    commit('updateBoard', { board: {}, status: error?.response.data.message })
  }
}
