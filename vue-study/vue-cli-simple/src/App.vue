<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-link to="/home">首页</router-link>
    <router-link to="/news">新闻</router-link>
    <transition
      enter-active-class="animated fadeIn"
     >
      <router-view></router-view>
    </transition>
    
    <img class="avatar" :src="avatarUrl" alt="头像">
    <hr>
    <button @click="sendAjax">发送ajax请求</button>
    <my-button @click.native="sendAjax"></my-button>
    <!-- 自定义组件 -->
  </div>
</template>

<script>
import myButton from './components/myButton.vue';

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      avatarUrl:""
    }
  },
  watch:{
    $route:function(news,olds){
      console.info(`变化了${olds}`);
    }
  },
  created(){
    // this.sendAjax();
  },
  methods:{
    sendAjax(){
      this.axios.get('http://api.github.com/users/yesman0319')
        .then(resp => {
          console.log(resp.data);
          this.avatarUrl = resp.data.avatar_url;
        }).catch(err => {
          console.log(err);
        })
    }
  },
  components:{
      "my-button":myButton
  }
}
</script>

<style>
.vue-router-active{
  color: #00bb51;
}
.avatar{
  width: 100px;
  height: 100px;
  border-radius: 50px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}
</style>
