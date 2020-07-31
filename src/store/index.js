import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存储token
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    username:localStorage.getItem('username') ? localStorage.getItem('username') : '',
  },
  mutations: {
    // 修改token，menuList,并将token、menuList存入localStorage
    refreshCurrentUserInfo (state, user) {
      state.token = user.token;
      state.username = user.username
      localStorage.setItem('token', user.token);
      localStorage.setItem('username', user.username);
      // console.log(state.token)
    }
  },
  actions: {
  },
  modules: {
  }
})
