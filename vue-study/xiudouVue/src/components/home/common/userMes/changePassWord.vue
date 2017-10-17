<template>
    <div id="changePassWord">
        <div flex="main:justify">
            <p class="title"><span @click="back">个人信息</span><span class="PartitionBar">|</span><span class="pink">修改登录密码</span>
            </p>
            <button class="sortButton" @click="confirm">保存</button>
        </div>
        <div class="passWordDiv">
            <ul>
                <li flex="main:justify">
                    <p flex-box="1">已验证手机</p>
                    <input type="text" :value="phoneNumber" flex-box="10" style="border: none;" ref="phoneNumbers">
                </li>
                <li flex="main:justify">
                    <p flex-box="1">手机验证码</p>
                    <input type="text" flex-box="8" style="margin-right: 20px;" ref="checkedCodes">
                    <!--<button flex-box="2">获取短信验证码</button>-->
                    <button flex-box="2" @click="takeCheckCode" v-if="checkCodeStatu">获取短信验证码
                    </button>
                    <button flex-box="2" id="load" v-if="!checkCodeStatu">重新发送({{number}})
                    </button>
                </li>
                <li flex="main:justify">
                    <p flex-box="1">新<span style="margin: 0px 6px;">密</span>码</p>
                    <input type="password" flex-box="10" ref="passWords">
                </li>
                <li flex="main:justify">
                    <p flex-box="1">确认密码</p>
                    <input type="password" flex-box="10" ref="surePassWords">
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'example',
        data () {
            return {
                phoneNumber: '',
                checkCodeStatu: true,
                number: 60
            }
        },
        computed: {},
        mounted(){
            this.takePhoneNumber()
        },
        methods: {
            back(){
                this.$router.go(-1)
            },
            takePhoneNumber(){
                let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
                this.phoneNumber = userInfo.phone_number;
            },
            sendAuthMes(){

            },
            takeCheckCode: function () {
                let phoneNumber = this.phoneNumber;
                if (util.isPhoneNumber(phoneNumber) == 'success') {
                    util.ajaxPost(this, '1.9', 'sms/registedSend', {
                        mobile: phoneNumber,
                        area: this.areaNum
                    },    (res) => {
                        if (res.body.code != 0) {
                            this.$store.commit("ALERT_CHANGE", {
                                status: true,
                                errText: res.body.message,
                                imgStatus: true
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
            confirm(){
                let phoneNumber = this.$refs.phoneNumbers.value,
                    checkCode = this.$refs.checkedCodes.value,
                    passWord = this.$refs.passWords.value,
                    surePassWord = this.$refs.surePassWords.value;
                if (!phoneNumber || !checkCode || !passWord || !surePassWord) {
                    this.$store.commit("ALERT_CHANGE", {
                        status: true,
                        errText: '请您确保正确填入了所有信息',
                        imgStatus: true
                    })
                } else if (passWord != surePassWord) {
                    this.$store.commit('ALERT_CHANGE', {
                        status: true,
                        errText: "两次输入的密码不一致",
                        imgStatus: true
                    })
                } else {
                    if (this.publicTitle == "找回密码") {
                        this.beforeConfirm({
                            version: "2.0",
                            urlName: "user/find_back_password",
                            phoneNumber,
                            passWord,
                            checkCode
                        })
                    } else {
                        this.beforeConfirm({
                            version: "2.0",
                            urlName: 'user/sign_up',
                            phoneNumber,
                            passWord,
                            checkCode
                        }, "signUp")
                    }
                }
            },
            beforeConfirm(message, signUp){
                util.ajaxPost(this, message.version, message.urlName, {
                    phone_number: message.phoneNumber,
                    password: message.passWord,
                    code: message.checkCode
                },(res) => {
                    if (res.body.code == 0) {
                        this.$store.commit("ALERT_CHANGE", {
                            status: true,
                            errText: '修改成功',
                            imgStatus: true
                        })
                        this.$router.go(-1)
                    } else {
                        this.$store.commit("ALERT_CHANGE", {
                            status: true,
                            errText: res.body.message,
                            imgStatus: true
                        })
                    }
                })
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
    #load {
        background: #d2d2d2;
        color: #fff;
    }

    #changePassWord {
        div:first-child {
            border-bottom: 2px solid #ddd;
        }
    }

    .PartitionBar {
        font-size: 12px;
        margin: 0px 10px;
        position: relative;
        top: -2px;
    }

    .title {
        color: #878787;
        span:hover {
            color: #ff2e6b;
            cursor: pointer;
        }
    }

    .passWordDiv {
        ul {
            margin-top: 20px;
            li {
                line-height: 30px;
                height: 30px;
                margin: 5px 0px;
                input {
                    height: 30px;
                    border: 1px solid #ddd;
                }
                button {
                    height: 30px;
                    background: #0697DA;
                    font-size: 12px;
                }
            }
        }
    }
</style>
