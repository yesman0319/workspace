<template>
	<div id="detail">
        <div flex="main:justify cross:center">
            <p style="font-size: 18px">明细</p>
        </div>
        <div class="detailList">
            <ul>
                <li v-for="item of detailList">
                    <div flex="dir:left" style="position: relative">
                        <p style="color:#2CE46C" v-if="item.action == 1">收入</p>
                        <p class="pink" v-else>支出</p>
                        <p style="margin: 0px 20px;">{{item.money}}</p><p style="position: absolute;right: 0px;">{{item.create_time}}</p></div>
                    <div flex="dir:left"><p>{{item.detail}}</p></div>
                </li>
            </ul>
        </div>
        <div flex="dir:left">
            <button class="sortButton" style="background: #ccc" v-if="current_page == 1">上一页</button>
            <button class="sortButton"  v-else @click="back">上一页</button>
            <button class="sortButton" @click="next" v-if="code">下一页</button>
            <button class="sortButton"  v-else style="background: #ccc">下一页</button>
        </div>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		name: 'detail',
		data () {
			return {
                detailList:'',
                current_page:1,
                code:true
			}
		},
        computed: {
            detailReload(){
                return this.$store.state.wallet.detailReload;
            }
        },
        watch:{
            detailReload(){
                this.takeDetailList()
            }
        },
		mounted(){
            this.takeDetailList();
		},
		methods: {
            takeDetailList(){
                util.ajaxPost(this, '2.5', 'Wallet/withdraw_detail', {
                    auth_token: AUTH_TOKEN,
                    current_page:this.current_page,
                    item_count:7
                }, (res) => {
                    if(res.body.code == 0){
                        this.detailList = res.body.list
                    }else{
                        this.code = false
                    }
                })
            },
            next(){
                this.current_page ++;
                this.takeDetailList();
            },
            back(){
                this.current_page --;
                if(this.current_page == 1){
                    this.code = true
                }
                this.takeDetailList();
            }
        }
	}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
    #detail{
        height: 660px;
        width: 500px;
        background: #fff;
        margin-left: 20px;
        padding:40px;
        .detailList{
            margin-top: 22px;
            border-top: 2px solid #ddd;
            height: 485px;
            margin-bottom: 20px;
            overflow-y: auto;
            ul{
                li{
                    line-height:2;
                    padding:10px 0px;
                    border-bottom: 1px solid #ddd;
                }
            }
        }
        button:first-child{
            margin-right: 20px;
            margin-left: 200px;
        }

    }
</style>
