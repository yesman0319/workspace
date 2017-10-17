<template>
    <div id="wallet" flex="dir:left">
        <div>
            <moneyTitle></moneyTitle>
            <withdrawals></withdrawals>
            <bankCard></bankCard>
            <addBankCard></addBankCard>
        </div>
        <div>
            <detail></detail>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import moneyTitle from './moneyTitle.vue'
    import bankCard from './bankCard.vue'
    import detail from './detail.vue'
    import withdrawals from './withdrawals.vue'
    import addBankCard from './addBankCard.vue'
    export default {
        name: 'wallet',
        data () {
            return {
//				xx: xx
            }
        },
        components: {
            moneyTitle,
            bankCard,
            detail,
            withdrawals,
            addBankCard
        },
        computed: {},
        mounted(){

        },
        methods: {}
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
    #wallet {
        background: #f6f6f6;
        position: absolute;
        top:40px;
        left:200px;
        width: 1000px;
    }
</style>
