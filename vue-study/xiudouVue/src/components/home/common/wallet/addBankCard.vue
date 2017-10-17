<template>
    <div id="addBankCard" class="fullScreen" v-if="addBankCard">
        <div class="centerBox" flex="cross:center dir:top">
            <h1>绑定银行卡</h1>
            <ul>
                <li flex="dir:left main:justify">
                    <p>真实姓名</p>
                    <input type="text" ref="name" :style="nameErrStyle" @focus="nameErrStyle = {'border-color':'#ddd'}">
                </li>
                <li flex="dir:left main:justify">
                    <p>账户号</p>
                    <input type="number" ref="cardNum" :style="cardNumErrStyle"
                           @focus="cardNumErrStyle = {'border-color':'#ddd'}">
                </li>
                <li flex="dir:left main:justify" @click="cardType ? cardType = false : cardType = true">
                    <p>账户类型</p>
                    <input type="text" readonly :value="cardTypeValue" :style="cardTypeErrStyle"
                           @focus="cardTypeErrStyle = {'border-color':'#ddd'}">
                    <img src="/static/img/p_buttom.png" alt="">
                    <div class="cardType" v-if="cardType">
                        <p @click="cardTypeValue = '个人账户'">个人账户</p>
                        <p @click="cardTypeValue = '公司账户'">公司账户</p>
                    </div>
                </li>
                <li flex="dir:left main:justify" @click="cardPlace ? cardPlace = false : cardPlace = true">
                    <p>开户地区</p>
                    <input type="text" readonly :value="selectedCardPlace" :style="cardPlaceErrStyle"
                           @focus="cardPlaceErrStyle = {'border-color':'#ddd'}">
                    <img src="/static/img/p_buttom.png" alt="">
                    <div class="cardPlace" v-if="cardPlace">
                        <p @click="selectedCardPlace = cardPlaceList[index].district_name"
                           v-for="(item,index) of cardPlaceList">
                            {{item.district_name}}</p>
                    </div>
                </li>
                <li flex="dir:left main:justify" @click="bankName ? bankName = false : bankName = true">
                    <p>开户银行</p>
                    <input type="text" readonly :value="selectedBank" :style="cardBankErrStyle"
                           @focus="cardBankErrStyle = {'border-color':'#ddd'}">
                    <img src="/static/img/p_buttom.png" alt="">
                    <div class="bankList" v-if="bankName">
                        <p @click="saveBankId(index)" v-for="(item,index) of bankList">
                            {{item.bank_name}}</p>
                    </div>
                <li flex="dir:left main:justify">
                    <p>开户支行</p>
                    <input type="text" ref="BankChildName" :style="bankChildErrStyle"
                           @focus="bankChildErrStyle = {'border-color':'#ddd'}">
                </li>
            </ul>
            <div>
                <button @click="close" style="background: #ddd">取消</button>
                <button @click="confirm">确定</button>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'addBankCard',
        data () {
            return {
                cardType: false,
                cardTypeValue: '',
                cardPlaceList: '',
                selectedCardPlace: '',
                cardPlace: false,
                bankList: '',
                selectedBankId:'',
                selectedBank: '',
                bankName: false,
                nameErrStyle: '',
                cardNumErrStyle: '',
                cardTypeErrStyle: '',
                cardPlaceErrStyle: '',
                cardBankErrStyle: '',
                bankChildErrStyle: ''
            }
        },
        computed: {
            addBankCard(){
                return this.$store.state.wallet.addBankCard;
            }
        },
        mounted(){
            this.takeCardPlace();
            this.takeBankList();
        },
        methods: {
            takeCardPlace(){
                util.ajaxPost(this, '1.0', 'user/district_list', {
                    district_id: 1
                }, (res) => {
                    if (res.body.code == 0) {
                        this.cardPlaceList = res.body.data
                    } else {
                        util.alertBox(this, res.body.message)
                    }
                })
            },
            takeBankList(){
                util.ajaxPost(this, '1.0', 'pay/bank_list', {},
                    (res) => {
                        if (res.body.code == 0) {
                            this.bankList = res.body.list
                        } else {
                            util.alertBox(this, res.body.message)
                        }
                    })
            },
            saveBankId(index){
                    this.selectedBank = this.bankList[index].bank_name;
                    this.selectedBankId = this.bankList[index].bank_id;
            },
            takeBankCardId(index){
                this.cardId = this.bankList[index].bank_card_id;
                this.index = index;
                this.bankListShow = false;
            },
            close(){
                this.$store.commit("WITHDRAWALS_CHANGE", {
                    addBankCard: false
                })
            },
            confirm(){
                let name = this.$refs.name.value,
                    cardNum = this.$refs.cardNum.value,
                    BankChildName = this.$refs.BankChildName.value;
                if (!util.isName(name)) {
                    this.nameErrStyle = {
                        "border-color": "#ff2e6b"
                    }
                    return false
                } else if (!util.isBnkCard(cardNum)) {
                    this.cardNumErrStyle = {
                        "border-color": "#ff2e6b"
                    }
                    return false
                } else if (!this.cardTypeValue) {
                    this.cardTypeErrStyle = {
                        "border-color": "#ff2e6b"
                    }
                    return false
                } else if (!this.selectedCardPlace) {
                    this.cardPlaceErrStyle = {
                        "border-color": "#ff2e6b"
                    }
                    return false
                } else if (!this.selectedBank) {
                    this.cardBankErrStyle = {
                        "border-color": "#ff2e6b"
                    }
                    return false
                } else if(!BankChildName) {
                    this.bankChildErrStyle = {
                        "border-color": "#ff2e6b"
                    }
                    return false
                }else{
                    util.ajaxPost(this, '2.5', 'Wallet/bind_bank_card', {
                        auth_token:AUTH_TOKEN,
                        real_name:name,
                        bank_type:this.cardTypeValue,
                        bank_card_number:cardNum,
                        bank_open_area:this.selectedCardPlace,
                        bank_id:this.selectedBankId,
                        bank_branch:BankChildName
                    }, (res) => {
                        this.$store.commit("WITHDRAWALS_CHANGE", {
                            addBankCard: false
                        })
                        if (res.body.code == 0) {
                            util.alertBox(this, "银行卡绑定成功", false)
                        } else {
                            util.alertBox(this, res.body.message)
                        }
                    })
                }
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
    .centerBox {
        height: 400px;
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
        ul {
            width: 100%;
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            li {
                height: 30px;
                line-height: 30px;
                margin: 10px 0px;
                position: relative;
                input {
                    border: 1px solid #ddd;
                    line-height: 30px;
                    height: 30px;
                    width: 80%;
                }
                img {
                    position: absolute;
                    right: 10px;
                    top: 12px;
                }
                .cardType, .cardPlace, .bankList {
                    position: absolute;
                    left: 72px;
                    top: 40px;
                    background: #fff;
                    z-index: 5;
                    border: 1px solid #ddd;
                    width: 80%;
                }
                .cardPlace {
                    height: 170px;
                    overflow-y: auto;
                }
                .bankList {
                    height: 160px;
                    overflow-y: auto;
                }
            }
        }
        button {
            width: 175px;
            background: #ff2e6b;
            &:last-child {
                margin-left: 6px;
            }
        }
    }
</style>
