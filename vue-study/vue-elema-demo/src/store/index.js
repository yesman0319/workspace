import Vue from 'vue'
import Vuex from 'vuex'
import seller from './modules/seller/seller.js'
import goods from './modules/goods/goods.js'
import ratings from './modules/ratings/ratings.js'


Vue.use(Vuex);

export default new Vuex.Store({
	modules:{
		seller,
		goods,
		ratings
	}
})