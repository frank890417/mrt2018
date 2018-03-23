import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import moduleLoading from 'modules/loading.js'
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    moduleLoading
  },
  state: {
    menuState: false,
    mobile: window.innerWidth < 1200,
    searchKeyword: "",
    bgColor: "#0B0E2A"
  },
  mutations: {
    setMenuState(state, value) {
      window.jf_menu_loaded = true
      if (value == true && !window.jf_menu_loaded) {

        _jf.flush();
      }
      state.menuState = value
    },
    setBgColor(state,name){
      switch (name) {
        case "white":
          state.bgColor = "#F9F8F7"
          break;
        case "blue":
          state.bgColor = "#0B0E2A"
          break;
        case "red":
          state.bgColor = "#CE2834"
        default:
          break;
      }
    }
  },
  actions: {
    openSearch(context, value) {
      context.state.searchKeyword = value
      context.commit("setMenuState", true)
    }
  }
}