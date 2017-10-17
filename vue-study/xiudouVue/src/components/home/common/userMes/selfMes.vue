<template>
    <div id="selfMes">
        <p class="title"><span style="color: #ff2e6b;">个人信息</span><span class="PartitionBar">|</span><span @click="changePassWord">修改登录密码</span></p>
        <div class="userMesLine" flex="dir:left main:justify">
            <img :src="userInfo.avatar" alt="">
            <ul>
                <li flex="dir:left">昵称:<p>{{userInfo.nick_name}}</p></li>
                <li flex="dir:left">性别:<p>{{userInfo.gender}}</p></li>
                <li flex="dir:left">地区:<p>{{userInfo.province}}</p></li>
                <li flex="dir:left">个性签名:<p style="margin-left: 25px;width: 300px" class="oneLine">{{userInfo.signature}}</p></li>
            </ul>
            <p style="float: right" class="pink hand" @click="toChangeUserMes">修改个人信息</p>
        </div>
        <div class="ContactInformation" flex="dir:left">
            <div id="qrcode"></div>
            <ul>
                <li>手机号:<span>{{userInfo.mobile}}</span></li>
                <li>微博:</li>
                <li>QQ:</li>
                <li>微信:</li>
            </ul>
            <ul>
                <li><span v-if="userInfo.mobile">已绑定</span><span class="pink" v-else>绑定</span></li>
                <li><span><a class="pink" href="https://mobile.xiudou.net/sina/login_h5?type=3&h5=2">绑定</a></span></li>
                <li><span><a class="pink" href="https://mobile.xiudou.net/qq/login_h5?type=3&h5=2">绑定</a></span></li>
                <li><span>请在手机端进行微信绑定</span></li>
            </ul>
        </div>
        <div class="authentication">
            <ul flex="dir:left main:justify">
                <li @click="toAuth">
                    <img src="/static/img/renzheng_gerenhui.png" alt="">
                    <p class="pink" v-if="authenticationStatus.if_vip == 0 && authenticationStatus.if_celebrity_vip == 0 && authenticationStatus.if_official_vip == 0">认证</p>
                    <p class="pink" v-else-if="authenticationStatus.if_vip == 1">已认证</p>
                    <p class="pink" v-else-if="authenticationStatus.if_vip == 2">审核中</p>
                    <p class="pink" v-else-if="authenticationStatus.if_vip == 3">已拒绝</p>
                </li>
                <li @click="toCelebrityVip">
                    <img src="/static/img/renzheng_darenhui.png" alt="">
                    <p class="pink" v-if="authenticationStatus.if_vip == 0 && authenticationStatus.if_celebrity_vip == 0 && authenticationStatus.if_official_vip == 0">认证</p>
                    <p class="pink" v-else-if="authenticationStatus.if_celebrity_vip == 1">已认证</p>
                    <p class="pink" v-else-if="authenticationStatus.if_celebrity_vip == 2">审核中</p>
                    <p class="pink" v-else-if="authenticationStatus.if_celebrity_vip == 3">已拒绝</p>
                </li>
                <li @click="toOfficialVip">
                    <img src="/static/img/renzheng_guanfuanghui.png" alt="">
                    <p class="pink" v-if="authenticationStatus.if_vip == 0 && authenticationStatus.if_celebrity_vip == 0 && authenticationStatus.if_official_vip == 0">认证</p>
                    <p class="pink" v-else-if="authenticationStatus.if_official_vip == 1">已认证</p>
                    <p class="pink" v-else-if="authenticationStatus.if_official_vip == 2">审核中</p>
                    <p class="pink" v-else-if="authenticationStatus.if_official_vip == 3">已拒绝</p>
                </li>
            </ul>
        </div>
        <div class="addressList" flex="dir:left">
            <div v-for="address in addressList">
                <div class="address">
                    <p>{{address.name}}</p>
                    <p>{{address.phone_number}}</p>
                    <p>{{address.location}}{{address.address}}</p>
                    <p class="pink hand" @click="saveAddressId(address)">修改</p>
                </div>
            </div>
            <img src="/static/img/add_address.png" alt="" @click="addAddress">
        </div>
        <reSetAddress :editAddress='editAddress' v-on:changeAddressList="changeAddressList"></reSetAddress>
    </div>
