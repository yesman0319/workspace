<template>
    <div id="changePrice" class="fullScreen" v-if="isShow">
        <div class="centerBox" flex="cross:center dir:top">
            <h1>改价</h1>
            <div v-for="items of productList" flex="dir:left main:justify" class="productBox">
                <div>
                    <p>{{items.product_name}}</p>
                    <p>{{items.product_type}}</p>
                </div>
                <div flex="dir:left cross:center">
                    <input type="number" :value="items.product_price">
                    <span>×</span>
                    <input type="number" :value="items.product_total_count">
                </div>
            </div>
            <div class="productBox devPrice">
                <div flex="main:justify cross:center">
                    <span>运费</span>
                    <input type="number" :value="product.delivery_price">
                </div>
            </div>
            <div>
                <button @click="close" style="background: #ddd">取消</button>
                <button @click="confirm">确定</button>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'changePrice',
        data () {
            return {
                productList : '',
            }
        },
        props: [
            'product',
            'isShow'
        ],
        computed: {
        },
        mounted(){
            this.init()
        },
        methods: {
            init(){
                setTimeout(() => {
                    this.productList = this.product.product_list
                },1500)
            },
            close(){
                this.$emit('closeChangePrice')
            },
            confirm(){
                util.ajaxPost(this, '2.5', 'Order/change_price', {
                    order_sn:1430128151,
                    type_id:3371,
                type_id:3334,
                unitPrice:2.00,
                unitPrice:0.01,
                freight:0.00,
                unitNum:4,
                unitNum:1,
                voucher_price:0.00
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

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
    .centerBox {
        width: 400px;
        margin-left: -190px;
        margin-top: -170px;
        background: #fff;
        line-height: 80px;
        padding: 20px;
        h1 {
            font-size: 18px;
            line-height: 1;
            margin-bottom: 20px;
        }
        .productBox{
            width: 100%;
            height: 55px;
            div{
                width: 100%;
                height: 55px;
                border-top:1px solid #ddd;
                p{
                    height: 20px;
                    line-height: 35px;
                }
                input{
                    border:1px solid #ddd;
                    width: 80px;
                    height: 30px;
                }
                span{
                    margin:0px 10px;
                }
            }

        }
        .devPrice{
            border-bottom: 1px solid #ddd;
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
