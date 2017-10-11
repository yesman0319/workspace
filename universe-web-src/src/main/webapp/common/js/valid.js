function checkCardId(num) {
	num = num.toUpperCase();
	if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
		alert('输入的身份证号长度不对，或者号码不符合规定！\n15位号码应全为数字，18位号码末位可以为数字或X。'); 
		return false;
	}
	var len, re;
	len = num.length;
	if (len == 15) {
		re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
		var arrSplit = num.match(re);

		//检查生日日期是否正确 
		var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
		var bGoodDay;
		bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2]))
				&& ((dtmBirth.getMonth() + 1) == Number(arrSplit[3]))
				&& (dtmBirth.getDate() == Number(arrSplit[4]));
		if (!bGoodDay) {
			alert('输入的身份证号里出生日期不对！');   
			return false;
		} else {
			//将15位身份证转成18位 
			var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
			var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
			var nTemp = 0, i;
			num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
			for (i = 0; i < 17; i++) {
				nTemp += num.substr(i, 1) * arrInt[i];
			}
			num += arrCh[nTemp % 11];
			return true;
		}
	}
	if (len == 18) {
		re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
		var arrSplit = num.match(re);

		//检查生日日期是否正确 
		var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
		var bGoodDay;
		bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2]))
				&& ((dtmBirth.getMonth() + 1) == Number(arrSplit[3]))
				&& (dtmBirth.getDate() == Number(arrSplit[4]));
		if (!bGoodDay) {
			alert('输入的身份证号里出生日期不对！'); 
			return false;
		} else {
			//检验18位身份证的校验码是否正确。 
			var valnum;
			var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
			var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
			var nTemp = 0, i;
			for (i = 0; i < 17; i++) {
				nTemp += num.substr(i, 1) * arrInt[i];
			}
			valnum = arrCh[nTemp % 11];
			if (valnum != num.substr(17, 1)) {
				alert('18位身份证的校验码不正确！应该为：' + valnum); 
				return false;
			}
			return true;
		}
	}
	return false;
}

function checkEmail(email) {
	if (email.search(/^([a-zA-Z0-9]+[_|_|.|-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.|-]?)*[a-zA-Z0-9]+\.(?:com|cn)$/) != -1) {
		return true;
	} else {
		alert("邮箱格式错误.");
		return false;
	}

}

function isNumber(oNum) {
	//var strP = /^\d+(\.\d+)?$/;
	var strP = /^-?\d+$/;
	if (!strP.test(oNum))
		return false;
	try {
		if (parseFloat(oNum) != oNum) {
			return false;
		}
	} catch (ex) {
		return false;
	}
	return true;
} 

function isPriceNumber(_keyword) {
	if (_keyword == "0" || _keyword == "0." || _keyword == "0.0" || _keyword == "0.00") {
		_keyword = "0"; return true;
	} else {
		var index = _keyword.indexOf("0");
		var length = _keyword.length;
		if (index == 0 && length>1) {
			var reg = /^[0]{1}[.]{1}[0-9]{1,2}$/;
			if (!reg.test(_keyword)){
				return false;
			} else {
				return true;
			}
		} else {
			var reg = /^[1-9]{1}[0-9]{0,10}[.]{0,1}[0-9]{0,2}$/;
			if (!reg.test(_keyword)) {
				return false;
			} else {
				return true;
			}
		}			
		return false;
	}
}
