import api from '@/api/instance'
import { IActionsParams, ITask } from './types'

export const fetchTasks = async ({ commit }: IActionsParams) => {
  try {
    const { data } = await api.get<ITask[]>('/task')

    commit('setTask', { tasks: data, status: 'success' })
  } catch (error: any) {
    console.log(error)
    commit('setTask', { tasks: {}, status: error?.response?.data.message })
  }
}

export const createTask = async (
  { commit }: IActionsParams,
  params: { title: string; description: string; author: string; columnId: string }
) => {
  try {
    const { data } = await api.post<ITask>('/task', params)

    commit('createTask', { task: data, status: 'success' })
  } catch (error: any) {
    console.log(error)
    commit('createTask', { task: {}, status: error?.response?.data.message })
  }
}
