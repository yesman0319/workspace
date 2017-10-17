import types from '../../types.js'
import axios from 'axios'
const state = {
	seller:{}
}

const getters = {
	seller(state){
		return state.seller;
	}
}

const actions = {
	getSeller({commit,state}){
		axios.get('/api/seller')
			.then(res => {
				if(res.data.errNum == 0){
					commit(types.GET_SELLER,res.data.data);
				}
			})
	}
}

const mutations = {
	[types.GET_SELLER](state,data){
		state.seller = data;
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}

