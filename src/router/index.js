import Vue from 'vue'
import Router from 'vue-router'
import $ from 'jquery'

import store from '../store'
import PageIndex from '@/components/pages/PageIndex'
import PageAbout from '@/components/pages/PageAbout'
import PageExploreList from '@/components/pages/PageExploreList'
import PageExploreStation from '@/components/pages/PageExploreStation'
import PagePlayground from '@/components/pages/PagePlayground'
import PageRegister from '@/components/pages/PageRegister'
import PageRules from '@/components/pages/PageRules'
import PageTemplate from '@/components/pages/PageTemplate'
import HelloWorld from '@/components/pages/PageLoading'
import { setTimeout } from 'timers';

Vue.use(Router)

let router =  new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'PageIndex',
      component: PageIndex,
      meta: {
        bgColor: "blue",
        navColor: "white"
      }
    },
    {
      path: '/about',
      name: 'PageAbout',
      component: PageAbout,
      meta: {
        bgColor: "blue",
        navColor: "white"
      }
    },
    {
      path: '/explore',
      name: 'PageExploreList',
      component: PageExploreList,
      meta: {
        bgColor: "white",
        navColor: "red"
      }
    },
    {
      path: '/explore/station',
      name: 'PageExploreStation',
      component: PageExploreStation,
      meta: {
        bgColor: "white",
        navColor: "red"
      }
    },
    {
      path: '/explore/station/:station_id',
      name: 'PageExploreStation',
      component: PageExploreStation,
      meta: {
        bgColor: "white",
        navColor: "red"
      }
    },
    {
      path: '/playground',
      name: 'PagePlayground',
      component: PagePlayground,
      meta: {
        bgColor: "white",
        navColor: "red"
      }
    },
    {
      path: '/rules',
      name: 'PageRules',
      component: PageRules,
      meta: {
        bgColor: "white",
        navColor: "red"
      }
    },
    {
      path: '/register',
      name: 'PageRegister',
      component: PageRegister,
      meta: {
        bgColor: "red",
        navColor: "white"
      }
    },

    {
      path: '/template',
      name: 'PageTemplate',
      component: PageTemplate,
      meta: {
        bgColor: "white",
        navColor: "red"
      }
    }
  ]
})

router.beforeEach( (to,from,next)=>{
  console.log(to.meta.bgcolor)
  store.commit("setBgColor", to.meta.bgColor)

  setTimeout(() => {
    window.scrollTo(0,0)
  }, 500);
  next()
})

router.afterEach((to, from) => {
  // setTimeout(()=>{
  //   let text = $("h1.title").text()
  //   let index1 = 0
  //   $("h1.title").text("")
  //   function update() {
  //     index1++
  //     let tt = text.slice(0,index1-2)
  //     while(tt.length<text.length){
  //       tt+="-"
  //     }
  //     $("h1.title").text(tt)
  //     if (index1<text.length+5){
  //       setTimeout(() => {
  //         update()
  //       }, 100);
  //     }
  //   }
  //   update()


  // },500)
  
})
export default router