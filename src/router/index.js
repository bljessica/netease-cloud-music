import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'start',
      component: () => import('@/components/start/start.vue')
    },
    {
      path: '/find',
      name: 'find',
      component: () => import('@/components/find/find.vue')
    },
    {
      path: '/mine',
      name: 'mine',
      component: () => import('@/components/mine/mine.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/start/login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/components/start/register.vue')
    },
    {
      path: '/cloud',
      name: 'cloud',
      component: () => import('@/components/cloud/cloud.vue')
    },
    {
      path: '/hotCommentsWall',
      name: 'hotCommentsWall',
      component: () => import('@/components/cloud/hotCommentsWall.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/components/search/search.vue')
    },
    {
      path: '/searchTo',
      name: 'searchTo',
      component: () => import('@/components/search/searchTo.vue')
    },
    {
      path: '/myInfo',
      name: 'myInfo',
      component: () => import('@/components/myInfo/myInfo.vue')
    },
    {
      path: '/playlist',
      name: 'playlist',
      component: () => import('@/components/playlist/playlist.vue')
    },
    {
      path: '/playing',
      name: 'playing',
      component: () => import('@/components/play/playing.vue')
    },
    // {
    //   path: '/playSong',
    //   name: 'playSong',
    //   component: () => import('@/components/play/playSong.vue')
    // },
    // {
    //   path: '/songComments',
    //   name: 'songComments',
    //   component: () => import('@/components/play/songComments.vue')
    // }
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
