import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    YYJ_username: ''
  },
  mutations: {
    COMMIT_USER_NAME (state, data) {
      state.YYJ_username = data
    }
  }
})

export default store
