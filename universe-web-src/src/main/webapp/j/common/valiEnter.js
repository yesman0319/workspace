/**
 * vali 模块
 * 校验输入内容与正确答案是否匹配
 */
'use strict'

define(['jquery'], function($) {

	var reg = /(^\s+)|(\s+$)/g;
	var reg1 = /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\,|\<|\.|\>|\/|\?]/g;
	var reg2 = /[a-z]|[A-z]|\'/g;
	var compare1,
		solution1,
		leng,
		color = 'rgb(255, 0, 0)';

	var result;

	var vali = function(compare, solution) {

		var trans = function(who) {
			solution = who.replace(reg, "")
			solution = solution.split(" ")
			//solution.pop()
		}

		if (typeof(solution) == "string") {
			trans(solution)
		}

		if (typeof(compare) == "string") {
			trans(compare)
		}

		compare1 = $.extend(true, [], compare)
		solution1 = $.extend(true, [], solution)

		return valiLength(compare1, solution1)


	}

	var valiLength = function() {
		if (compare1.length == solution1.length) {
			leng = compare1.length
			return polling()
		}
		
	}

	var polling = function() {
		// debugger
		var k 
		result = new Array(solution1.length)
		//以第一个字母为基准的最大公约数 组成一组正确答案
		for (var i = 0; i < compare1.length; i++) {
			for (var j = k || 0; j < solution1.length; j++) {
				if(compare1[i].replace(reg1,"").toLowerCase() == solution1[j].replace(reg1,"").toLowerCase()) {
					result[i] = {"isSure" : true,"value" : compare1[i]}
					k = j + 1 //唯一一组最大公约数的标记
					break
				} else {
					result[i] = {"isSure" : false,"value" : compare1[i]}
				}
			};
		};


		// for (var i = 0; i < leng; i++) {
		// 	compare1[i].replace(reg, "") == solution1[i]
		// 	? 
		// 	result.push("true") 
		// 	:
		// 	compare1[i] == solution1[i].replace(reg1,"")
		// 	?
		// 	result.push({whether:"true",punctuation:solution1[i]})
		// 	:
		// 	result.push({whether:"false",punctuation:solution1[i]})
			
		// }

		return result
	}



	return {
		vali: vali
	}
})