import api from '@/api/instance'
import { IActionsParams, ITask } from './types'

export const fetchTasks = async ({ commit }: IActionsParams) => {
  try {
    const { data } = await api.get<ITask[]>('/task')

    commit('setTask', { tasks: data, status: 'success' })
  } catch (error: any) {
    console.log(error)
    commit('setTask', { columns: {}, status: error?.response?.data.message })
  }
}
