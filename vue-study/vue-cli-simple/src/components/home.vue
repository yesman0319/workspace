<template>
	<div id="home-page">
		<h2>首页模块</h2>
	</div>
</template>
<script>
	// import axios from 'axios';
	export default {
	  name: 'app',
	  data () {
	    return {
	      msg: 'Welcome to Your Vue.js App',
	      avatarUrl:""
	    }
	  },
	  created(){
	   	this.axios.get('http://api.github.com/users/yesman0319')
	        .then(resp => {
	          console.log(resp.data);
	          this.avatarUrl = resp.data.avatar_url;
	        })
	  },
	}
</script>
<style scoped>
	#home-page{
		width: 300px;
		height: 300px;
		background-color: #20A0FF;
		line-height: 300px;
	}
	h2{
		color: #fff;
		margin: 0 auto;
	}
</style>
