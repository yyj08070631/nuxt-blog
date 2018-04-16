import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    YYJ_username: '',
    ifRefreshList: false
  },
  mutations: {
    COMMIT_USER_NAME (state, data) {
      state.YYJ_username = data
    },
    COMMIT_IF_REFRESH_LIST (state, data) {
      state.ifRefreshList = data
    }
  }
})

export default store
