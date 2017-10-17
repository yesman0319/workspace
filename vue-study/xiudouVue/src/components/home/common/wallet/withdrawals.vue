<template>
    <div id="withdrawals" class="fullScreen" v-if="withdrawalStatus">
        <div class="centerBox" flex="cross:center dir:top">
            <h1>提现</h1>
            <input :placeholder="placeHolder" ref="money" type="number" @focus="errText = false">
            <p @click="showBankList">
                <span>{{bankList[index].bank_name}}</span>
                <span style="margin: 0px 30px">{{bankList[index].true_name}}</span>
                <span>{{bankList[index].card_number}}</span>
                <img src="/static/img/p_buttom.png" alt="">
                <span class="cl"></span>
            </p>
            <div class="banKList" v-if="bankListShow">
                <ul>
                    <li v-for="(item,index) of bankList" @click="takeBankCardId(index)">
                        <p>
                            <span>{{item.bank_name}}</span>
                            <span style="margin: 0px 30px">{{item.true_name}}</span>
                            <span>{{item.card_number}}</span>
                        </p>
                    </li>
                </ul>
            </div>
            <p class="pink" style="line-height: 1;margin:0;height: 15px;border: none;" v-if="errText">{{errText}}</p>
            <div>
                <button @click="close" style="background: #ddd">取消</button>
                <button @click="confirm">确定</button>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'withdrawals',
        data () {
            return {
                bankList: '',
                balance: '',
                bankListShow: false,
                placeHolder: "",
                cardId: '',
                errText:'',
                index:1
            }
        },
        computed: {
            withdrawalStatus(){
                return this.$store.state.wallet.status;
            }
        },
        mounted(){
            this.takeBandList();
        },
        methods: {
            takeBandList(){
                setTimeout(() =>{
                    this.bankList =  util.getStorage("bankList");
                    this.balance = util.getStorage("balance");
                    this.placeHolder = "金额（元） 当前余额 " + util.getStorage("balance");
                },1500)
            },
            showBankList(){
                this.bankListShow == false ? this.bankListShow = true : this.bankListShow = false;
            },
            takeBankCardId(index){
                this.cardId = this.bankList[index].bank_card_id;
                this.index = index;
                this.bankListShow = false;
            },
            close(){
                this.$store.commit("WITHDRAWALS_CHANGE",{
                    status:false
                })
            },
            confirm(){
                let money = this.$refs.money.value;
                if(!money){
                    this.errText = '请输入正确的金额'
                    return false
                }
                if (this.cardId == '') {
                    var id = this.bankList[0].bank_card_id
                } else {
                    var id = this.cardId;
                }
                util.ajaxPost(this, '2.5', 'Wallet/withdraw_money', {
                    auth_token: AUTH_TOKEN,
                    bank_card_id: id,
                    money: money
                }, (res) => {
                    this.$store.commit("WITHDRAWALS_CHANGE",{
                        status:false,
                        detailReload:true
                    })
                    if (res.body.code == 0) {
                        util.alertBox(this, "申请成功,我们会在2-3个工作日内打款给您", false)
                    } else {
                        util.alertBox(this, res.body.message)
                    }
                })
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
    .centerBox {
        height: 250px;
        width: 400px;
        margin-left: -190px;
        margin-top: -170px;
        background: #fff;
        text-align: center;
        line-height: 80px;
        padding: 20px;
        h1 {
            font-size: 18px;
            line-height: 1;
            margin-bottom: 20px;
        }
        p, input {
            text-align: left;
            border: 1px solid #ddd;
            line-height: 30px;
            height: 30px;
            width: 100%;
            padding: 0px 10px;
            margin-bottom: 15px;
        }
        img {
            float: right;
            margin-top: 12px;
        }
        button {
            width: 175px;
            background: #ff2e6b;
        }
        .banKList {
            width: 90%;
            position: absolute;
            top: 134px;
            border: 1px solid #ddd;
            padding: 10px 0px;
            background: #fff;
            li {
                height: 30px;
                line-height: 30px;
                p {
                    border: none;
                }
            }
        }
    }
</style>
