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
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/register.vue')
    }
  ]
})
