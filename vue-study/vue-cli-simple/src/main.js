import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import RouterConfig from './router.config.js'
import './css/animate.css'
// import axios from './js/http.js'
import axios from 'axios';

//创建ajax全局方法
Vue.prototype.axios = axios;
Vue.use(VueRouter);

const router = new VueRouter(RouterConfig);

new Vue({
  el: '#app',
  render: h => h(App),
  router
})
