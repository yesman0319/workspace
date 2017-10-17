import Home from './components/home.vue'
import News from './components/news.vue'

export default{
	routes:[
		{
			path:"*",
			redirect:"/home"
		},
		{
			path:"/home",
			component:Home
		},
		{
			path:"/news",
			component:News
		}
	],
	linkActiveClass:"vue-router-active",
	mode:"history",
}