let util = {
    isPhoneNumber(phoneNumber){
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if(!myreg.test(phoneNumber))
        {
            let errText = '请输入有效的手机号码!'
            return errText;
        }else{
        return "success";
        }
    },
    isName(name){
        var myreg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
        if (myreg.test(name)) {
            return true;
        }
    },
    isBnkCard(cardNum){
        var myreg = /^(\d{16}|\d{19})$/;
        if (myreg.test(cardNum)) {
            return true;
        }
    },
    isZipCode(ss){
        var myreg = /^[1-9][0-9]{5}$/;
        if (myreg.test(ss)) {
            return true;
        }
    },
    getMyDate(str)
    {
        //补0操作
        var getzf = function (num) {
            if (parseInt(num) < 10) {
                num = '0' + num;
            }
            return num;
        }
        var oDate = new Date(str),
            oYear = oDate.getFullYear(),
            oMonth = oDate.getMonth() + 1,
            oDay = oDate.getDate(),
            oHour = oDate.getHours(),
            oMin = oDate.getMinutes(),
            oSen = oDate.getSeconds(),
            oTime = oYear + '-' + getzf(oMonth) + '-' + getzf(oDay) + ' ' + getzf(oHour) + ':' + getzf(oMin) + ':' + getzf(oSen);//最后拼接时间
        return oTime;
    },
    requestUrl()
    {
        var baseUrl;
        if (typeof location.origin === 'undefined') {
            baseUrl = location.protocol + '//' + location.host;
        }
        else {
            baseUrl = window.location.origin;
        }
        var interfaceUrl = 'https://admin.xiudou.net';
        if (baseUrl.indexOf('beta') > 0) {
            interfaceUrl = 'https://admin.beta.xiudou.net';
        } else if (baseUrl.indexOf('admin.xiudou.cn') > 0) {
            interfaceUrl = 'http://admin.xiudou.cn';
        }
        return interfaceUrl;
    }
    ,
    ajaxGet(that, version, url, params, successFun)
    {
        //proxy  'api/'
        const  API_PROXY = 'https://m.xiudou.net/api/index.php'             //线上地址
        that.$http.get(API_PROXY + this.URL_INTERFACE(version, url), {
                params: params
            })
            .then(
                successFun,
                (res) => {
                    that.$store.commit("ALERT_CHANGE", {
                        status: true,
                        errText: '接口未响应',
                        imgStatus: true
                    })
                })
            .catch(
                (res) => {
                    that.$store.commit("ALERT_CHANGE", {
                        status: true,
                        errText: 'Err:程序错误',
                        imgStatus: true
                    })
                })

    }
    ,
    URL_INTERFACE(version, interfaceName)
    {
        return '?version=' + version + '&request_url=' + interfaceName + '&source=pc'
    }
    ,
    ajaxPost(that, version, url, params, successFun)
    {
        //    const     API_PROXY = 'http://m.xiudou.cn/api/index.php'               //本地地址
        // const API_PROXY = 'https://m.beta.xiudou.net/api/index.php'               //测试地址
       const  API_PROXY = 'https://m.xiudou.net/api/index.php'             //线上地址
        that.$http.post(API_PROXY + this.URL_INTERFACE(version, url), params,
            {emulateJSON: true})
            .then(
                successFun,
                (res) => {
                    that.$store.commit("ALERT_CHANGE", {
                        status: true,
                        errText: '接口未响应',
                        imgStatus: true
                    })
                })
            .catch(
                (res) => {
                    that.$store.commit("ALERT_CHANGE", {
                        status: true,
                        errText: 'Err:程序错误',
                        imgStatus: true
                    })
                })

    }
    ,
    alertBox(that, errText, imgStatus = true)
    {
        that.$store.commit("ALERT_CHANGE", {
            status: true,
            errText: errText,
            imgStatus: imgStatus
        });
        return false;
    }
    ,
    alertConfirmBox(that, text, isWallet)
    {
        that.$store.commit("CONFIRMALERT_CHANGE", {
            status: true,
            text: text,
            isWallet: isWallet
        })
        return false;
    }
    ,
    dateToMS(str)
    {
        let date = str.replace(/-/g, "/"),
            ms = new Date(date).getTime();
        return ms;
    }
    ,
    saveStorage(key, value, type = sessionStorage)
    {
        type.setItem(key, JSON.stringify(value))
    }
    ,
    getStorage(key, type = sessionStorage)
    {
        let value = type.getItem(key);
        return JSON.parse(value)
    }

}

