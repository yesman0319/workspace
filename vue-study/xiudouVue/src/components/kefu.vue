<template>
    <div id="kefu">
        <div>
            <p>联系我们</p>
        </div>
        <div flex="dir:left" class="kefuMes">
            <ul flex="dir:top main:center">
                <li>客服电话：400-8163-680</li>
                <li>客服邮箱：kefu@xiudou.net</li>
                <li>新浪微博：<a href="http://weibo.com/u/5475731785?topnav=1&wvr=6&topsug=1&is_hot=1"
                            target="_blank">秀兜官方</a></li>
                <li>微信公众号：xiudou2015</li>
            </ul>
            <div flex="dir:top main:center" style="margin-top: 37px">
                <img src="/static/img/wechatcode.png" alt="">
                <p>秀兜微信公众号</p>
            </div>
        </div>
        <div>
            <p style="line-height: 60px">意见反馈</p>
            <textarea name="" id="" cols="80" rows="10" placeholder="感谢您提交的宝贵意见，我们会在第一时间给您回复" ref="feedback">

            </textarea>
            <br/>
            <button class="sortButton" @click="sendAdvice">提交反馈</button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'find',
        data () {
            return {}
        },
        mounted(){
            this.$store.commit("USERUSINGPAGE_CHANGE", {
                pageName: "客服"
            })
        },
        methods: {
            sendAdvice(){
                let feedback = this.$refs.feedback.value;
                if(feedback){
                    util.ajaxPost(this, '1.0', 'User/feedback', {
                        auth_token: AUTH_TOKEN,
                        feedback: feedback
                    }, (res) => {
                        if (res.body.code == 0) {
                            this.$store.commit("ALERT_CHANGE", {
                                status: true,
                                errText: "反馈成功,感谢您的支持!",
                                imgStatus:false
                            })
                        } else {
                            this.$store.commit("ALERT_CHANGE", {
                                status: true,
                                errText: "出错啦!",
                                imgStatus:true
                            })
                        }
                    })
                }else{
                    this.$store.commit("ALERT_CHANGE", {
                        status: true,
                        errText: "反馈不能为空!",
                        imgStatus:true
                    })
                }

            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
    $border: 2px solid #ecebeb;
    #kefu {
        div:first-child {
            height: 70px;
        }
        p {
            height: 60px;
            font-size: 16px;
        }
        .kefuMes {
            height: 180px;
            border-top: $border;
            border-bottom: $border;
            li {
                height: 30px;
                color: #666;
                a {
                    color: #ff2e6b;
                }
            }
            div {
                margin-left: 60px;
                color: #b2b2b2;
            }
            p {
                font-size: 12px;
            }
        }
        img {
            height: 80px;
            width: 80px;
        }
        textarea {
            border: 1px solid #ececeb;
            padding: 10px;
        }
    }
</style>
