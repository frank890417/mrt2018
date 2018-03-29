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
    lines: [
      {
        name: "文湖線",
        eng: "Wenhu Line",
        bgcolor: "#BA8B2E",
        color: "white"
      },
      {
        name: "淡水信義線",
        eng: "TamsuiXinyi Line",
        bgcolor: "#D41433",
        color: "white"
      },
      {
        name: "松山新店線",
        eng: "Xindian Line",
        bgcolor: "#0C8155",
        color: "white"
      },
      {
        name: "中和新蘆線",
        eng: "Xinlu Line",
        bgcolor: "#E8AF29",
        color: "black"
      },
      {
        name: "板南線",
        eng: "Bannan Line",
        bgcolor: "#1568B2",
        color: "white"
      }
    ],

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