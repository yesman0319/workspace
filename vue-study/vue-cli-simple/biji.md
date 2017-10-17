## 2.axios模块化;

	cnpm install axios -S

	使用axios的两种方式：
		方式1：在每个组件中引入
		方式2：在main.js中全局引入,并添加到vue的原型中。

## 3.为自定义组件添加事件
	
		.native

## 4.自定义全局组件(插件)
		
		全局组件（插件）：就是指可以在main.js中使用Vue.use()进行全局引入，然后再其他组件中就都可以使用了，如vue-router
			import VueRouter from 'vue-router'
			Vue.use(VueRouter);

		普通组件（插件）：axios  每个组件页面使用都需要单独引入；

