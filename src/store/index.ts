import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login: "",
    password: ""
  },
  mutations: {
    mutLogin(state, login){
      state.login = login;
    },
    mutPassword(state, password){
      state.password = password;
    }
  },
  actions: { 
    setLogin(context,payload){
      context.commit('mutLogin', payload)
    },
    setPassword(context,payload){
      context.commit('mutPassword', payload)
    }

  },
  modules: {
  }
})
