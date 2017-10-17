<template>
	<div id="changeUserMes">
        <p class="title">
            <span style="color: #ff2e6b;">个人信息</span><span class="PartitionBar">|</span><span>修改登录密码</span>
            <button class="sortButton" @click="saveChange">保存</button>
            <p class="cl"></p>
        </p>
        <div class="mesDiv" flex="main:center">
            <div>
                <div  flex="main:center">
                    <img :src="userInfo.avatar" alt="">
                    <input type="file" id="authTop" accept="image/*">
                </div>
                <ul>
                    <li flex="dir:left" class="input">
                        <label>昵称/店名</label>
                        <input type="text" :value="userInfo.nick_name" ref="nickName">
                    </li>
                    <li flex="dir:left">
                        <label>性<span></span>别</label>
                        <!--<input type="radio" name="gender" :checked="checked"><span>男</span>-->
                        <!--<input type="radio" name="gender"><span>女</span>-->

                        <input type="radio" id="one" value="1" v-model="gender" :checked="checked">
                        <label for="one">男</label>
                        <input type="radio" id="two" value="2" v-model="gender" :checked="!checked">
                        <label for="two">女</label>
                    </li>
                    <li>
                        <label>地<span></span>区</label>
                        <select v-model="selectd">
                            <option disabled value="">{{userInfo.province}}</option>
                            <option v-for="address of province" :value="address.district_id">{{address.district_name}}</option>
                        </select>
                    </li>
                    <li flex="dir:left">
                        <label>个性签名</label>
                        <input type="text" :value="userInfo.signature" ref="signature">
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
	export default {
		name: 'changeUserMes',
		data () {
			return {
                userInfo:'',
                checked:true,
                province:'',
                gender:'',
                selectd:''
			}
		},
		computed: {},
		mounted(){
            this.takeUserMes();
            this.takeAddressMes();
		},
		methods: {
            takeUserMes(){
                let userInfo = JSON.parse(sessionStorage.getItem("userMes"));
                this.userInfo = userInfo
                if(userInfo.gender == '男'){
                    this.gender = 1
                }else{
                    this.gender = 2
                }
            },
            takeAddressMes(){
                util.ajaxGet(this, '1.0', 'user/district_list', {"district_id": 1}, (res) => {
                    if (res.body.code == 0) {
                        this.province = res.body.data;
                    }
                })
            },
            saveChange(){
                let nickName = this.$refs.nickName.value;
                let signature = this.$refs.signature.value;
                let gender = this.gender;
                let province = this.selectd;
                util.ajaxPost(this, '1.5', 'user/info_edit', {
                    nick_name:nickName,
                    avatar:'',
                    gender:gender,
                    province:province,
                    signature:signature,
                }, (res) => {
                    if (res.body.code == 0) {
                        this.province = res.body.data;
                    }
                })
            }
        }
	}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
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
    .sortButton{
        float: right;
    }
    .mesDiv{
        div{
            width: 400px;
            height: 400px;
            div{
                height: 100px;
                position: relative;
                input,img{
                    position: absolute;
                    top:0px;
                    height: 100px;
                    width: 100px;
                    border-radius: 50%;
                }
                input{
                    opacity: 0;
                }
            }
            ul{
                li{
                    border-bottom:1px solid #b2b2b2;
                    input{
                        border:none;
                        margin-left: 20px;
                    }
                    span:first-child{
                        margin-left: 28px;
                    }
                    span{
                        margin-left: 10px;
                    }
                    select{
                        margin-left: 15px;
                        height: 40px;
                        width: 82%;
                        border:none;
                    }
                }
            }
        }
        margin:50px 0px;
    }
</style>
