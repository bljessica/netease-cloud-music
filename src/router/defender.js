import router from './index';

//路由守卫，判断用户是否登录
router.beforeEach((to, from, next) => {
    if(to.path === '/login' || to.path === '/register' || to.path === '/start') {
        next();
    }
    else {
        if(this.$store.getters.token === null || this.$store.getters.token === '') {
            next('/login');
        }
        else {
            next();
        }
    }
})