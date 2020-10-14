import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index';

Vue.use(Router);

const router = new Router({
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
    },
    {
      path: '/cloud',
      name: 'cloud',
      component: () => import('@/views/cloud.vue')
    },
    {
      path: '/hotCommentsWall',
      name: 'hotCommentsWall',
      component: () => import('@/views/hotCommentsWall.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/search.vue')
    },
    {
      path: '/searchTo',
      name: 'searchTo',
      component: () => import('@/views/searchTo.vue')
    },
    {
      path: '/myInfo',
      name: 'myInfo',
      component: () => import('@/views/myInfo.vue')
    },
    {
      path: '/playlist',
      name: 'playlist',
      component: () => import('@/views/playlist.vue')
    },
    {
      path: '/playSong',
      name: 'playSong',
      component: () => import('@/views/playSong.vue')
    }
  ]
});

//路由守卫，判断用户是否登录
router.beforeEach((to, from, next) => {
  if(to.path === '/login' || to.path === '/register' || to.path === '/') {
      next();
  }
  else {
      if(store.getters.token === null || store.getters.token === '') {
          next('/login');
      }
      else {
          next();
      }
  }
});

export default router;