</template>
<script type="text/ecmascript-6">
    import reSetAddress from './reSetAddress.vue'
    export default {
        name: 'selfMes',
        data () {
            return {
                userInfo: '',
                authenticationStatus:'',
                addressList:'',
                editAddress:''
            }
        },
        activated(){

        },
        computed: {
            addressList(){
                return this.changeAddressList();
            }
        },
        components: {reSetAddress},
        mounted(){
            this.takeAddressList();
            this.takeUserMes()
            this.makeQRCode()
            this.takeAuthenticationStatus();
        },
        methods: {
            takeUserMes(){
                let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
                let auth_token = userInfo.auth_token;
                sessionStorage.setItem("auth_token", auth_token);
                util.ajaxPost(this, '1.5', 'user/info', {
                    auth_token: AUTH_TOKEN
                },   (res) => {
                    if (res.body.code != 0) {
                        this.userInfo = res.body;
                        sessionStorage.setItem("userMes",JSON.stringify(res.body))
                    } else {
                        this.$store.commit("ALERT_CHANGE", {
                            status: true,
                            errText: '未查询到您的信息,请您稍后再试',
                            imgStatus: true
                        })
                    }
                })
            },
            makeQRCode(){
                let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
                let user_id = userInfo.user_id
                let url = util.requestUrl();
                let h5Url = 'https://m.xiudou.net/user/storeNormal.html?uid=' + user_id;
                if (url.indexOf('admin.beta') > 0) {
                    h5Url = 'https://m.beta.xiudou.net/user/storeNormal.html?uid=' + user_id;
                } else if (url.indexOf('admin.xiudou.cn') > 0) {
                    h5Url = 'http://m.xiudou.cn/user/storeNormal.html?uid=' + user_id;

                }
                let qrcode = new QRCode('qrcode', {
                    text: h5Url,
                    width: 100,
                    height: 100,
                    colorDark: '#000000',
                    colorLight: '#ffffff',
                    correctLevel: QRCode.CorrectLevel.H
                });
            },
            toAuth(){
                sessionStorage.setItem('authenticationStatus','个人认证')
                this.$router.push("auth")
            },
            toCelebrityVip(){
                sessionStorage.setItem('authenticationStatus','达人认证')
                this.$router.push("auth")
            },
            toOfficialVip(){
                sessionStorage.setItem('authenticationStatus','官方认证')
                this.$router.push("auth")
            },
            takeAuthenticationStatus(){
                util.ajaxPost(this, '1.0', 'user/authentication_info', {
                    auth_token: AUTH_TOKEN
                },  (res) => {
                    if (res.body.code == 0) {
                        this.authenticationStatus = res.body.list
                    } else {
                        this.$store.commit("ALERT_CHANGE", {
                            status: true,
                            errText: '未查询到您的认证信息,请您稍后再试',
                            imgStatus: true
                        })
                    }
                })
            },
            changePassWord(){
                this.$router.push("changePssWord")
            },
            takeAddressList(){
                util.ajaxPost(this, '1.0', 'user/address_list', {
                    auth_token: AUTH_TOKEN
                }, (res) => {
                    if (res.body.code == 0) {
                        localStorage.setItem('addressList',JSON.stringify(res.body.list));
                        this.addressList = res.body.list;
                    }
                })
            },
            changeAddressList(){
                console.log(111)
                setTimeout(()=>{
                    let addressList = JSON.parse(localStorage.getItem('addressList'));
                    console.log(addressList)
                    this.addressList = addressList
                },500)

            },
            saveAddressId(address){
                this.editAddress = address;
                this.$store.commit("ADDRESS_CHANGE",true)
            },
            addAddress(){
                this.editAddress = '';
                this.$store.commit("ADDRESS_CHANGE",true)
            },
            toChangeUserMes(){
                this.$router.push("changeUserMes")
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
    #selfMes{
        position: relative;
    }
    .PartitionBar {
        font-size: 12px;
        margin: 0px 10px;
        position: relative;
        top: -2px;
    }

    .title {
        color: #878787;
        border-bottom: 2px solid #ddd;
        span:hover{
            color: #ff2e6b;
            cursor: pointer;
        }
    }
    .userMesLine {
        height: 165px;
        img {
            height: 100px;
            width: 100px;
            border-radius: 100%;
            margin: 30px 0px;
            border: 1px solid #f2f2f2;
            background: url("/static/img/background.png") no-repeat 50% 50% /cover;
        }
        ul {
            height: 100px;
            margin-top: 20px;
            width: 720px;
            color: #666;
            margin-left: 20px;
            li {
                height: 27px;
                p {
                    margin: 0;
                    margin-left: 50px;
                    color: #666;
                }
            }
        }
        p {
            width: 100px;
            margin-top: 20px;
            color: #ff2e6b;
        }
    }

    .ContactInformation {
        width: 946px;
        height: 160px;
        padding: 30px 0px;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        ul{
            margin-left: 20px;
            li{
                height:25px;
                line-height: 25px;
                span{
                    margin: 0px 0px 0px 30px;
                    text-align: left;
                }
            }
        }

    }

    .authentication{
        height: 200px;
        border-bottom: 1px solid #ddd;
        ul{
            width:480px;
            text-align: center;
            padding:35px 0px;
        }
    }
    .addressList{
        flex-wrap: wrap;
        margin-top: 40px;
        margin-bottom: 200px;
        .address{
            position: relative;
            padding:20px;
            margin-right:40px;
            margin-top: 20px;
            height:180px;
            width:200px;
            border:1px solid #f2f2f2;
            p{
                height: 20px;
                line-height: 20px;
                color: #999;
            }
            p:first-child{
                font-size: 16px;
                color: #666;
            }
            p:last-child{
                position: absolute;
                bottom:20px;
                color: #ff2e6b;
            }
        }
        img{
            height:180px;
            width: 200px;
            margin-right: 50px;
            margin-top: 20px;
        }
    }
</style>
