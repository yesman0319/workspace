<template>
	<div id="app">
		{{name}}
	</div>
</template>
<script>
	export default{
		data(){
			return{
				name:"footer"
			}
		}
	}
</script>
<style scoped lang="less">
	#app{
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 84px;
		background-color: #324057;
		color:#fff;
		line-height: 84px;
		text-align: center;
	}
</style>