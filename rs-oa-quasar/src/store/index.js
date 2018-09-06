import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'

import mobile from './mobile-module'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    mobile
  }
})

export default store
