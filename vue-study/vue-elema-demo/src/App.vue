<template>
  <div id="app">
    <VueHeader></VueHeader>
    <div class="mod">
      <ul class="tab">
        <li>
          <router-link to='/goods'>商品</router-link>
        </li>
        <li>
          <router-link to='/seller'>商家</router-link>
        </li>
        <li>
          <router-link to='/ratings'>评论</router-link>
        </li>
      </ul>
      <router-view></router-view>
    </div>
    
    
    <VueFooter></VueFooter>
  </div>
</template>

<script>
import VueHeader from './components/header/Header.vue';
import VueFooter from './components/footer/Footer.vue';

export default {
  name: 'app',
  components:{
    VueHeader,
    VueFooter
  }
}
</script>

<style lang="less" scoped>
  .mod{
    width: 100%;
    position: absolute;
    top: 54px;
    bottom: 84px;
    left: 0;
  }
  .tab{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    li{
      position: relative;
      width: 33.3%;
      float: left;
      text-align: center;
      font-size: 15px;
      a{
        display: block;
      }
      &:after{
        content: "";
        height: 30px;
        width: 1px;
        position: absolute;
        right: 0;
        top: 5px;
        background-color: #767676;
      }
      .tab-active{
        color:#00bb51;
      }
    }
    &:after{
      display: inline-block;
      content:"";
      clear:both;
    }
  }
</style>
