import "bootstrap/dist/css/bootstrap.min.css"
import "slick-carousel/slick/slick.css"

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import SvgInline from './components/SvgInline.vue'
import PageLoading from './components/pages/PageLoading.vue'
import SectionFooter from './components/SectionFooter.vue'
import FullMenu from './components/FullMenu.vue'

Vue.component("SvgInline", SvgInline)
Vue.component("PageLoading", PageLoading)
Vue.component("SectionFooter", SectionFooter)
Vue.component("FullMenu", FullMenu)


import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueI18n from 'vue-i18n'
import messages from '@/i18n/messages.js'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zh', // set locale
  messages, // set locale messages
})

if (process.env.NODE_ENV == "development") {

  setTimeout(() => {
    store.commit("loading/setLoading", false)
  }, 500);
}
if (process.env.NODE_ENV == "production") {

  setTimeout(() => {
    store.commit("loading/setLoading", false)
  }, 3000);


}

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    lineToBr(text){
      return text.replace(/\n/,"<br>")
    },
    swtichLang(locale) {
      // this.$store.commit("setMenuState", true)
      // let _this=this
      // setTimeout(function () {
      //   _this.$store.commit("setMenuState", false)

      // }, 200)
      this.$i18n.locale = locale
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  components: { App },
  template: '<App/>'
})
