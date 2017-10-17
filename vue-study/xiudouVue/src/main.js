// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import store from './store/store'
import $ from 'jquery'
import "animate.css"

Vue.use(VueResource)
Vue.config.productionTip = false;
//定义全局变量
global.AUTH_TOKEN = sessionStorage.getItem('auth_token');
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
})
