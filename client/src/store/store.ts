import { IUser } from './modules/auth/types'
import { Store, createStore } from 'vuex'
import { InjectionKey } from 'vue'
import auth from './modules/auth'
import column from './modules/column'
import task from './modules/task'
import board from './modules/board'
import { IColumn } from './modules/column/types'
import { ITask } from './modules/task/types'
import { IBoard } from './modules/board/types'

export interface State {
  user: IUser
  columns: IColumn[]
  tasks: ITask[]
  boards: IBoard[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore({
  modules: {
    auth,
    column,
    task,
    board
  }
})
