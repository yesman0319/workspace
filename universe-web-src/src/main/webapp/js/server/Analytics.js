var analytics = {
    param: {
        "ipAdress": "",
        "userAgent": "",
        "osName": "",
        "accessId": "",
        "refererUrl": "",
        "source": "",
        "medium": "",
        "campaign": "",
        "campaignContent": "",
        "keyword": "",
        "pageTitle": "",
        "pageUrl": "",
        "eventName": "",
        "eventAction": "",
        "eventContent": "",
        "eventValue": ""
    },
    getParam: function () {
        analytics.param.ipAdress = returnCitySN["cip"] ? returnCitySN["cip"] : "";
        var Browser = Browser || (function (window) {
                var document = window.document,
                    navigator = window.navigator,
                    agent = navigator.userAgent.toLowerCase(),
                //IE8+支持.返回浏览器渲染当前文档所用的模式
                //IE6,IE7:undefined.IE8:8(兼容模式返回7).IE9:9(兼容模式返回7||8)
                //IE10:10(兼容模式7||8||9)
                    IEMode = document.documentMode,
                //chorme
                    chrome = window.chrome || false,
                    System = {
                        //user-agent
                        agent: agent,
                        //是否为IE
                        isIE: /msie/.test(agent) || /rv:11/.test(agent),
                        //Gecko内核
                        isGecko: agent.indexOf("gecko") > 0 && agent.indexOf("like gecko") < 0,
                        //webkit内核
                        isWebkit: agent.indexOf("webkit") > 0,
                        //是否为标准模式
                        isStrict: document.compatMode === "CSS1Compat",
                        //是否支持subtitle
                        supportSubTitle: function () {
                            return "track" in document.createElement("track");
                        },
                        //是否支持scoped
                        supportScope: function () {
                            return "scoped" in document.createElement("style");
                        },
                        //获取IE的版本号
                        ieVersion: function () {
                            try {
                                return agent.match(/msie ([\d.]+)/)[1] || 0;
                            } catch (e) {
                                console.log("error");
                                return IEMode;
                            }
                        },
                        //Opera版本号
                        operaVersion: function () {
                            try {
                                if (window.opera) {
                                    return agent.match(/opera.([\d.]+)/)[1];
                                } else if (agent.indexOf("opr") > 0) {
                                    return agent.match(/opr\/([\d.]+)/)[1];
                                }
                            } catch (e) {
                                console.log("error");
                                return 0;
                            }
                        },
                        //描述:version过滤.如31.0.252.152 只保留31.0
                        versionFilter: function () {
                            if (arguments.length === 1 && typeof arguments[0] === "string") {
                                var version = arguments[0];
                                var start = version.indexOf(".");
                                if (start > 0) {
                                    var end = version.indexOf(".", start + 1);
                                    if (end !== -1) {
                                        return version.substr(0, end);
                                    }
                                }
                                return version;
                            } else if (arguments.length === 1) {
                                return arguments[0];
                            }
                            return 0;
                        }
                    };

                try {
                    //浏览器类型(IE、Opera、Chrome、Safari、Firefox)
                    System.type = System.isIE ? "IE" :
                        window.opera || (agent.indexOf("opr") > 0) ? "Opera" :
                            (agent.indexOf("chrome") > 0) ? "Chrome" :
                                //safari也提供了专门的判定方式
                                window.openDatabase ? "Safari" :
                                    (agent.indexOf("firefox") > 0) ? "Firefox" :
                                        'unknow';

                    //版本号
                    System.version = (System.type === "IE") ? System.ieVersion() :
                        (System.type === "Firefox") ? agent.match(/firefox\/([\d.]+)/)[1] :
                            (System.type === "Chrome") ? agent.match(/chrome\/([\d.]+)/)[1] :
                                (System.type === "Opera") ? System.operaVersion() :
                                    (System.type === "Safari") ? agent.match(/version\/([\d.]+)/)[1] :
                                        "0";

                    //浏览器外壳
                    System.shell = function () {
                        //遨游浏览器
                        if (agent.indexOf("maxthon") > 0) {
                            System.version = agent.match(/maxthon\/([\d.]+)/)[1] || System.version;
                            return "傲游浏览器";
                        }
                        //QQ浏览器
                        if (agent.indexOf("qqbrowser") > 0) {
                            System.version = agent.match(/qqbrowser\/([\d.]+)/)[1] || System.version;
                            return "QQ浏览器";
                        }

                        //搜狗浏览器
                        if (agent.indexOf("se 2.x") > 0) {
                            return '搜狗浏览器';
                        }

                        //Chrome:也可以使用window.chrome && window.chrome.webstore判断
                        if (chrome && System.type !== "Opera") {
                            var external = window.external,
                                clientInfo = window.clientInformation,
                            //客户端语言:zh-cn,zh.360下面会返回undefined
                                clientLanguage = clientInfo.languages;

                            //猎豹浏览器:或者agent.indexOf("lbbrowser")>0
                            if (external && 'LiebaoGetVersion' in external) {
                                return '猎豹浏览器';
                            }
                            //百度浏览器
                            if (agent.indexOf("bidubrowser") > 0) {
                                System.version = agent.match(/bidubrowser\/([\d.]+)/)[1] ||
                                    agent.match(/chrome\/([\d.]+)/)[1];
                                return "百度浏览器";
                            }
                            //360极速浏览器和360安全浏览器
                            if (System.supportSubTitle() && typeof clientLanguage === "undefined") {
                                //object.key()返回一个数组.包含可枚举属性和方法名称
                                var storeKeyLen = Object.keys(chrome.webstore).length,
                                    v8Locale = "v8Locale" in window;
                                return storeKeyLen > 1 ? '360极速浏览器' : '360安全浏览器';
                            }
                            return "Chrome";
                        }
                        return System.type;
                    };

                    //浏览器名称(如果是壳浏览器,则返回壳名称)
                    System.name = System.shell();
                    //对版本号进行过滤过处理
                    System.version = System.versionFilter(System.version);

                } catch (e) {
                    console.log("error");
                }
                return {
                    client: System
                };

            })(window);
        analytics.param.userAgent = (Browser.client.name + " " + Browser.client.version) ? Browser.client.name + " " + Browser.client.version : "";
        function detectOS() {
            var sUserAgent = navigator.userAgent;
            var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
            var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
            if (isMac) return "Mac";
            var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
            if (isUnix) return "Unix";
            var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
            if (isLinux) return "Linux";
            if (isWin) {
                var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
                if (isWin2K) return "Win2000";
                var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
                if (isWinXP) return "WinXP";
                var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
                if (isWin2003) return "Win2003";
                var isWinVista = sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
                if (isWinVista) return "WinVista";
                var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
                if (isWin7) return "Win7";
                var isWin8 = sUserAgent.indexOf("Windows NT 6.2") > -1 || sUserAgent.indexOf("Windows NT 6.3") > -1 || sUserAgent.indexOf("Windows 8") > -1;
                if (isWin8) return "Win8";
                var isWin10 = sUserAgent.indexOf("Windows NT 10.0") > -1 || sUserAgent.indexOf("Windows 10.0") > -1;
                if (isWin10) return "win10"
            }
            return "other";
        }

        analytics.param.osName = detectOS() ? detectOS() : "";
        if (getCookie("uuid") == "") {
            uuid = Math.uuid();
            setCookie(uuid);
        } else {
            uuid = getCookie("uuid");
        }
        analytics.param.accessId = uuid;
        analytics.param.refererUrl = document.referrer ? document.referrer : "";
        var url = window.location.href;
        var reg = /([^?&=]+)=([^?&=]+)/g, uuid = "", as_str = "", objUrl = {}, arrUrl = [];
        url = "http://kbs.sports.qq.com/kbsweb/game.htm?source=baidu&campaign=sale&campaignContent=banner&keyword=teacherXu&a=a&b=b";
        url.replace(reg, function () {
            objUrl[arguments[1]] = arguments[2];
        });
        arrUrl = ["source", "medium", "campaign", "campaignContent", "keyword"];
        for (var i = 0; i < arrUrl.length; i++) {
            analytics.param[arrUrl[i]] = "";
            $.each(objUrl, function (attr, value) {
                if (arrUrl[i] == attr) {
                    analytics.param[arrUrl[i]] = value;
                    return (function () {
                    })();
                }
            });

        }
        analytics.param.pageTitle = document.title ? document.title : "";
        analytics.param.pageUrl = url ? url : "";
        function setCookie(data) {
            var Days = 7;
            var time = new Date();
            time.setTime(time.getTime() + Days * 24 * 60 * 60 * 1000);
            document.cookie = "uuid" + "=" + encodeURIComponent(data) + ";expires=" + time.toUTCString();
        }
        function getCookie(cookieName) {
            var strCookie = document.cookie;
            var arrCookie = strCookie.split(";");
            for (var i = 0; i < arrCookie.length; i++) {
                var arr = arrCookie[i].split("=");
                if (cookieName == arr[0]) {
                    return decodeURIComponent(arr[1]);
                }
            }
            return "";
        }
    },
    Ana: function Ana(systemId, name, action, content, value) {
        analytics.getParam();
        analytics.param.systemId = systemId;
        analytics.param.eventName = name;
        analytics.param.eventAction = action;
        analytics.param.eventContent = content;
        analytics.param.eventValue = value;
        //console.log(analytics.param);
        $.ajax({
            type: "GET",
            url: "http://test.analysis.xmtoefl.com/analysis/visitor",
            //url: "http://test.chat.xmtoefl.com",
            jsonp: "callback",
            dataType: "jsonp",
            data: analytics.param

        });
    }
};



