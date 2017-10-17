<template>
	<div id="moneyTitle">
        <div flex="main:justify cross:center">
            <p class="pink">余额 ￥ <span class="pink">{{moneyNum.balance}}</span></p>
            <button class="sortButton" @click="takeWithdrawals">提现</button>
        </div>
        <div flex="main:justify">
            <p>交易中<span>{{moneyNum.trading_money}}</span></p>
            <p>提现中<span>{{moneyNum.withdrawing_money}}</span></p>
        </div>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		name: 'moneyTitle',
		data () {
			return {
                moneyNum:''
            }
		},
		computed: {
            withdrawalStatus(){
                return this.$store.state.wallet.status;
            }
        },
        watch:{
            withdrawalStatus(){
                this.takeMoneyNum()
            }
        },
		mounted(){
            this.takeMoneyNum();
		},
		methods: {
            takeMoneyNum(){
                util.ajaxPost(this, '2.5', 'Wallet/wallet_info', {
                    auth_token: AUTH_TOKEN
                }, (res) => {
                    if(res.body.code == 0){
                        this.moneyNum = res.body;
                        util.saveStorage('balance',res.body.balance)
                    }else{
                        util.alertBox(this,res.body.message)
                    }
                })
            },
            takeWithdrawals(){
                util.ajaxPost(this, '2.5', 'Wallet/get_user_status', {
                    auth_token: AUTH_TOKEN
                }, (res) => {
                    if(res.body.code == 0){
                        this.$store.commit("WITHDRAWALS_CHANGE",{
                            status:true
                        })
                    }else{
                        util.alertConfirmBox(this,"需要认证才能提现",true)
                    }
                })
            }
        }
	}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
    #moneyTitle{
        width: 500px;
        height: 260px;
        background: #fff;
        padding: 0px 40px;
        div:first-child{
            height: 200px;
            border-bottom: 1px solid #ddd;
            p{
                font-size: 18px;
            }
            span{
                font-size: 36px;
                margin-left: 40px;
            }
        }
        div:last-child{
            font-size: 18px;
            margin-right: 40px;
            height: 60px;
            line-height: 60px;
            p{
                width: 50%;
            }
            p:last-child{
                text-align: right;
                border-left:1px solid #ddd;
            }
        }
    }
</style>
