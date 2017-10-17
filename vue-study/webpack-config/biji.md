## 单文件组件项目结构配置

### 1.创建项目，结构如下
webpack-demo
	|-index.html 
	|-main.js 入口文件
	|-App.vue vue文件
	|-package.json 工程文件
	|-webpack.config.js webpack配置文件
	|-.babelrc   Babel配置文件

### 2.编写App.vue 

### 3.安装相关模板 
	cnpm install vue -S 
	cnpm install webpack -D 
	cnpm install webpack-dev-server -D 
	cnpm install vue-loader -D 
	cnpm install vue-html-loader -D 
	cnpm install vue-style-loader -D 
	cnpm install file-loader -D 

	cnpm install babel-loader -D 
	cnpm install babel-core -D 
	cnpm install babel-preset-env -D //根据配置的运行环境自动启用需要的babel插件
	cnpm install vue-template-compiler -D //预编译模板

	合并：cnpm install -D webpack webpack-dev-server vue-loader vue-html-loader css-loader vue-style-loader file-loader 
	babel-loader babel-core babel-preset-env vue-template-compiler

### 4.编写 main.js文件 	

### 5.编写webpack配置文件

### 6.编写package.json	
	    "scripts": {
		 	"dev" : "webpack-dev-server --open --hot --port 8888"
	 	},
### 7.编写.babelrc
	




