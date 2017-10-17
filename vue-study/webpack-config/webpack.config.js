module.exports = {
	//配置入口文件
	entry:"./main.js",
	//配置输出文件
	output:{
		path:__dirname,
		filename:"build.js"
	},
	//配置模块加载器
	module:{
		rules:[
			{//所有以.vue结尾的文件都由vue-loader加载
				test:/\.vue$/,
				loader:'vue-loader'
			},
			{
				test:/\.js$/,//所有以.js结尾的文件都有babel-loader加载，除了node_module以外
				loader:'babel-loader',
				exclude:/node_modules/
			}
		]
	}
}





