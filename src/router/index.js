import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'start',
      component: () => import('@/views/start.vue')
    },
    {
      path: '/find',
      name: 'find',
      component: () => import('@/views/find.vue')
    },
    {
      path: '/mine',
      name: 'mine',
      component: () => import('@/views/mine.vue')
    }
  ]
})
