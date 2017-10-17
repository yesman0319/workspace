<template>
	<div id="app">
		<h1>hello webpack</h1>
		<h2>{{name}}</h2>
	</div>
</template>
<style scoped>
	body{
		background-color: #fafafa;
	}
</style>
<script>
	export default {
		data(){
			return{
				name : 'lee'
			}
		},
		methods:{
			change(){
				this.name = "改变后的名字"
			}
		}
	}
	console.log(111)
</script>