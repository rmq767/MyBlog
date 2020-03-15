import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    u_id: ''
  },
  mutations: {
    GET_USERNAME(state, payload) {
      state.username = payload.username
      state.u_id = payload.id
    }
  },
  actions: {},
  modules: {}
})