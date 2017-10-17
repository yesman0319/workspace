import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

var state = {
	count : 6
}
var getters = {
	count(state){
		return state.count;
	}
}

const actions = {
	// increment(context){
	// 	console.log(context);
	// }
	increment({commit,state}){
		commit('increment');
	},
	decrement({commit,state}){
		if(state.count > 10){
			commit('decrement');
		}
	},
	increment2({commit,state}){
		var p = new Promise((resolve,reject) => {
			setTimeout(() => {
			  	resolve();
			}, 1200)
		});
		p.then(() => {
			commit('increment')
		}).catch(() => {
			console.log("异步操作")
		} )
	}
}

const mutations = {
	increment(state){
		state.count++;
	},
	decrement(state){
		state.count--;
	}
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations
})
