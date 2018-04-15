import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import moduleLoading from './modules/loading.js'
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    loading: moduleLoading,
  },
  state: {
    menuState: false,
    mobile: window.innerWidth < 1200,
    searchKeyword: "",
    bgColor: "#0B0E2A",
    colors: {
      blue: "#0B0E2A",
      red: "#CE2834",
      white: "#F9F8F7"
    },
    token: ""
  },
  mutations: {
    setMenuState(state, value) {
      window.jf_menu_loaded = true
      if (value == true && !window.jf_menu_loaded) {

        _jf.flush();
      }
      state.menuState = value
    },
    setBgColor(state,value){
      state.bgColor = state.colors[value]
    },
    setToken(state,value){
      state.token = value
    }
  },
  actions: {
    openSearch(context, value) {
      context.state.searchKeyword = value
      context.commit("setMenuState", true)
    }
  }
})
export default store