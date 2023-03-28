import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'
import { ITaskState } from './types'

const state: ITaskState = {
  tasks: [],
  status: null
}

export default {
  state,
  actions,
  getters,
  mutations
}
