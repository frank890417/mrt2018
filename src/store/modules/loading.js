import axios from 'axios'
import $ from 'jquery'
const post = {
  namespaced: true,
  state: {
    position: 0,
    loading: true,
  },
  mutations: {
    setLoading(state, value) {
      state.loading = value
    }
  },
  actions: {
    init(context) {
      console.log("Scroll Module init")
      $("#app").scroll(o => {
        console.log(context.state.position)
        context.commit("setPosition", $("#app").scrollTop())
      })
      $(window).scroll(o => {
        console.log(context.state.position)
        context.commit("setPosition", $(window).scrollTop())
      })

    },

  }
}
export default post