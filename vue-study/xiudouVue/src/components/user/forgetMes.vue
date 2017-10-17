<template>
    <div id="example" v-if="forgetPageShow">
        <div class="forgetBox fullScreen">
            <div class="centerBox">
                <p>{{publicTitle}}</p>

                <div class="areaList" v-if="areaShow">
                    <ul>
                        <li v-for="(area,index) of areaList" flex="main:justify" class="underLineInput"
                            @click.stop="changeArea(index)">
                            <div>{{area.areaNum}}</div>
                            <div>{{area.areaName}}</div>
                        </li>
                    </ul>
                </div>

                <div class="phoneNumber underLineInput" flex="dir:left">
                    <div flex-box="1" flex="dir:left" @click="isAreaShow">
                        <span style="width:30px">{{areaNum}}</span>
                        <img src="/static/img/p_buttom.png" alt="">
                    </div>
                    <div flex-box="4">
                        <input type="text" placeholder="请输入注册手机号" id="phoneNumber" ref="phoneNumber">
                    </div>
                </div>

                <!--没什么卵用的图片验证码,找不到接口-->
                <!--<div class="underLineInput" flex="dir:left">-->
                <!--<div flex-box="4">-->
                <!--<input type="text" placeholder="验证码" id="checkCode">-->
                <!--</div>-->
                <!--<div flex-box="2">-->
                <!--<img src="/static/img/p_buttom.png" alt="">-->
                <!--</div>-->
                <!--</div>-->

                <div class="underLineInput" flex="dir:left">
                    <div flex-box="8">
                        <input type="text" placeholder="手机验证码" id="checkCode" ref="checkedCode">
                    </div>
                    <div flex-box="2">
                        <button flex="main:center" class="getCode" @click="takeCheckCode" v-if="checkCodeStatu">获取验证码
                        </button>
                        <button flex="main:center" class="getCode" id="load" v-if="!checkCodeStatu">重新发送({{number}})
                        </button>
                    </div>
                </div>

                <div class="underLineInput">
                    <input type="password" placeholder="请输入密码" ref="passWord">
                </div>

                <div class="underLineInput">
                    <input type="password" placeholder="确认密码" ref="surePassWord">
                </div>

                <div flex="dir:left">
                    <button flex-box="1" class="sortButton" @click="backToLogin">
                        <div>取消</div>
                    </button>
                    <button flex-box="1" class="sortButton" @click="confirm">确认</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'example',
        data () {
            return {
                areaList: [
                    {"areaNum": "+86", "areaName": "中国大陆"},
                    {"areaNum": "+852", "areaName": "中国香港"},
                    {"areaNum": "+853", "areaName": "中国澳门"},
                    {"areaNum": "+886", "areaName": "中国台湾"},
                    {"areaNum": "+81", "areaName": "日本"},
                    {"areaNum": "+82", "areaName": "韩国"}
                ],
                areaShow: false,
                areaNum: "+86",
                checkCodeStatu: true,
                number: 60
            }
        },
        computed: {
            forgetPageShow(){
                return this.$store.state.forgetChange.forgetHidden;
            },
            publicTitle(){
                return this.$store.state.forgetChange.publicTitle;
            }
        },
        mounted(){

        },
        methods: {
            isAreaShow(){
                this.areaShow = true;
            },
            changeArea(index){
                this.areaNum = this.areaList[index].areaNum;
                this.areaShow = false;
            },
            takeCheckCode: function () {
                let phoneNumber = this.$refs.phoneNumber.value;
                let publicTitle = this.publicTitle;
                if (util.isPhoneNumber(phoneNumber) == 'success') {
                    util.ajaxPost(this, '1.9', 'sms/registedSend', {
                        mobile: phoneNumber,
                        area: this.areaNum
                    }, (res) => {
                        if (res.body.code != 0) {
                            this.$store.commit("ALERT_CHANGE", {
                                status: true,
                                errText: res.body.message,
                                imgStatus:true
                            })
                        } else {
                            this.checkCodeStatu = false;
                            let CountDown = setInterval(()=> {
                                this.number--;
                                if (this.number == 0) {
                                    clearInterval(CountDown)
                                    this.number = 60;
                                    this.checkCodeStatu = true;
                                    return;
                                }
                            }, 100)
                            setInterval(CountDown)
                        }
                    })
                } else {
                    this.$store.commit("ALERT_CHANGE", {
                        status: true,
                        errText: util.isPhoneNumber(phoneNumber)
                    })
                }

            },
            backToLogin(){
                this.$store.commit("FORGETPAGE_CHANGE", false)
            },
            confirm(){
                let phoneNumber = this.$refs.phoneNumber.value,
                    checkCode = this.$refs.checkedCode.value,
                    passWord = this.$refs.passWord.value,
                    surePassWord = this.$refs.surePassWord.value;
                if (!phoneNumber || !checkCode || !passWord || !surePassWord) {
                    this.$store.commit("ALERT_CHANGE", {
                        status: true,
                        errText: '请您确保正确填入了所有信息',
                        imgStatus:true
                    })
                } else if (passWord != surePassWord) {
                    this.$store.commit('ALERT_CHANGE', {
                        status: true,
                        errText: "两次输入的密码不一致",
                        imgStatus:true
                    })
                } else {
                    if (this.publicTitle == "找回密码") {
                        this.beforeConfirm({
                            version:"2.0",
                            urlName: "user/find_back_password",
                            phoneNumber,
                            passWord,
                            checkCode
                        })
                    } else {
                        this.beforeConfirm({
                            version:"2.0",
                            urlName: 'user/sign_up',
                            phoneNumber,
                            passWord,
                            checkCode
                        },"signUp")
                    }
                }
            },
            beforeConfirm(message,signUp){
                util.ajaxPost(this, message.version, message.urlName, {
                    phone_number: message.phoneNumber,
                    password: message.passWord,
                    code: message.checkCode
                },  (res) => {
                    if (res.body.code == 0) {
                        if(signUp){
                            util.ajaxPost(this, "1.0", 'user/sign_in', {
                                username:userName,
                                password:passWord
                            }, (res) => {
                                if(res.body.code == 0){
                                    sessionStorage.setItem("userInfo",JSON.stringify(res.body))
                                    this.$router.push({path:'/home'});
                                }else{
                                    this.$store.commit("ALERT_CHANGE",{
                                        status:true,
                                        errText:res.body.message,
                                        imgStatus:true
                                    })
                                }
                            })
                            this.$router.push({path: '/home'})
                            return false;
                        }
                        this.$router.push({path: '/home'})
                    } else {
                        this.$store.commit("ALERT_CHANGE", {
                            status: true,
                            errText: res.body.message,
                            imgStatus:true
                        })
                    }
                })
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
    .centerBox {
        height: 450px;
        width: 450px;
        background: #fff;
        margin-top: -225px;
        margin-left: -225px;
        padding: 50px;
        p {
            text-align: center;
            color: #000;
            font-size: 16px;
            font-weight: 400;
            margin-bottom: 20px;
        }
        img {
            height: 6px;
            margin-left: 15px;
            margin-top: 18px;
            width: 8px;
        }
        .longButton {
            margin-top: 20px;
        }
        .getCode {
            background: #ffffff;
            color: #000;
            border: 1px solid #b2b2b2;
            border-top: none;
            width: 100%;
            font-size: 14px;
            &:hover {
                background: #000;
                color: #fff;
            }
        }
        #load {
            background: #d2d2d2;
            color: #fff;
        }
        .sortButton {
            background: #000;
            margin-top: 30px;
            div {
                border-right: 1px solid #fff;
            }
        }
        .areaList {
            position: absolute;
            width: 350px;
            background: #fff;
            margin-top: 39px;
        }
    }
</style>
