import api from '@/api/instance'
import { ITask } from './types'
import { IActionsParams } from '@/types/common'

export const fetchTasks = async ({ commit }: IActionsParams, params: { boardId: string }) => {
  try {
    const { data } = await api.get<ITask[]>(`/board/${params.boardId}/tasks`)

    commit('setTasks', { tasks: data, status: 'success' })
  } catch (error: any) {
    console.log(error)
    commit('setTasks', { tasks: {}, status: error?.response?.data.message })
  }
}

export const createTask = async (
  { commit }: IActionsParams,
  params: { title: string; description: string; author: string; columnId: string; boardId: string }
) => {
  try {
    const { data } = await api.post<ITask>('/task', params)

    commit('createTask', { task: data, status: 'success' })
  } catch (error: any) {
    console.log(error)
    commit('createTask', { task: {}, status: error?.response?.data.message })
  }
}

export const removeTask = async ({ commit }: IActionsParams, params: { taskId: string }) => {
  try {
    const { data } = await api.delete(`/task/${params.taskId}`)

    commit('removeTask', { taskId: params.taskId, status: data })
  } catch (error: any) {
    console.log(error)
    commit('removeTask', { task: {}, status: error?.response?.data.message })
  }
}

export const updateTask = async (
  { commit }: IActionsParams,
  params: { title: string; description: string; columnId: string; taskId: string }
) => {
  try {
    if (params.title && params.description) {
      const { data } = await api.put(`/task/${params.taskId}`, {
        title: params.title,
        description: params.description,
        columnId: params.columnId
      })
      commit('updateTask', { task: data, status: 'success' })
    } else {
      const { data } = await api.put(`/task/${params.taskId}`, {
        columnId: params.columnId
      })
      commit('updateTask', { task: data, status: 'success' })
    }
  } catch (error: any) {
    console.log(error)
    commit('removeTask', { task: {}, status: error?.response?.data.message })
  }
}
