<template>
	<div id="messageControl">
        <div class="title" flex="dir:left">
            <span :class="status == 1 ? 'pink' : ''" @click="status = 1">系统通知(23)</span>
            <span style="margin: 0px 20px;font-size: 12px;">|</span>
            <span :class="status == 1 ?  '' : 'pink'" @click="status = 2">用户消息(19)</span>
        </div>
        <ul class="mesList">
            <li flex="dir:left" v-for="(item,index) of sysMes">
                <router-link to="/" v-if="item.type == 107 ||item.type ==102||item.type ==106 || item.type ==104 || item.type ==40|| item.type==41">
                    <p style="width: 730px" class="canPush">{{item.content}}</p>
                </router-link>
                <router-link to="/" v-else-if="item.type == 25">
                    <p style="width: 730px" class="canPush">{{item.content}}</p>
                </router-link>
                <router-link to="/" v-else-if="item.type == 26">
                    <p style="width: 730px" class="canPush">{{item.content}}</p>
                </router-link>
                <router-link to="/" v-else-if="item.type == 40 ||item.type == 41">
                    <p style="width: 730px" class="canPush">{{item.content}}</p>
                </router-link>
                <router-link to="/" v-else-if="item.type == 43 ||item.type == 42">
                    <p style="width: 730px" class="canPush">{{item.content}}</p>
                </router-link>
                <router-link to="/" v-else-if="item.type == 32">
                    <p style="width: 730px" class="canPush">{{item.content}}</p>
                </router-link>
                <router-link to="/" v-else-if="item.type == 33">
                    <p style="width: 730px" class="canPush">{{item.content}}</p>
                </router-link>
                <router-link to="/home/userMes" v-else-if="item.type == 16 || item.type == 17">
                    <p style="width: 730px" class="canPush">{{item.content}}</p>
                </router-link>
                <p style="width: 730px" v-else>{{item.content}}</p>
                <p style="width: 180px">{{item.add_time}}</p>
                <p @click="delSysMesList(item.msg_id)" class="hand">删除</p>
            </li>
        </ul>
        <div class="buttonDiv" flex="main:right">
            <button class="sortButton" v-if="pageNum == 1" style="background: #ddd">上一页</button>
            <button class="sortButton" v-else @click="pre">上一页</button>
            <button class="sortButton" @click="next" v-if="nextShow">下一页</button>
            <button class="sortButton" v-else style="background: #ddd">下一页</button>
        </div>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		name: 'messageControl',
		data () {
			return {
                sysMes:"",
                pageNum:1,
                nextShow:true,
                status:1
            }
		},
		computed: {},
		mounted(){
            this.takeSysMes();
		},
		methods: {
            takeSysMes(){
                util.ajaxGet(this, '1.8', 'User/sys_message', {
                    auth_token:AUTH_TOKEN,
                    current_page:this.pageNum,
                    item_count:10
                }, (res) => {
                    if (res.body.code == 0) {
                        let items;
                        for(items of res.body.list){
                            items.add_time = util.getMyDate(items.add_time *1000);
                        }
                        this.sysMes = res.body.list;
                        if(res.body.list.length < 10){
                            this.nextShow = false;
                        }
                    }else{
                        util.alertBox(this,"获取信息失败")
                    }
                })
            },
            next(){
                this.pageNum ++;
                this.takeSysMes()
            },
            pre(){
                this.pageNum --;
                this.takeSysMes();
                this.nextShow = true;
            },
            delSysMesList(id){
                util.ajaxPost(this, '2.6', 'user/del_sys_message', {
                    auth_token:AUTH_TOKEN,
                    id:id
                }, (res) => {
                    if (res.body.code == 0) {
                        this.takeSysMes();
                    }else{
                        util.alertBox(this,"删除失败")
                    }
                })
            }
        }
	}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
    .title{
        color: #878787;
        border-bottom: 2px solid #ddd;
    }
    ul{
        li{
            height: 100px;
            line-height: 100px;
            border-bottom: 1px solid #ddd;
            a{
                height: 20px;
                line-height: 20px;
                margin-top: 40px;
            }
            .canPush{
                color: #0066CC;
                height: 20px;
                &:hover{
                    text-decoration: underline;
                }
            }
            .hand{
                height: 20px;
                line-height: 20px;
                margin-top: 40px;
            }
        }
    }
    .buttonDiv{
        margin-top: 20px;
        button{
            margin-left: 10px;
        }
    }
</style>
