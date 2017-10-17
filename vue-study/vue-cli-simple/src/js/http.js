import axios from 'axios';

console.log("http.js");
export default{
	install:function(Vue){
		Vue.component("axios",axios)
	}
}