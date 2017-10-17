<template>
    <div id="order">
        <div class="title" flex="cross:center">
            <p>全部订单{{orderListNum[0]}}</p>
            <p>未付款{{orderListNum[1]}}</p>
            <p>待发货{{orderListNum[2]}}</p>
            <p>已发货{{orderListNum[3]}}</p>
            <p>已完成{{orderListNum[4]}}</p>
            <p>退货中{{orderListNum[0]}}</p>
            <button class="sortButton">导出Execl</button>
        </div>
        <div class="searchOrder">
            <div flex="dir:left">
                <p>下单日期</p>
                <datepicker class="date" language="ch" :value="date1" @input="takeSendDateStart" :min='date'></datepicker>
                <span>~</span>
                <datepicker class="date" language="ch" :value="date2" @input="takeSendDateEnd" :min='date'></datepicker>
                <p>收货人信息</p>
                <input type="text" placeholder="昵称、手机号">
                <button class="sortButton hand">搜索</button>
            </div>
        </div>
        <div class="orderMes">
            <table>
                <thead>
                    <tr>
                        <th style="width:484px">商品信息</th>
                        <th style="width:250px">收货人信息</th>
                        <th style="width:105px">下单时间</th>
                        <th style="width:105px">订单状态</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="br"></tr>
                    <tr>
                        <td colspan="4" style="padding: 0px 5px;padding-right:20px;text-align: left">
                            <span>订单号:1430128151</span>
                            <span style="float: right;" @click="toOrderMes">订单详情</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div flex="dir:left">
                                <img src="/static/img/add.png" alt="">
                                <div flex="dir:left" style="padding: 10px 5px;">
                                    <p style="width: 250px;text-align: left;">150cesium 家啊分解结构结果呢哆啦A梦伴我行哆啦A们伴我行哆啦A梦伴我行</p>
                                    <div style="margin-left: 40px">
                                        <p>¥ 0.01</p>
                                        <p>1件</p>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <p>测试</p>
                            <p>77477787777</p>
                            <p>北京北京市东城区嘻嘻嘻</p>
                        </td>
                        <td>
                            <p>2016-12-13 </p>
                            <p>3:26:44</p>
                        </td>
                        <td>已关闭</td>
                    </tr>
                    <tr class="br"></tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import datepicker from 'vue-date'
    export default {
        name: 'order',
        data () {
            return {
                orderListNum:'',
                date:'1970-01-01',
                date1: '',
                date2: ''
            }
        },
        components: {
            datepicker
        },
        computed: {},
        mounted(){
            this.takeOrderListNum();
        },
        methods: {
            takeOrderListNum(){
                util.ajaxGet(this, '1.0', 'order/seller_order', {
                    auth_token:AUTH_TOKEN
                }, (res) => {
                    if (res.body.code == 0) {
                        this.orderListNum = res.body;
                    }else{
                        util.alertBox(this,"获取信息失败")
                    }
                })
            },
            takeSendDateStart(v){
                this.date1 = v
            },
            takeSendDateEnd(v){
                this.date2 = v
            },
            toOrderMes(){
                this.$router.push('orderMes')
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
    #order{
        position: relative;
        .title{
            border-bottom: 2px solid #ddd;
            padding-bottom: 20px;
            width: 100%;
            p {
                padding:0px 20px;
                border-right: 1px solid #ddd;
                height: 16px;
                line-height: 14px;
                &:nth-child(6){
                    border:none;
                }
            }
            .sortButton{
                position: absolute;
                right: 3px;
            }
        }
        .searchOrder{
            height: 30px;
            line-height: 30px;
            padding:30px 0px;
            position: relative;
            p{
                margin:0px 20px;
                &:first-child{
                    margin-left: 0px;
                }
            }
            .date {
                width: 135px;
                line-height: 20px;
            }
            span{
                margin:0px 5px;
            }
            input{
                border:1px solid #ddd;
                height: 30px;
            }
            button{
                position: absolute;
                right: 0px;
                top:30px;
                height: 30px;
                background: #fff;
                border:1px solid #ddd;
                color: #999;
            }
        }
        .orderMes{
            table{
                border-collapse: collapse;
                margin-top: 30px;
                thead{
                    th{
                        border:1px solid #ddd;
                        color: #333;
                        font-size: 14px;
                    }
                }
                tbody{
                    tr{
                        border:1px solid #ddd;
                        td{
                            border-right:1px solid #ddd;
                            text-align: center;
                            img{
                                height: 100px;
                                width: 100px;
                            }
                            p{
                                height: 20px;
                                line-height: 20px;
                            }
                        }
                        &:hover{
                            background: #f2f2f2;
                        }
                    }
                    .br{
                        border:none;
                        height: 10px;
                    }
                }
            }

        }
    }
</style>
