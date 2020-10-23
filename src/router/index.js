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
      component: () => import('@/components/find/find.vue'),
      meta: {
        play: true
      }
    },
    {
      path: '/mine',
      name: 'mine',
      component: () => import('@/components/mine/mine.vue'),
      meta: {
        play: true
      }
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
      component: () => import('@/components/cloud/cloud.vue'),
      meta: {
        play: true
      }
    },
    {
      path: '/hotCommentsWall',
      name: 'hotCommentsWall',
      component: () => import('@/components/cloud/hotCommentsWall.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/components/search/search.vue'),
      meta: {
        play: true
      }
    },
    {
      path: '/searchResult',
      name: 'searchResult',
      component: () => import('@/components/search/searchResult.vue'),
      meta: {
        play: true
      }
    },
    {
      path: '/myInfo',
      name: 'myInfo',
      component: () => import('@/components/myInfo/myInfo.vue'),
      meta: {
        play: true
      }
    },
    {
      path: '/playlist',
      name: 'playlist',
      component: () => import('@/components/playlist/playlist.vue'),
      meta: {
        play: true
      }
    },
    {
      path: '/playing',
      name: 'playing',
      component: () => import('@/components/play/playing.vue'),
      meta: {
        play: true
      }
    },
    {
      path: '/songComment',
      name: 'songComment',
      component: () => import('@/components/comment/songComment.vue'),
      meta: {
        play: true
      }
    },
    {
      path: '/dailyPlaylist',
      name: 'dailyPlaylist',
      component: () => import('@/components/playlist/dailyPlaylist.vue'),
      meta: {
        play: true
      }
    },
    {
      path: '/ground',
      name: 'ground',
      component: () => import('@/components/playlist/ground.vue'),
      meta: {
        play: true
      }
    }
    ,
    {
      path: '/rank',
      name: 'rank',
      component: () => import('@/components/find/rank.vue'),
      meta: {
        play: true
      }
    },
    {
      path: '/video',
      name: 'video',
      component: () => import('@/components/video/video.vue'),
      meta: {
        play: true
      }
    }
  ]
});

//路由守卫，判断用户是否登录
router.beforeEach((to, from, next) => {
  if(to.path === '/mine' || to.path === '/hotCommentsWall' || to.path === '/myInfo' || to.path === '/dailyPlaylist') {
    if(store.getters.token === null || store.getters.token === '') {
      next('/login');
    }
    else {
        next();
    }  
  }
  else {
    next();
  }
});

export default router;
