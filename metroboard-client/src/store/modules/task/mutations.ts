import { ITask, ITaskState } from './types'

export const setTask = (state: ITaskState, payload: { tasks: ITask[]; status: string }) => {
  state.tasks = payload.tasks
  state.status = payload.status
}

export const createTask = (state: ITaskState, payload: { task: ITask; status: string }) => {
  state.tasks?.push(payload.task)
  state.status = payload.status
}

export const removeTask = (
  state: ITaskState,
  payload: { taskId: string; status: { message: string } }
) => {
  const index = state.tasks.findIndex((task) => task._id === payload.taskId)
  state.tasks.splice(index, 1)

  state.status = payload.status.message
}

export const updateTask = (state: ITaskState, payload: { task: ITask; status: string }) => {
  const index = state.tasks.findIndex((column) => column._id === payload.task._id)
  state.tasks[index] = payload.task
}
