<template>
  <div id="app">
    <button @click="increment">增加</button>
    <button @click="decrement()">减小</button>
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
  computed:{
    count(){
      return this.$store.state.count
    }
  },
  /*computed:mapGetters([
    'count'
  ]),*/
  /*methods:mapActions([
    'increment',
    'decrement',
  ])*/
  //分别提交类型常量为INCREMENT、DECREMENT的突变
  methods:{
    increment(){
      this.$store.commit('INCREMENT',"wow");
    },
    decrement(){
      this.$store.commit('DECREMENT',"nihao1");
    }
  }
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
