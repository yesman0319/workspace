<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'app',
        mounted() {
            this.index();
        },
        methods: {
            index(){
//                this.$router.push('login')
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    
</style>
