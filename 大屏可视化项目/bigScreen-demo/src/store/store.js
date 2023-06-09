import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import tabdata from './modules/tabdata'
import building from './modules/building'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    tabdata,
    building
  }
})
