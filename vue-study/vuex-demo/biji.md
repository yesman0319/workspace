### 1.简介
	集中管理数据的，和Reactde Redux一样 都属于Flux的前端状态管理工具

### 2.基本用法

#### 2.1安装vuex

#### 2.2创建store.js,然后在main.js中导入

#### 2.3编写store.js
	Vuex的核心是Store，相当于是一个容器，一个Store实例中包含以下属性的方法：
		state 定义属性（状态、数据）
		getters 用来获取属性的
		actions 用来定义方法
		commit 提交动作
		mutations 定义变化
		注：按照vuex的思想不应该直接去修改数据，应该先提交一个变化。



#### 2.4编写App.vue
	在子组件中访问store对象的两种方式
	* 方式1：通过this.$store
	* 方式2：通过mapGetters、mapActions访问（vue提供的辅助函数）
		mapGetters 获取属性（数据）
		mapActions 获取方法（动作）

