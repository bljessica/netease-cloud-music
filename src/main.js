// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import '../static/iconfont.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { Message } from 'element-ui';
import store from './store/index';
import VueTouch from 'vue-touch';
import animate from 'animate.css';

Vue.use(animate);
Vue.use(VueTouch, {name: 'v-touch'})
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.Message = Message;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
