import Vue from 'vue'
import Vuex from 'vuex'
import types from './types.js'

Vue.use(Vuex);
const state = {
	count : 3
}

/*var getters = {
	count(state){
		return state.count
	}
}*/

/*const actions = {
	increment({commit,state}){
		commit(types.INCREMENT,state);
	},
	decrement({commit,state}){
		if(state.count > 1){
			commit(types.DECREMENT);
		}
	}
}*/

const mutations = {
	[types.INCREMENT](state,opt){
		state.count++;
		console.log(opt);
	},
	[types.DECREMENT](state,opts){
		state.count--;
		console.log(opts);
	}
}
export default new Vuex.Store({
	state,
	// getters,
	// actions,
	mutations
})