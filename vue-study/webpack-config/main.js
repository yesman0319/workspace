import Vue from 'vue'
import App from './App.vue'


new Vue({
	el:"#app",
	render(h){ //使用render函数渲染组件
		return h(App);
	}
})
