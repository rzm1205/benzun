import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存储token
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    username:localStorage.getItem('username') ? localStorage.getItem('username') : '',//用户名
    name:localStorage.getItem('name') ? localStorage.getItem('name') : ''//昵称
  },
  mutations: {
    // 修改token，menuList,并将token、menuList存入localStorage
    refreshCurrentUserInfo (state, user) {
      state.token = user.token;
      state.username = user.username;
      state.name = user.name;
      localStorage.setItem('token', user.token);
      localStorage.setItem('username', user.username);
      localStorage.setItem('name', user.name);
      // console.log(state.token)
    }
  },
  actions: {
  },
  modules: {
  }
})
