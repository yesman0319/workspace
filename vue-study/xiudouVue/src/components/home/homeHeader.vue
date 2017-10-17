<template>
	<div id="homeHeader">
        <div  flex="main:justify cross:center" class="head">
            <img src="/static/img/logo_new1.png" @click="backToIndex">
            <ul flex="dir:left">
                <li flex="dir:left main:center"  @click="toKefu" :class="{active:active == 0}">
                    <img :src="serverImg"><span>客服</span><span>|</span>
                </li>
                <li flex="dir:left main:center" @click="toIM" :class="{active:active == 2}">
                    <img :src="IMImg"><span>消息</span><span>|</span>
                </li>
                <li flex="dir:left main:center" @click="toUserMes" :class="{active:active == 4}">
                    <img :src="userInfo.avatar" class="avatar"><span>{{userInfo.nick_name}}</span><span>|</span>
                </li>
                <li>
                    <span @click="signOut">退出</span>
                </li>
            </ul>
        </div>

        <transition name="fade">
            <alerts></alerts>
        </transition>
        <transition name="fade">
            <confirmAlerts></confirmAlerts>
        </transition>
    </div>
</template>

<script type="text/ecmascript-6">
    import alerts from '../alert/alert.vue'
    import confirmAlerts from '../alert/confirmAlert.vue'
	export default {
		name: 'homeHeader',
        components: {alerts,confirmAlerts},
        data () {
			return {
                active:4,
                userInfo:"",
                serverImg:'/static/img/customer.png',
                IMImg:'/static/img/messageN.png'
			}
		},
        mounted(){
            document.title = '秀兜后台管理';
            this.isLogin()
        },
		methods: {
            isSelected(index){
                this.serverImg = "/static/img/customer.png";
                this.IMImg = '/static/img/messageN.png';
                this.active = index;
                switch(index){
                    case 0:
                        this.serverImg = "/static/img/customer_check.png";
                    break;
                    case 2:
                        this.IMImg = '/static/img/messageY.png';
                    break;
                }
                /*let Eli = this.$el.querySelectorAll("li span");
                for(let li of Eli){
                    console.log(li.style.color)
                    if(li.style.color == 'rgb(255, 46, 107)'){
                        li.style.color = "#666"
                    }
                }
                Eli[index].style.color = "#ff2e6b";*/
            },
            backToIndex(){
                this.$router.push({path:'/home/userMes'});
            },
            signOut(){
                this.$router.push({path:'/'});
                sessionStorage.clear()
            },
            isLogin(){
                let userInfoStr = sessionStorage.getItem("userInfo");
                if(userInfoStr == null){
                    this.$store.commit("ALERT_CHANGE",{
                        status:true,
                        errText:"登陆过期,请您重新登陆",
                        isIndex:true
                    })
                    return false;
                }
                let userInfo = JSON.parse(userInfoStr);
                this.userInfo = userInfo;
            },
            toKefu(){
                this.$router.push({name:"kefu"});
                this.isSelected(0);
            },
            toUserMes(){
                this.$router.push({name:"userMes"});
                this.isSelected(4)
            },
            toIM(){
                this.isSelected(2)
            }
        }
	}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
    #homeHeader{
        width: 100%;
        height: 100px;
        background: #fff;
        .head{
            margin:0 auto;
            height: 100%;
            max-width: 1226px;
            img{
                height: 30px;
            }
            ul{
                .active{
                    span{
                        color:#ff2e6b;
                    }
                }
                li{
                    text-align: center;
                    font-size: 16px;
                    color: #666;
                    line-height: 20px;
                    img{
                        height:20px;
                        width: 20px;
                        margin-right: 10px;
                        cursor: pointer;
                    }
                    span{
                        cursor: pointer;
                    }
                    span:nth-child(3){
                        color: #ccc;
                        margin:0px 30px;
                    }
                }
                
            }
        }

    }
</style>
