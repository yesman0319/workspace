<template>
    <div id="home">
        <homeHeader></homeHeader>
        <div class="content">
            <div>您现在的位置 :<span class="pink">{{takeUserUsingPage}}</span></div>
            <div flex="dir:left">
                <homeTap></homeTap>
                <div class="routerBox">
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import homeTap from './homeTap.vue'
    import homeHeader from './homeHeader.vue'
    let page = 1;
    export default {
        name: 'home',
        components: {homeTap, homeHeader},
        data () {
            return {

            }
        },
        computed:{
            takeUserUsingPage (){
                return this.$store.state.userStatyPage.pageName;
            }
        },
        mounted() {
            this.$store.commit("USERUSINGPAGE_CHANGE",{
                pageName:"个人资料"
            })
        },
        methods: {

        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
    .content{
        max-width: 1220px;
        margin: 0 auto;
        position: relative;
    }
    div {
        width: 100%;
        line-height: 40px;
    }
    .routerBox{
        margin-left: 20px;
        width: 1026px;
        background: #fff;
        min-height: 660px;
        padding:20px 40px;
    }

</style>
