<template>
    <nav id="homeTab">
        <ul flex="main:center dir:top" >
            <li @click="toShare">分享管理</li>
            <li @click="toProduct">商品管理</li>
            <li @click="toOrder">订单管理</li>
            <li @click="toVoucher">店铺优惠券</li>
            <li @click="toWallet">钱包管理</li>
            <li @click="toUserMes" style="color: #ff2e6b;">个人资料</li>
            <li @click="toMesControl">消息管理</li>
        </ul>
    </nav>
</template>

<script type="text/ecmascript-6">
//    import product from './product.vue'
    export default {
        name: 'homeTab',
        data () {
            return {

            }
        },
        mounted (){

        },
        methods : {
            isSelected(index){
                let Eli = this.$el.querySelectorAll("li");
                for(let li of Eli){
                    console.log(li.style.color)
                    if(li.style.color == 'rgb(255, 46, 107)'){
                        li.style.color = "#666"
                    }
                }
                Eli[index].style.color = "#ff2e6b";
            },
            toMesControl(){
                this.$router.push('mesControl')
                this.$store.commit("USERUSINGPAGE_CHANGE",{
                    pageName:"消息管理"
                })
                this.isSelected(6)
            },
            toUserMes(){
                this.$router.push({name:"userMes"})
                this.$store.commit("USERUSINGPAGE_CHANGE",{
                    pageName:"个人资料"
                })
                this.isSelected(5)
            },
            toWallet(){
                this.$router.push('wallet')
                this.$store.commit("USERUSINGPAGE_CHANGE",{
                    pageName:"钱包管理"
                })
                this.isSelected(4)
            },
            toVoucher(){
                this.$router.push('voucher')
                this.$store.commit("USERUSINGPAGE_CHANGE",{
                    pageName:"店铺优惠券"
                })
                this.isSelected(3)
            },
            toOrder(){
                this.$store.commit("USERUSINGPAGE_CHANGE",{
                    pageName:"订单管理"
                })
                this.isSelected(2);
                this.$router.push('order')
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
    }
    .tab{
        color: #ddd;
    }
    .checkedTab{
        color: #000;
    }
</style>
