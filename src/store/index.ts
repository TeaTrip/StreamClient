import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login: "",
    password: "",
    token: ""

  },
  mutations: {
    mutLogin(state, login){
      state.login = login;
    },
    mutPassword(state, password){
      state.password = password;
    },
    mutToken(state, token){
      state.token = token;
    }
  },
  actions: { 
    setLogin(context,payload){
      context.commit('mutLogin', payload)
    },
    setPassword(context,payload){
      context.commit('mutPassword', payload)
    },
    setToken(context,payload){
      context.commit('mutToken', payload)
    }

  },
  modules: {
  }
})
