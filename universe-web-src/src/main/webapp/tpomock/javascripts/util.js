(function() {
    window.Utils = {
        setCookie: function(name, value) {
            var Days = 1;
            var exp = new Date();
            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
            document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
            // document.cookie = "username=123";
        },
        getCookie: function(name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg)) return unescape(arr[2]);
            else return null;
        },
        delCookie: function(name) { //为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间
            var date = new Date();
            date.setTime(date.getTime() - 10000);
            document.cookie = name + "=a; expires=" + date.toGMTString();
        },
        saveCookie: function(key, value) {
            if (key) {
                Utils.setCookie(key, value);
            }
        },
        // //缓存机制
        // getData: function(cache, name){
        //  return cache[name];
        // },
        // setData: function(cache,name,value){
        //  cache[name] = value;
        // },
        /**
         * 获取下一个月
         *
         * @date 格式为yyyy.mm的日期，如：2014.01
         */
        getNextMonth: function(date) {
            var arr = date.split('.');
            var year = arr[0]; //获取当前日期的年份
            var month = arr[1]; //获取当前日期的月份


            var year2 = year;
            var month2 = parseInt(month) + 1;
            if (month2 == 13) {
                year2 = parseInt(year2) + 1;
                month2 = 1;
            }

            if (month2 < 10) {
                month2 = '0' + month2;
            }

            var t2 = year2 + '.' + month2;
            return t2;
        },
        /**
         * 长整型转换成时间(yyyy-MM-dd)
         */
        toDateString: function(l_date) {
            var date = new Date();
            date.setTime(l_date * 1000);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hour = date.getHours();
            var minute = date.getMinutes();
            var second = date.getSeconds();

            month = month < 10 ? "0" + month : month;
            day = day < 10 ? "0" + day : day;
            //hour = hour < 10 ? "0" + hour : hour;
            //          minute = minute < 10 ? "0" + minute : minute;
            //          second = second < 10 ? "0" + second : second;
            //
            return (year + "-" + month + "-" + day);
        },
        /**
         * 长整型转换成时间(yyyy-MM-dd)
         */
        toFullDateString: function(l_date) {
            var date = new Date();
            date.setTime(l_date * 1000);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hour = date.getHours();
            var minute = date.getMinutes();
            var second = date.getSeconds();

            month = month < 10 ? "0" + month : month;
            day = day < 10 ? "0" + day : day;
            hour = hour < 10 ? "0" + hour : hour;
            minute = minute < 10 ? "0" + minute : minute;
            second = second < 10 ? "0" + second : second;
            //
            return (year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second);
        },
        /**
         *日期转字符串
         */
        getDateString: function(date) {
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hour = date.getHours();
            var minute = date.getMinutes();
            var second = date.getSeconds();

            month = month < 10 ? "0" + month : month;
            day = day < 10 ? "0" + day : day;
            //hour = hour < 10 ? "0" + hour : hour;
            //          minute = minute < 10 ? "0" + minute : minute;
            //          second = second < 10 ? "0" + second : second;
            //
            return (year + "-" + month + "-" + day);
        },
        formatQuestionNum: function(qnum) {
            if (qnum && qnum.length == 10) {
                var year = qnum.substr(0, 4);
                var month = qnum.substr(4, 2);
                var day = qnum.substr(6, 2);
                var num = qnum.substr(8, 2);
                return year + "-" + month + "-" + day + "-" + num;
            }
            return qnum
        },
        //获得链接里的参数
        getUrlParam: function(url, name) {
            var pattern = new RegExp("[?&]" + name + "=([^&]+)", "g");
            var matcher = pattern.exec(url);
            var items = null;
            if (null != matcher) {
                try {
                    items = decodeURIComponent(decodeURIComponent(matcher[1]));
                } catch (e) {
                    try {
                        items = decodeURIComponent(matcher[1]);
                    } catch (e) {
                        items = matcher[1];
                    }
                }
            }
            return items;
        },
        startTimer: function(targetDate) {
            var tdate = targetDate ? (new Date(targetDate)) : (new Date(2014, 12, 11, 9, 0, 0));

            function timer() {
                var ts = tdate - (new Date()); //计算剩余的毫秒数
                var dd = parseInt(ts / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
                var hh = parseInt(ts / 1000 / 60 / 60 % 24, 10); //计算剩余的小时数
                var mm = parseInt(ts / 1000 / 60 % 60, 10); //计算剩余的分钟数
                var ss = parseInt(ts / 1000 % 60, 10); //计算剩余的秒数
                dd = checkTime(dd);
                hh = checkTime(hh);
                mm = checkTime(mm);
                ss = checkTime(ss);
                document.getElementById("timer").innerHTML = dd + "天" + hh + "时" + mm + "分" + ss + "秒";
            }

            function checkTime(i) {
                if (i < 10) {
                    i = "0" + i;
                }
                return i;
            }
            return (function startTimer() {
                setInterval(timer, 1000);
            })();
        },
        getCurrentMonthStr: function(type) {
            var date = new Date();
            var month = date.getMonth() + 1;
            if (type) {
                return month;
            }
            var str = "1-4";
            if (month <= 4 && month >= 1) {
                str = "1-4";
            }
            if (month <= 8 && month >= 5) {
                str = "5-8";
            }
            if (month <= 12 && month >= 9) {
                str = "9-12";
            }
            return str;
        }
    };
})();
