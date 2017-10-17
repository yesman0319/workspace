<template>
	<div id="auth">
        <div flex="main:justify" v-if="authenticationStatus">
            <p class="title pink">{{authenticationStatus}}</p>
            <button class="sortButton" @click="sendAuthMes">提交申请</button>
        </div>
        <div class="easyMes">
            <p class="childTitle">基本信息<span>请如实填写真实姓名和身份证号，否则将无法提现</span></p>
            <ul flex="dir:left" style="flex-wrap: wrap">
                <li flex="dir:left">
                    <label>真实姓名:</label>
                    <input type="text" ref="name">
                </li>
                <li flex="dir:left">
                    <label>微信号:</label>
                    <input type="text" ref="wechat">
                </li>
                <li flex="dir:left">
                    <label>身份证号:</label>
                    <input type="text" ref="IDcard">
                </li>
                <li flex="dir:left">
                    <label>手机号:</label>
                    <input type="text" ref="phone">
                </li>
            </ul>
            <div v-if="authenticationStatus !== '官方认证'">
                <p>身份证<span>点击示例图片上传身份证正面和背面</span></p>
                <div flex="dir:left">
                    <div>
                        <img src="/static/img/idcardfront.png" alt="">
                        <input type="file" id="authTop" accept="image/*" @change="showImgTop">
                        <p>上传正面</p>
                    </div>
                    <div style="margin-left: 20px">
                        <img src="/static/img/idcardback.png" alt="">
                        <input type="file" id="authBottom" accept="image/*">
                        <p>上传背面</p>
                    </div>
                </div>
            </div>
            <div v-else class="officeDiv">
                <p class="childTitle">官方信息</p>
                <div flex="dir:left">
                    <div>
                        <img src="/static/img/add.png" alt="">
                        <input type="file" id="authTop" accept="image/*" @change="showImgTop">
                        <p>上传企业营业执照副本复印件加盖公章</p>
                    </div>
                    <div style="margin-left: 20px">
                        <img src="/static/img/add.png" alt="">
                        <input type="file" id="authBottom" accept="image/*">
                        <p>上传法人身份证正反面复印件+公司盖章+法人签字</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="authCelebrity" v-if="authenticationStatus === '达人认证'">
            <p class="childTitle">达人信息</p>
            <div flex="dir:left">
                <label>达人信息:</label>
                <input type="text" ref="authCelebrity" placeholder="请输入微博或微信账号">
            </div>
        </div>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		name: 'auth',
		data () {
			return {
                authenticationStatus:""
            }
		},
		computed: {

        },
        activated(){
            this.takeAuthStatu();
        },
		methods: {
            takeAuthStatu(){
                let authenticationStatus = sessionStorage.getItem("authenticationStatus");
                this.authenticationStatus = authenticationStatus;
            },
            sendAuthMes(){
                let name = this.$refs.name.value;
                let wechat = this.$refs.wechat.value;
                let IDcard = this.$refs.IDcard.value;
                let phone = this.$refs.phone.value;
                this.$store.commit("ALERT_CHANGE", {
                    status: true,
                    errText: '成功!',
                    imgStatus: false
                })
                this.alertMes(util.isPhoneNumber(phone) == 'success','请输入正确的手机号码');
                this.alertMes(phone,'请输入您的手机号')
                this.alertMes(IDcard,'请输入您的身份证号码')
                this.alertMes(wechat,'请输入您的微信号')
                this.alertMes(name,'请输入您的姓名');
                util.ajaxPost(this, '2.7.32', 'user/auth_personal', {
                        id_back_image:'/Public/images/upload/id_images/201707/5b00c7559f1aa20859c62548e77ee954_750_600.jpeg',
                        id_front_image:'/Public/images/upload/id_images/201707/5473feac25394a4d08b503ad9e016706_750_750.png',
                        wx_id:wechat,
                        id_serial:IDcard,
                        true_name:name,
                        phone_number:phone
                }, (res) => {
                    if (res.body.code != 0) {
                        console.log(res.body)
                        this.$store.commit("ALERT_CHANGE", {
                            status: true,
                            errText: '认证资料已发送,请耐心等待',
                            imgStatus: false,
                            back:true
                        })
                    } else {
                        this.$store.commit("ALERT_CHANGE", {
                            status: true,
                            errText: '未查询到您的信息,请您稍后再试',
                            imgStatus: true
                        })
                    }
                })
            },
            alertMes(value,errText){
                if(!value){
                    this.$store.commit("ALERT_CHANGE", {
                        status: true,
                        errText: errText,
                        imgStatus: true
                    })
                    return false;
                }
            },
            showImgTop(){
                let file = this.$el.querySelector("#authTop").files;
                let timeNow = new Date().getTime();
                console.log(timeNow)
                if(file.size > 1024 * 1024 * 2) {
                    this.$store.commit("ALERT_CHANGE", {
                        status: true,
                        errText: '上传图片不能大于2M',
                        imgStatus: true
                    })
                    return false;
                }else{
                    this.$http.post("http://images.xiudou.cn/FileUpload_xd.php", {
                            params: {
                                myfiles:file[0].name,
                                type:15,
                                img_timestamp:timeNow,
                                img_token:md5('xd_unique_image' + timeNow)
                            },
                        })
                        .then(
                            (res) => {
                                if (res.body.code == 0) {
                                    console.log(res.body)
                                } else {
                                    console.log(res.body)

//                                    this.$store.commit("ALERT_CHANGE", {
//                                        status: true,
//                                        errText: res.body.message,
//                                        imgStatus: true
//                                    })
                                }
                            },
                            (res) => {
                                this.$store.commit("ALERT_CHANGE", {
                                    status: true,
                                    errText: '接口未响应',
                                    imgStatus: true
                                })
                            })
                        .catch(
                            (res) => {
                                this.$store.commit("ALERT_CHANGE", {
                                    status: true,
                                    errText: 'Err:程序错误',
                                    imgStatus: true
                                })
                            })
                }
            }
        }
	}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
    @mixin title{
        font-size: 22px;
        color: #000;
        font-weight: 600;
        margin-top: 20px;
    }
    .childTitle{
        @include title;
    }
    #auth{
        div:first-child{
            border-bottom: 2px solid #ddd;
        }
        .easyMes{
            span{
                font-size: 12px;
                color: #b2b2b2;
                margin-left: 15px;
                font-weight: normal;
            }
            ul{
                width: 820px;
                li{
                    height: 40px;
                    width:340px;
                    border-bottom:1px solid #dddddd;
                    input{
                        width: 250px;
                        margin-left: 30px;
                        border-color:#ddd;
                    }
                }
                li:nth-child(even){
                    margin-left: 100px;
                }
            }
            p{
                span{
                    font-size: 12px;
                    margin-left: 5px;
                    color: #b2b2b2;
                }
            }
            div{
                border:none;
                position: relative;
            }
            input[type='file']{
                height: 120px;
                width:160px;
                top:0px;
                position: absolute;
                z-index: 1;
                opacity: 0;
            }
            img{
                height: 120px;
                width:160px;
            }
        }
        .authCelebrity{
            margin-top: 20px;
            width:340px;
            border-bottom:1px solid #dddddd;
            input{
                width: 250px;
                margin-left: 30px;
                border:none;
            }
        }
        .officeDiv{
            div{
                margin-top: 20px;
                img{
                    height:100px;
                    width:100px;
                }
                p{
                    width: 240px;
                    line-height: 1.5;
                    margin-top: 15px;
                }
            }
        }
    }
</style>
