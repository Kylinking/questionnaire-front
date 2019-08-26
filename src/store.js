import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
let defaultState = {
  // 数据区
  token:'',
  id:'',
  name:'',
  showAlertBanner:false,
  alertBannerMessage:'',
  alertType:'info',
};
export default new Vuex.Store({
  state: defaultState,
  mutations: {
    ResetState:function(state){
      state = defaultState;
    },
    DisplayAsideBar(state) {
      state.showAsideBar = true;
    },
    HideAsideBar(state) {
      state.showAsideBar = false;
    },
    ChangeComponent(state, payload) {
      state.dynamicComponent = payload.component;
    },
    SetLoginInfo(state,payload){
      state.token = payload.token;
      state.name = payload.name;
      state.id = payload.id;
      localStorage.token = payload.token;
      localStorage.name = payload.name;
      localStorage.id = payload.id;
    },
    ShowErrorBanner(state,payload){      
      payload.alertType = 'error';
      this.commit('ShowAlertBanner',payload);
    },
    ShowInfoBanner(state,payload){      
      payload.alertType = 'info';
      this.commit('ShowAlertBanner',payload);
    },
    ShowAlertBanner(state,payload)
    {
      state.alertBannerMessage = payload.message;
      state.showAlertBanner = true;
      state.alertType = payload.alertType;
    }
  },
  actions: {

  }
})