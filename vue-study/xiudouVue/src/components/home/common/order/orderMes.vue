<template>
	<div id="orderMes">
        <div class="title" flex="cross:center dir:right">
            <div v-if="payment_info.order_status ==1 ">
                <button class="sortButton" @click="changeShow = true">改价</button>
            </div>
        </div>
        <div>
            <div class="productMes" v-for="items of product_info.product_list" flex="dir:left">
                <a :href="domain + items.product_id" target="_blank">
                    <img :src="items.product_head_image" alt="">
                </a>
                <div>
                    <p style="font-size: 16px" class="oneLine">{{items.product_name}}</p>
                    <p>型号: {{items.product_type}}</p>
                </div>
                <div>
                    <span class="pink">{{items.product_price}} × {{items.product_total_count}}</span>
                </div>
            </div>
        </div>
        <div class="reserver">
            <p class="littleTitle">收货人信息</p>
            <p>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名: {{reserver_info.name}}</p>
            <p>联系电话: {{reserver_info.phone_number}}</p>
            <p>收货地址: {{reserver_info.address}}</p>
            <p>买家留言: {{reserver_info.customer_remark}}</p>
        </div>
        <div class="reserver">
            <p class="littleTitle">订单信息</p>
            <p>订单编号: {{payment_info.order_id}}</p>
            <div v-if="payment_info.order_status !=1 ">
                <p v-if="payment_info.pay_method == 0">支付方式: 无</p>
                <p v-else-if="payment_info.pay_method == 1">支付方式: 微信支付</p>
                <p v-else-if="payment_info.pay_method == 2">支付方式: 支付宝支付</p>
                <p v-else="payment_info.pay_method == 3">支付方式: 银联支付</p>
            </div>
            <div v-else>
                <p>支付方式: 未支付</p>
            </div>
            <p>下单时间: {{payment_info.order_time}}</p>
            <div v-if="payment_info.order_status !=1 ">
                <p>付款时间: {{payment_info.pay_time}}</p>
                <p v-if="payment_info.purchase_way == 0">购买方式: 普通购买</p>
                <p v-else-if="payment_info.purchase_way == 1">购买方式: 用户分佣</p>
                <p v-else="payment_info.purchase_way == 2">购买方式: 秀兜推广</p>
            </div>
        </div>
        <div class="reserver" v-if="payment_info.order_status !=1 ">
            <p class="littleTitle">物流信息</p>
            <p>订单编号: {{payment_info.order_id}}</p>
        </div>
        <div flex="dir:right" class="totalMes">
            <div>
                <p>商品总计 :<span>¥{{product_info.total_price}}</span></p>
                <p>运&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;费 :<span>¥{{product_info.delivery_price}}</span></p>
                <div v-if="payment_info.order_status !=1 ">
                    <p>优&nbsp; 惠&nbsp; 券 :<span>¥{{product_info.voucher_amount}}</span></p>
                    <p>买家实付 :<span>¥{{product_info.payment}}</span></p>
                    <p style="margin-top: 15px">实收金额 :<span class="pink" style="font-size: 16px">¥{{product_info.total_price}}</span></p>
                </div>
            </div>
        </div>
        <changePrice :product="product_info" :isShow="changeShow" @closeChangePrice = "closeChangePrice"></changePrice>
	</div>
</template>

<script type="text/ecmascript-6">
    import changePrice from './changePrice.vue'
	export default {
		name: 'orderMes',
		data () {
			return {
                product_info:'',
                reserver_info:'',
                payment_info:'',
                domain:"http://m.xiudou.cn/product.html?pid=",
                changeShow:false
			}
		},
        components:{
            changePrice
        },
		computed: {

        },
		mounted(){
            this.takeOrderMes();
		},
		methods: {
            closeChangePrice(){
                this.changeShow = false;
            },
            takeOrderMes(){
                util.ajaxPost(this, '2.3', 'order/get_order_detail', {
                    auth_token:AUTH_TOKEN,
                    order_id:1430128151
                }, (res) => {
                    if (res.body.code == 0) {
                        this.product_info = res.body.product_info;
                        this.reserver_info = res.body.reserver_info;
                        this.payment_info = res.body.payment_info;
                    }else{
                        this.$store.commit("ALERT_CHANGE", {
                            status: true,
                            errText:'获取优惠券信息失败',
                            imgStatus: false
                        });
                    }
                })
            }
        }
	}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
    .title{
        border-bottom: 2px solid #ddd;
        padding-bottom: 20px;
        width: 100%;
    }
    .productMes{
        position: relative;
        border-bottom: 1px solid #ddd;
        height: 140px;
        padding:20px 0px;
        img{
            height:100px;
            width: 100px;
        }
        a + div{
            margin-left: 20px;
            p{
                line-height: 30px;
                &:first-child{
                    margin-top: 20px;
                    width: 600px;
                }
            }
            & + div{
                position: absolute;
                right: 0px;
                top:50px;
                span{
                    font-size: 14px;
                }
            }
        }
    }
    .littleTitle{
        font-size: 16px;
        color: #000;
    }
    .reserver{
        padding:20px 0px;
        border-bottom: 1px solid #ddd;
        min-height: 150px;
        p{
            line-height: 30px;
        }
    }
    .totalMes{
        padding:20px 0px;
        p{
            line-height: 30px;
            span{
                margin-left: 50px;
            }
        }
    }
</style>
