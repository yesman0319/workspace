<template>
    <div id="login" class="fullScreen">
        <div class="loginBox centerBox">
            <div  flex="main:center">
                <img src="/static/img/logo_new.png" alt="logo">
            </div>
            <div class="loginContiner">
                <input type="text" placeholder="请输入您的注册手机号码" ref="userName" autofocus>
                <input type="password" placeholder="请输入您的密码" ref="passWord">
                <button class="longButton" @click="checkUserMes">登陆</button>
                <div flex="main:justify">
                    <div><input type="checkbox"> 记住密码</div>
                    <div style="cursor: pointer"><span @click="toForgetPage">忘记密码</span> | <span style="color:#ff2e6b;" @click="toRegister">注册</span></div>
                </div>
                <p>秀兜建议您使用谷歌，火狐，360浏览器</p>
                <div class="loginWay" flex="main:justify">
                    <img src="/static/img/xinlang.png">
                    <img src="/static/img/weixin.png">
                    <img src="/static/img/QQ.png">
                </div>
                <p>第三方登陆</p>
            </div>
        </div>

        <!--子组件:弹窗-->
        <transition name="fade">
            <alerts></alerts>
        </transition>

        <!--子组件:忘记密码-->
        <transition name="fade">
            <forgetMes></forgetMes>
        </transition>
    </div>
</template>

<script type="text/ecmascript-6">
    import alerts from '../alert/alert.vue'
    import forgetMes from './forgetMes.vue'
    export default {
        name: 'login',
        components: {alerts,forgetMes},
        data () {
            return {

            }
        },
        mounted(){
            let that = this;
            document.title = '登陆';
            document.onkeydown = function(e) {
                if(e.keyCode == 13){
                    that.checkUserMes()
                }
            }
        },
        methods : {
            checkUserMes(){
                let userName = this.$refs.userName.value;
                let passWord = this.$refs.passWord.value;
                if(!userName){
                    this.$store.commit("ALERT_CHANGE",{
                        status:true,
                        errText:"请输入用户名",
                        imgStatus:true
                    })
                    return;
                }else if(!passWord){
                    this.$store.commit("ALERT_CHANGE",{
                        status:true,
                        errText:"请输入密码",
                        imgStatus:true
                    })
                    return;
                }else{
                    if (util.isPhoneNumber(this.$refs.userName.value) == 'success') {
                        util.ajaxPost(this, '1.0', 'user/sign_in', {
                            username:userName,
                            password:passWord
                        },    (res) => {
                            if(res.body.code == 0){
                                sessionStorage.setItem("userInfo",JSON.stringify(res.body));
                                global.AUTH_TOKEN = res.body.auth_token;
                                this.$router.push({path:'/home/userMes'});
                            }else{
                                this.$store.commit("ALERT_CHANGE",{
                                    status:true,
                                    errText:res.body.message,
                                    imgStatus:true
                                })
                            }
                        })
                    }else{
                        this.$store.commit("ALERT_CHANGE",{
                            status:true,
                            errText:util.isPhoneNumber(this.$refs.userName.value),
                            imgStatus:true
                        })
                    }
                }
            },
            toForgetPage(){
                this.$store.commit('FORGETPAGE_CHANGE',{
                    status:true,
                    title:"找回密码"

                })
            },
            toRegister(){
                this.$store.commit('FORGETPAGE_CHANGE',{
                    status:true,
                    title:"注册"
                })
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
    #login{
        color: #b2b2b2;
        background:#000;
        .loginBox{
            height: 450px;
            width:450px;
            margin-left: -225px;
            margin-top: -225px;
            img{
                height: 50px;
                margin-bottom: 40px;
            }
            .loginContiner{
                background: #fff;
                padding:30px 50px;
                input{
                    width:350px;
                    height:40px;
                }
                button{
                    margin-top: 20px;
                    margin-bottom: 10px;
                }
                input[type=checkbox]{
                    display: inline;
                    width: 13px;
                    height: 13px;
                    margin-right: 3px;
                    margin-top: -1px;
                }
                p{
                    margin:10px 0px;
                }
                .loginWay{
                    img{
                        margin:0;
                    }
                    margin-top: 40px;
                    width:200px;
                    margin-left: 75px;
                }
                .loginWay + p{
                    text-align: center;
                    margin: 0;
                    margin-top: 10px;
                }
            }
        }
    }

</style>
