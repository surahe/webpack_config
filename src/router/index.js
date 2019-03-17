import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export const constantRouterMap = [
  {
    name: 'a',
    path: '/async',
    component: () => import('@/vue/async')
  },
  {
    name: 'b',
    path: '/async2',
    component: () => import('@/vue/async2')
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
