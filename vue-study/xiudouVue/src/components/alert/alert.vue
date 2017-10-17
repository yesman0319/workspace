<template>
    <div id="alert" class="fullScreen" v-if="alertShow">
        <div class="centerBox" flex="cross:center dir:top">
            <img src="/static/img/daku.png" alt="" v-if="imgStatus">
            <img src="/static/img/tiaowu.png" alt="" v-else>
            <p>{{errText}}</p>
            <button @click="close">确定</button>
        </div>
    </div>
</template>

<script  type="text/ecmascript-6">
    export default {
        name: 'alert',
        data () {
            return {
                input:false
            }
        },
        computed: {
            alertShow(){
                return this.$store.state.alert.alertHidden
            },
            errText(){
                return this.$store.state.alert.errText
            },
            isIndex(){
                return this.$store.state.alert.isIndex
            },
            imgStatus(){
                return this.$store.state.alert.imgStatus
            },
            back(){
                return this.$store.state.alert.back
            }
        },
        activated(){
            this.input = true;
        },
        mounted() {
        },
        methods : {
            close(){
                if(this.isIndex){
                    this.$store.commit("ALERT_CHANGE",{
                        status:false
                    })
                    this.$router.push({path:'/'});
                    return false;
                }else if(this.back){
                    this.$router.go(-1)
                    this.$store.commit("ALERT_CHANGE",{
                        status:false
                    })
                    return false
                }
                this.$store.commit("ALERT_CHANGE",{
                    status:false
                })
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
    #alert{
        position: fixed;
        background: rgba(0,0,0,.6);
        z-index: 999;
    }
    .centerBox{
        height:250px;
        width:380px;
        margin-left: -190px;
        margin-top: -170px;
        background: #fff;
        text-align: center;
        line-height: 80px;
        padding:30px;
        z-index: 999;
        button{
            width: 100px;
            background: #ff2e6b;
        }
        img{
            height: 70px;
        }
        p{
            font-size: 16px;
            font-weight: bold;
            color: #666;
        }
    }

</style>
