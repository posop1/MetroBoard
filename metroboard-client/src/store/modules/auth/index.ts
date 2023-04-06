import { AuthState } from './types'
import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'
import { getCookie } from '@/utils/getCookie'

const state: AuthState = {
  user: null,
  token: getCookie('token'),
  status: null
}

export default {
  state,
  actions,
  getters,
  mutations
}
