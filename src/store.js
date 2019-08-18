import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showAsideBar: false,
    showMenu: true,
    dynamicComponent: 'statistics'
  },
  mutations: {
    DisplayAsideBar(state) {
      state.showAsideBar = true;
    },
    HideAsideBar(state) {
      state.showAsideBar = false;
    },
    ChangeComponent(state, payload) {
      state.dynamicComponent = payload.component;
    }
  },
  actions: {

  }
})