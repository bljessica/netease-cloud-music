import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'start',
      component: () => import('@/pages/start.vue')
    },
    {
      path: '/find',
      name: 'find',
      component: () => import('@/pages/find.vue'),
      meta: {
        play: true
      }
    },
    {
      path: '/mine',
      name: 'mine',
      component: () => import('@/pages/mine.vue'),
      meta: {
        play: true,
        requireAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/pages/register.vue')
    },
    {
      path: '/cloud',
      name: 'cloud',
      component: () => import('@/pages/cloud.vue'),
      meta: {
        play: true
      }
    },
    {
      path: '/hotCommentsWall',
      name: 'hotCommentsWall',
      component: () => import('@/pages/hotCommentsWall.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/pages/search.vue'),
      meta: {
        play: true
      }
    },
    {
      path: '/searchResult',
      name: 'searchResult',
      component: () => import('@/pages/searchResult.vue'),
      meta: {
        play: true
      }
    },
    {
      path: '/myInfo',
      name: 'myInfo',
      component: () => import('@/pages/myInfo.vue'),
      meta: {
        play: true,
        requireAuth: true
      }
    },
    {
      path: '/playlist',
      name: 'playlist',
      component: () => import('@/pages/playlist.vue'),
      meta: {
        play: true
      }
    },
    {
      path: '/playing',
      name: 'playing',
      component: () => import('@/pages/playing.vue'),
      meta: {
        play: true
      }
    },
    {
      path: '/songComment',
      name: 'songComment',
      component: () => import('@/pages/songComment.vue'),
      meta: {
        play: true
      }
    },
    {
      path: '/dailyPlaylist',
      name: 'dailyPlaylist',
      component: () => import('@/pages/dailyPlaylist.vue'),
      meta: {
        play: true
      }
    },
    {
      path: '/ground',
      name: 'ground',
      component: () => import('@/pages/playlistGround.vue'),
      meta: {
        play: true
      }
    }
    ,
    {
      path: '/rank',
      name: 'rank',
      component: () => import('@/pages/rank.vue'),
      meta: {
        play: true
      }
    },
    {
      path: '/video',
      name: 'video',
      component: () => import('@/pages/video.vue'),
      meta: {
        play: true
      }
    }
  ]
});

//路由守卫，判断用户是否登录
router.beforeEach((to, from, next) => {
  if(to.meta.requireAuth) {
    console.log(store.getters.isLogin)
    if(store.getters.isLogin === false) {
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
