import { IUser } from './modules/auth/types'
import { Store, createStore } from 'vuex'
import { InjectionKey } from 'vue'
import auth from './modules/auth'
import column from './modules/column'
import { IColumn } from './modules/column/types'

export interface State {
  user: IUser
  columns: IColumn[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore({
  modules: {
    auth,
    column
  }
})
