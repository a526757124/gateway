import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'
import application from './module/application'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    application,
    app
  }
})
