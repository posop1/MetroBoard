import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'
import { IBoardState } from './types'

const state: IBoardState = {
  boards: [],
  status: null
}

export default {
  state,
  actions,
  getters,
  mutations
}
