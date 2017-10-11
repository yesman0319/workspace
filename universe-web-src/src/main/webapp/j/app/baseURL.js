define([], function () {

    var http = "http",
        // ip = "ap.xiaoma.com",
        ip = "yz.xiaomatuofu.com", //ap.xiaoma.com---yz.xiaomatuofu.com/ //api.xiaomatuofu.com---http://ser.xiaomatuofu.com/
        ip1 = "localhost:9009/action", //"center.xiaomatuofu.com","xmtf-testweb.xiaoma.com/action"
        // ip2 = "center.xiaomatuofu.com",
        ip2 = "se.xiaomatuofu.com", //center.xiaomatuofu.com//c.xiaomatuofu.com---http://se.xiaomatuofu.com
        ip3="localhost:9009/v3",//图形验证码使用地�? 登录相关接口更改 "xmtf-testweb.xiaoma.com/v3"
        ipTuoFu="jyz.xiaomatuofu.com/yztuofu",
        ipMall = "exercise.yuzhoutuofu.com/action",
        api = "api",
        version = "v1",
        version1 = "v2",
        version2 = "v3",
        version3 = "v4",
        baseDomain = "yuzhoutuofu.com";
    //正式站
    if (window.location.href.indexOf('exercise.yuzhoutuofu.com') > -1) {
        // ip='api.xiaomatuofu.com';
        ip='ser.xiaomatuofu.com';
        ip1 = "exercise.yuzhoutuofu.com/action";
        // ip2='c.xiaomatuofu.com';
        ip2='se.xiaomatuofu.com/';
        ip3='exercise.yuzhoutuofu.com/v3';
        ipTuoFu="exercise.yuzhoutuofu.com/yztuofu";
        ipMall = 'exercise.yuzhoutuofu.com';//课程 党兴飞
    }
    //测试站
    else if (window.location.href.indexOf('exercisetest.yuzhoutuofu.com') > -1) {//testm.xiaomatuofu.com  exercisetest.yuzhoutuofu.com
        // ip='ap.xiaoma.com';
        ip = "yz.xiaomatuofu.com";
        // ip1 = "xmtf-testweb.xiaoma.com/action";
        ip1 = "exercisetest.yuzhoutuofu.com/action";
        // ip2='center.xiaomatuofu.com';
        ip2='jyz.xiaomatuofu.com/yztuofu/'
        // ip3='xmtf-testweb.xiaoma.com/v3';
        ip3='exercisetest.yuzhoutuofu.com/v3';
        // ipTuoFu="jyz.xiaomatuofu.com/yztuofu";
        ipTuoFu = 'exercisetest.yuzhoutuofu.com/yztuofu';
        ipMall = 'exercisetest.yuzhoutuofu.com';

        //我本机的ip地址是  192.168.0.117/yuzhoutuofu
        //测试域名  http://jyz.xiaomatuofu.com/yztuofu
    }
    //本地
    else {
        // ip='ap.xiaoma.com';
        ip = "yz.xiaomatuofu.com";
        ip1 = "localhost:9009/action";
        // ip2='center.xiaomatuofu.com';
        ip2='jyz.xiaomatuofu.com/yztuofu/';
        ip3='localhost:9009/v3';
        ipTuoFu="localhost:9009/yztuofu";
        ipMall = location.host;
    }

    var baseURL = 'http://' + ip + "/" + api + "/" + version + "/";
    var baseURL1 = 'http://' + ip + "/" + version + "/"; //vocalbulary.js
    var baseURL2 = 'http://' + ip + "/" + version + "/";
    var baseURL3 = 'http://' + ip + "/" + api + "/" + version + "/"; //person.js
    var baseURL4 = 'http://' + ip + "/" + version + "/";
    var baseURL5 = 'http://' + ip + "/" + api + "/" + version1 + "/";
    var baseURL6 = 'http://' + ip + "/" + api + "/" + version1 + "/";
    var baseURL7 = 'http://' + ip + "/" + api + "/" + version + "/";
    var baseURL8 = 'http://' + ip + "/" + api + "/" + version + "/";
    var baseURL9 = 'http://' + ip + "/" + api + "/" + version1 + "/"; //person.js login.js listen.js
    var baseURL10 = 'http://' + ip1 + "/";
    var baseURL11 = 'http://' + ip2 + "/";
    var baseURL12 = 'http://' + ip + "/" + api + "/" + version2 + "/"; //login.js
    var baseURL13 = 'http://' + ip + "/" + api + "/"+ version3 + "/";
    var baseURL14= 'http://' + ip3+ "/" ; //ruby 服务根服务地�?
    var baseURL15= 'http://' + ipTuoFu+ "/" ;
    var xiaomaURL= exerciseApi.learnApi;//20160906

    var baseURLWebSocket = 'ws://192.168.1.228:7010'; //ws://192.168.1.5:7010 //ws://123.56.87.43:7010

    return {
        baseURL: baseURL,
        baseURL1: baseURL1,
        baseURL2: baseURL2,
        baseURL3: baseURL3,
        baseURL4: baseURL4,
        baseURL5: baseURL5,
        baseURL6: baseURL6,
        baseURL7: baseURL7,
        baseURL8: baseURL8,
        baseURL9: baseURL9,
        baseURL10: baseURL10,
        baseURL11: baseURL11,
        baseURL12: baseURL12,
        baseURL13:baseURL13,
        baseURL14:baseURL14,
        baseURL15:baseURL15,
        baseURLWebSocket: baseURLWebSocket,
        baseDomain:baseDomain,
        xiaomaURL:xiaomaURL//20160906
    }


});