<template>
    <div id="confirmAlert" class="fullScreen" v-if="alertShow">
        <div class="centerBox" flex="cross:center dir:top">
            <p class="pink">{{errText}}</p>
            <div>
                <button @click="close" style="background: #ddd">取消</button>
                <button @click="confirm">确定</button>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'confirmAlert',
        data () {
            return {
                input: false
            }
        },
        computed: {
            alertShow(){
                return this.$store.state.confirmAlert.alertHidden
            },
            errText(){
                return this.$store.state.confirmAlert.text
            },
            isVoucher(){
                return this.$store.state.confirmAlert.isVoucher
            },
            isWallet(){
                return this.$store.state.confirmAlert.isWallet
            }

        },
        activated(){
            this.input = true;
        },
        mounted() {
        },
        methods: {
            close(){
                this.$store.commit("CONFIRMALERT_CHANGE", {
                    status: false
                })
            },
            confirm(){
                if (this.isVoucher) {
                    util.ajaxGet(this, '2.5', 'User/close_shop_voucher', {
                        auth_token: AUTH_TOKEN,
                        voucher_type_id: this.isVoucher
                    }, (res) => {
                        if (res.body.code == 0) {
//                        删除成功
                            this.$store.commit("CONFIRMALERT_CHANGE", {
                                voucherChange: true
                            });
                        } else {
                            this.$store.commit("ALERT_CHANGE", {
                                status: true,
                                errText: '操作失败',
                                imgStatus: false
                            });
                        }
                    })
                } else if (this.isWallet) {
                    this.$router.push('userMes')
                    this.close();
                }
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
    #confirmAlert {
        position: fixed;
        background: rgba(0, 0, 0, .6);
        z-index: 999;
    }

    .centerBox {
        height: 200px;
        width: 400px;
        margin-left: -190px;
        margin-top: -170px;
        background: #fff;
        text-align: center;
        line-height: 80px;
        padding: 20px;
        button {
            width: 175px;
            background: #ff2e6b;
        }
        img {
            height: 70px;
        }
        p {
            font-size: 16px;
        }
    }

</style>
