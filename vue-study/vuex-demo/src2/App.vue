<template>
  <div id="app">
    <img src="./assets/logo.png">
    <button @click="increment">增加</button>
    <button @click="decrement()">减小</button>
    <button @click="increment2">模拟请求后的增加</button>
    <p> 当前数字为:{{count}}</p>
  </div>
</template>

<script>
import {mapState,mapGetters,mapActions} from 'vuex'

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  // computed:{
  //   count(){
  //     return this.$store.state.count
  //   }
  // }
  // computed:mapGetters([
  //   'count'
  // ]),
  computed:mapState([
    'count'
  ]),
  methods:mapActions([
    'increment',
    'decrement',
    'increment2'
  ])
}
</script>

<style>
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

a {
  color: #42b983;
}
</style>
