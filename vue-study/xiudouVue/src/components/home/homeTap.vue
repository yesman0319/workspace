<template>
    <nav id="homeTab">
        <ul flex="main:center dir:top" >
            <!-- <li @click="toShare" :class="{active:active == 0}">分享管理</li>
            <li @click="toProduct" :class="{active:active == 1}">商品管理</li> -->
            <router-link tag="li" @click.native="toOrder" to="/home/order">订单管理</router-link>
            <router-link tag="li" @click.native="toVoucher" to="/home/voucher">店铺优惠券</router-link>
            <router-link tag="li" @click.native="toWallet" to="/home/wallet">钱包管理</router-link>
            <router-link tag="li" @click.native="toUserMes" to="/home/userMes">个人资料</router-link>
            <router-link tag="li" @click.native="toMesControl" to="/home/mesControl">消息管理</router-link>
            <!-- <li @click="toShare" :class="{active:active == 0}">分享管理</li>
            <li @click="toProduct" :class="{active:active == 1}">商品管理</li>
            <li @click="toOrder" :class="{active:active == 2}">订单管理</li>
            <li @click="toVoucher" :class="{active:active == 3}">店铺优惠券</li>
            <li @click="toWallet" :class="{active:active == 4}">钱包管理</li>
            <li @click="toUserMes" :class="{active:active == 5}">个人资料</li>
            <li @click="toMesControl" :class="{active:active == 6}">消息管理</li> -->
        </ul>
    </nav>
</template>

<script type="text/ecmascript-6">
//    import product from './product.vue'
    export default {
        name: 'homeTab',
        data () {
            return {
                active:5
            }
        },
        mounted (){

        },
        methods : {
            isSelected(index){
                this.active = index;
            },
            toMesControl(){
                // this.$router.push('mesControl')
                this.$store.commit("USERUSINGPAGE_CHANGE",{
                    pageName:"消息管理"
                })
                // this.isSelected(6)
            },
            toUserMes(){
                // this.$router.push({name:"userMes"})
                this.$store.commit("USERUSINGPAGE_CHANGE",{
                    pageName:"个人资料"
                })
                // this.isSelected(5)
            },
            toWallet(){
                // this.$router.push('wallet')
                this.$store.commit("USERUSINGPAGE_CHANGE",{
                    pageName:"钱包管理"
                })
                // this.isSelected(4)
            },
            toVoucher(){
                // this.$router.push('voucher')
                this.$store.commit("USERUSINGPAGE_CHANGE",{
                    pageName:"店铺优惠券"
                })
                // this.isSelected(3)
            },
            toOrder(){
                this.$store.commit("USERUSINGPAGE_CHANGE",{
                    pageName:"订单管理"
                })
                this.isSelected(2);
                // this.$router.push('order')
            },
            toProduct(){
                this.$store.commit("USERUSINGPAGE_CHANGE",{
                    pageName:"商品管理"
                })
                this.isSelected(1)
            },
            toShare(){
                this.$store.commit("USERUSINGPAGE_CHANGE",{
                    pageName:"分享管理"
                })
                this.isSelected(0)
            }

        }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
    @mixin backgroundUrl ($url){
        background: url($url) no-repeat 50% 50%;
        -webkit-background-size:30%;
        background-size:30%;
    }
    ul{
        background: #fff;
        width:180px;
        height:390px;
        text-align: center;
        font-size: 16px;
        color: #878787;
        li{
            height: 50px;
            cursor: pointer;
        }
        li.active{
            color: #ff2e6b;
        }
    }
    .tab{
        color: #ddd;
    }
    .checkedTab{
        color: #000;
    }
</style>
