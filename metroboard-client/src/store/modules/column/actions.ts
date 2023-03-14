import api from '@/api/instance'
import { IActionsParams, IColumn } from './types'

export const fetchColumns = async ({ commit }: IActionsParams) => {
  try {
    const { data } = await api.get<IColumn[]>('/column')

    commit('setColumn', { columns: data, status: 'success' })
  } catch (error: any) {
    console.log(error)
    commit('setColumn', { columns: {}, status: error?.response?.data.message })
  }
}

export const createColumn = async ({ commit }: IActionsParams) => {
  try {
  } catch (error: any) {
    console.log(error)
    commit('createColumn', { column: {}, status: error?.response?.data.message })
  }
}

export const removeColumn = async ({ commit }: IActionsParams) => {
  try {
  } catch (error: any) {
    console.log(error)
    commit('removeColumn', { column: {}, status: error?.response?.data.message })
  }
}

export const updateColumn = async ({ commit }: IActionsParams) => {
  try {
  } catch (error: any) {
    console.log(error)
    commit('updateColumn', { column: {}, status: error?.response?.data.message })
  }
}
