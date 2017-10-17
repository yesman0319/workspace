<template>
	<div id="app">
		{{seller.name}}
		<br>
		<!-- {{msg}} -->
	</div>
</template>
<script>
	import {mapGetters} from 'vuex'
	export default{
		created(){
			this.$store.dispatch('getSeller');
		},
		// computed:{
		// 	...mapGetters([
		// 		'seller'
		// 	]),
		// 	msg:"nihao"
		// },
		computed:{
			...mapGetters(['seller']),
			// age:"18"
		}
	}
</script>
<style scoped lang="less">
	#app{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 54px;
		background-color: #20A0FF;
		color:#fff;
		line-height: 54px;
		text-align: center;
	}
</style>