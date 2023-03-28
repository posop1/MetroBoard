import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'
import { IColumnState } from './types'

const state: IColumnState = {
  columns: [],
  status: null
}

export default {
  state,
  actions,
  getters,
  mutations
}
