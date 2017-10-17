<template>
	<div id="bankCard">
        <div flex="main:justify cross:center">
            <p>银行卡</p>
            <button class="sortButton" @click="addBankCard">+添加银行卡</button>
        </div>
        <div class="cardList">
            <ul>
                <li flex="dir:left" v-for="(item,index) of bankCardList">
                    <p>{{item.bank_name}}</p>
                    <p>{{item.true_name}}</p>
                    <p>{{item.card_number}}</p>
                    <p class="hand" @click="delBankCard(index)">解除绑定</p>
                </li>
            </ul>
        </div>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		name: 'bankCard',
		data () {
			return {
                bankCardList:''
            }
		},
		computed: {
            addBankCards(){
                return this.$store.state.wallet.addBankCard;
            }
        },
        watch:{
            addBankCards(){
                this.takeBankCardList();
            }
        },
		mounted(){
            this.takeBankCardList();
		},
		methods: {
            takeBankCardList(){
                util.ajaxPost(this, '2.5', 'Wallet/bank_card_list', {
                    auth_token: AUTH_TOKEN
                }, (res) => {
                    if(res.body.code == 0){
                        this.bankCardList = res.body.list;
                        util.saveStorage("bankList",res.body.list)
                    }else{
                        util.alertBox(this,res.body.message)
                    }
                })
            },
            addBankCard(){
                this.$store.commit("WITHDRAWALS_CHANGE",{
                    addBankCard:true
                })
            },
            delBankCard(index){
                let id = this.bankCardList[index].bank_card_id
                util.ajaxPost(this, '2.5', 'Wallet/unbind_bank_card', {
                    auth_token: AUTH_TOKEN,
                    bank_card_id:id
                }, (res) => {
                    if(res.body.code == 0){
                        util.alertBox(this,"解除绑定成功",false);
                        this.takeBankCardList();
                    }else{
                        util.alertBox(this,res.body.message)
                    }
                })
            }
        }
	}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
    #bankCard{
        width: 500px;
        height: 380px;
        margin-top: 20px;
        background: #fff;
        margin-bottom: 100px;
        padding:40px;
        div:first-child{
            p{
                font-size: 18px;
            }
        }
        .cardList{
            height: 250px;
            border-top: 2px solid #ddd;
            margin-top: 30px;
            ul{
                height: 100%;
                overflow-y: auto;
                li{
                    height: 60px;
                    border-bottom: 1px solid #ddd;
                    line-height: 60px;
                    p:nth-child(1){
                        width: 84px;
                    }
                    p:nth-child(2){
                        width: 105px;
                    }
                    p:nth-child(3){
                        width: 168px;
                    }
                }
            }
        }
    }
</style>
