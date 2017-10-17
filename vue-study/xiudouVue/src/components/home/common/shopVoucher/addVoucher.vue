<template>
    <div id="addVoucher" class="fullScreen" v-if="isShow">
        <div class="centerBox" flex="cross:center dir:top">
            <p>添加优惠券</p>
            <ul>
                <li>
                    <span>优惠券类型</span>
                    <select v-model="selected">
                        <option disabled value="">请选择</option>
                        <option value="1">满减</option>
                        <option value="2">立减</option>
                    </select>
                </li>
                <li flex="main:justify" v-if="selected == 1">
                    <span flex-box="1" style="text-align: left">满</span>
                    <input type="number" style="width: 113px" ref="totlePrice">
                    <span flex-box="1">减</span>
                    <input type="number" style="width: 113px" ref="voucherPrice">
                </li>
                <li flex="main:left" v-else>
                    <span>立减</span>
                    <input type="number" style="margin-left: 40px;width: 290px;" ref="nowVoucherPrice">
                </li>
                <li flex="main:left">
                    <span>优惠券数</span>
                    <input type="number" style="margin-left: 16px;width: 290px;" ref="num">
                </li>
                <li flex="main:justify">
                    <span style="margin-right:9px;">发放时间</span>
                    <datepicker class="date" language="ch" :value="date1" @input="takeSendDateStart"
                                :min='date'></datepicker>
                    <span>~</span>
                    <datepicker class="date" language="ch" :value="date2" @input="takeSendDateEnd"
                                :min='date'></datepicker>
                </li>
                <li flex="main:justify">
                    <span style="margin-right:9px;">使用时间</span>
                    <datepicker class="date" language="ch" :value="date3" @input="userDateStart"
                                :min='date'></datepicker>
                    <span>~</span>
                    <datepicker class="date" language="ch" :value="date4" @input="userDateEnd" :min='date'></datepicker>
                </li>
            </ul>
            <div>
                <button @click="close" style="background: #ddd">取消</button>
                <button @click="confirm">确定</button>
            </div>
        </div>
    </div>
</template>
<script>

</script>
<script type="text/ecmascript-6">
    import datepicker from 'vue-date'

    export default {
        name: 'addVoucher',
        props: [
            'show'
        ],
        data () {
            let now = new Date()
            return {
                input: false,
                year: now.getFullYear(),
                month: now.getMonth() + 1,
                day: now.getDate(),
                date: '',
                date1: '',
                date2: '',
                date3: '',
                date4: '',
                selected: 1
            }
        },
        components: {
            datepicker
        },
        computed: {
            isShow(){
                return this.show
            }
        },
        mounted() {
            this.makeDate();
        },
        methods: {
            makeDate(){
                let now = new Date()
                if (now.getMonth() + 1 >= 10 && now.getDate() >= 10) {
                    this.date = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate()
                } else if (now.getMonth() + 1 >= 10 && now.getDate() < 10) {
                    this.date = now.getFullYear() + "-" + (now.getMonth() + 1) + "-0" + now.getDate()
                } else if (now.getMonth() + 1 < 10 && now.getDate() >= 10) {
                    this.date = now.getFullYear() + "-0" + (now.getMonth() + 1) + "-" + now.getDate()
                } else if ((now.getMonth() + 1 < 10 && now.getDate() < 10)) {
                    this.date = now.getFullYear() + "-0" + (now.getMonth() + 1) + "-0" + now.getDate()
                }
            },
            takeDate(){

//                console.log(now)
            },
            takeSendDateStart(v){
                this.date1 = v
            },
            takeSendDateEnd(v){
                this.date2 = v
            },
            userDateStart(v){
                this.date3 = v
            },
            userDateEnd(v){
                this.date4 = v
            },
            close(){
                this.$emit('hidden')
            },
            confirm(){
                let date1 = util.dateToMS(this.date1),
                    date2 = util.dateToMS(this.date2),
                    date3 = util.dateToMS(this.date3),
                    date4 = util.dateToMS(this.date4);
                if (this.selected == 1) {
                    var totlePrice = this.$refs.totlePrice.value,
                        voucherPrice = this.$refs.voucherPrice.value
                } else {
                    var voucherPrice = this.$refs.nowVoucherPrice.value,
                        totlePrice = "lijian"
                }
                let num = this.$refs.num.value;
                if (!totlePrice) {
                    util.alertBox(this, '请输入正确金额')
                } else if (!voucherPrice) {
                    util.alertBox(this, '请输入正确金额')
                } else if (!num) {
                    util.alertBox(this, '请输入发放优惠券数量')
                } else if (!date1) {
                    util.alertBox(this, '发放开始时间不能为空')
                } else if (!date2) {
                    util.alertBox(this, '发放结束时间不能为空')
                } else if (!date3) {
                    util.alertBox(this, '使用开始时间不能为空')
                } else if (!date4) {
                    util.alertBox(this, '使用结束时间不能为空')
                } else if (date1 >= date2 || date3 >= date4) {
                    util.alertBox(this, '结束时间不能大于开始时间')
                } else {
                    util.ajaxPost(this, '2.5', 'User/add_sell_shop_voucher', {
                        auth_token: AUTH_TOKEN,
                        type: this.selected,
                        condition: totlePrice == 'lijian' ? '':totlePrice,
                        discountAmount: voucherPrice,
                        num: num,
                        start_time: this.date1,
                        end_time: this.date2,
                        sTime: this.date3,
                        eTime: this.date4
                    }, (res) => {
                        util.alertBox(this, res.body.message);
                        this.$emit('hidden');
                        this.$emit("getVoucherMes");
                    })
                }
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
    #addVoucher {
        background: rgba(0, 0, 0, 0.3);
    }

    .centerBox {
        height: 360px;
        width: 400px;
        margin-left: -190px;
        margin-top: -170px;
        background: #fff;
        text-align: center;
        line-height: 80px;
        padding: 20px;
        ul {
            li {
                height: 30px;
                margin: 10px 0px;
                input {
                    height: 30px;
                    border: 1px solid #ddd;
                }
                .date {
                    width: 135px;
                    line-height: 20px;
                }
                select {
                    height: 30px;
                    width: 290px;
                    border-color: #ddd;
                }
                line-height: 30px;
            }
        }
        p {
            line-height: 1;
            border-bottom: 1px solid #ddd;
            width: 100%;
            padding-bottom: 20px;
        }
        button {
            width: 175px;
            background: #ff2e6b;
        }
        p {
            font-size: 16px;
        }
    }

</style>
