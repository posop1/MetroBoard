import api from '@/api/instance'
import { IColumn } from './types'
import { IActionsParams } from '@/types/common'

//TODO: исправить название мутаций и т.д
export const fetchColumns = async ({ commit }: IActionsParams) => {
  try {
    const { data } = await api.get<IColumn[]>('/column')

    commit('setColumns', { columns: data, status: 'success' })
  } catch (error: any) {
    console.log(error)
    commit('setColumns', { columns: {}, status: error?.response?.data.message })
  }
}

export const createColumn = async ({ commit }: IActionsParams, params: { title: string }) => {
  try {
    const { data } = await api.post('/column', params)

    commit('createColumn', { column: data, status: 'success' })
  } catch (error: any) {
    console.log(error)
    commit('createColumn', { column: {}, status: error?.response?.data.message })
  }
}

export const removeColumn = async ({ commit }: IActionsParams, params: { id: string }) => {
  try {
    const { data } = await api.delete(`/column/${params.id}`)

    commit('removeColumn', { columnId: params.id, status: data })
  } catch (error: any) {
    console.log(error)
    commit('removeColumn', { column: {}, status: error?.response?.data.message })
  }
}

export const updateColumn = async (
  { commit }: IActionsParams,
  params: { id: string; title: string }
) => {
  try {
    const { data } = await api.put(`/column/${params.id}`, params)

    commit('updateColumn', { column: data, status: 'success' })
  } catch (error: any) {
    console.log(error)
    commit('updateColumn', { column: {}, status: error?.response?.data.message })
  }
}
