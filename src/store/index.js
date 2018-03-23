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
    stations: [
      {
        name: "南港站",
      },
      {
        name: "⻄⾨站",
      },
      {
        name: "北⾨站",
      },
      {
        name: "中⼭站",
      },
      {
        name: "圓⼭站",
      },
      {
        name: "台北101站",
      },
      {
        name: "劍南路站",
      },
      {
        name: "⼤湖公園站",
      },
      {
        name: "⾏天宮站",
      },
      {
        name: "⼤橋頭站",
      }
    ]
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