import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
// import Start from '../views/Start.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Start',
    component: () => import(/* webpackChunkName: "start" */ '../views/Start.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/authorize',
    name: 'Authorize',
    component: () => import(/* webpackChunkName: "authorize" */ '../views/Authorize.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue')
  },
  {
    path: '/creating',
    name: 'Creating',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Creating.vue')
  },
  {
    path: '/stream',
    name: 'Stream',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Stream.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
