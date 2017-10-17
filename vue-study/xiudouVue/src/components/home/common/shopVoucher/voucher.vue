<template>
    <div id="voucher">
        <p class="title" flex="main:justify cross:center">
            <span>店铺优惠券管理</span>
            <button class="sortButton" @click="toAddVoucher">+添加优惠券</button>
        </p>
        <table>
            <thead>
            <tr>
                <th>类型</th>
                <th>金额(元)</th>
                <th>发放时间</th>
                <th>使用时间</th>
                <th>优惠券总数</th>
                <th>优惠券发放数</th>
                <th>优惠券使用数</th>
                <th>状态</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item of vouchers">
                <td>{{item.type}}</td>
                <td>{{item.voucher_description}}</td>
                <td>{{item.sTime}}<p>~</p>{{item.start_time}}</td>
                <td>{{item.eTime}}<p>~</p>{{item.end_time}}</td>
                <td>{{item.num}}</td>
                <td>{{item.use_num}}</td>
                <td>{{item.already_used}}</td>
                <td v-if="item.examine_status == 1">审核通过</td>
                <td v-else-if="item.examine_status == 2">审核中</td>
                <td v-else>审核失败</td>
                <td v-if="item.status == '关闭'" class="close hand" @click="close(item.voucher_type_id)">{{item.status}}</td>
                <td v-else>{{item.status}}</td>
            </tr>
            </tbody>
        </table>
        <div class="pageNum" flex="main:right" v-if="vouchers">
            <div v-for="item of pageNum">
                <button @click="selected(item)" v-if="item == selecteds" style="background: #ff2e6b;color:#fff">{{item}}</button>
                <button @click="selected(item)" v-else>{{item}}</button>
            </div>
        </div>

        <transition name="fade">
            <addVoucher :show="AddShow" v-on:getVoucherMes='getVoucherMes'v-on:hidden="hidden"></addVoucher>
        </transition>
    </div>
</template>

<script type="text/ecmascript-6">
    import addVoucher from './addVoucher.vue'
    export default {
        name: 'voucher',
        components:{addVoucher},
        data () {
            return {
                vouchers:'',
                pageNum:1,
                selecteds:1,
                AddShow:false,
                sellCount:''
            }
        },
        computed: {
            voucherChange(){
                return this.$store.state.confirmAlert.voucherChange
            }
        },
        mounted(){
            this.getVoucherMes();
        },
        watch:{
            voucherChange(){
                this.getVoucherMes();
            }
        },
        methods: {
            hidden(){
                this.AddShow = false;
            },
            toAddVoucher(){
                if(this.sellCount > 10){
                    util.alertBox(this,'最多只能添加10张优惠券')
                }else{
                    this.AddShow = true
                }
            },
            getVoucherMes(){
                util.ajaxGet(this, '2.5', 'User/sell_shop_voucher', {
                    auth_token:AUTH_TOKEN,
                    current_page:this.selecteds,
                    item_count:10
                }, (res) => {
                    if (res.body.code == 0) {
                        this.vouchers = res.body.list;
                        this.sellCount = res.body.sell_count;
                        this.pageNum = this.makePageButton(res.body.count);
                    }else{
                        this.$store.commit("ALERT_CHANGE", {
                            status: true,
                            errText:'获取优惠券信息失败',
                            imgStatus: false
                        });
                    }
                })
            },
            makePageButton(num){
                return Math.ceil(num / 10)
            },
            selected(selected){
                this.selecteds = selected;
                this.getVoucherMes()
            },
            close(id){
                this.$store.commit("CONFIRMALERT_CHANGE", {
                    status: true,
                    text:'确定要关闭优惠券么',
                    isVoucher:id
                });
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
    .title {
        color: #878787;
        margin-top: -10px;
        border-bottom: 2px solid #ddd;
        padding-bottom: 10px;
        span:hover {
            color: #ff2e6b;
        }
    }
    table{
        border-collapse:collapse;
        width:100%;
        tr{
            th{
                font-size: 14px;
                border-right: 1px solid #ddd;
                min-width: 90px;
            }
            th:last-child{
                border:none;
            }
        }
        tbody{
            tr{
                &:first-child{
                    border-top: 2px solid #ddd;
                }
                border-bottom: 1px solid #ddd;
                margin:20px;
                td{
                    text-align: center;
                    padding:15px 0px;
                    font-size: 12px;
                    line-height: 1.5;
                    p{
                        width:100%;
                        text-align: center;
                    }
                }
                .close{
                    color: #333;
                    font-weight: 700;
                    &:hover{
                        color: #ff2e6b;
                    }
                }
            }
        }
    }
    .pageNum{
        margin-top: 30px;
        margin-bottom: 100px;
        button{
            height: 25px;
            width: 25px;
            border:1px solid #ddd;
            background: #fff;
            color: #000;
            margin: 5px;
        }
    }
</style>
