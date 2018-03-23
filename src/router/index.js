import Vue from 'vue'
import Router from 'vue-router'
import PageIndex from '@/components/pages/PageIndex'
import PageAbout from '@/components/pages/PageAbout'
import PageExploreList from '@/components/pages/PageExploreList'
import PageExploreStation from '@/components/pages/PageExploreStation'
import PagePlayground from '@/components/pages/PagePlayground'
import PageRegister from '@/components/pages/PageRegister'
import PageRules from '@/components/pages/PageRules'

import PageTemplate from '@/components/pages/PageTemplate'
import HelloWorld from '@/components/pages/PageLoading'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'PageIndex',
      component: PageIndex
    },
    {
      path: '/about',
      name: 'PageAbout',
      component: PageAbout
    },
    {
      path: '/explore',
      name: 'PageExploreList',
      component: PageExploreList
    },
    {
      path: '/explore/station',
      name: 'PageExploreStation',
      component: PageExploreStation
    },
    {
      path: '/playground',
      name: 'PagePlayground',
      component: PagePlayground
    },
    {
      path: '/rules',
      name: 'PageRules',
      component: PageRules
    },
    {
      path: '/register',
      name: 'PageRegister',
      component: PageRegister
    },



    {
      path: '/template',
      name: 'PageTemplate',
      component: PageTemplate
    }
  ]
})
