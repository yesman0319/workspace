'use strict'
/**
 * @file uniqueAjax.js
 * @brief 为$.ajax附加3个需求：
 					1、判断是否登录，并做相应业务
 					2、超时则自动出loading
 					3、向同一个ajax接口请求时，如未succes，做相应处理（abort/queue/latest）
 * @author Cutsin(cutsin@gmail.com)
 * @date 2013-07-19
 * @to do 解耦
 */
define(['jquery','common/responser'],function($, responser){

	var block = false	//启用时阻止post

	var uniques = {
		/*	全局ajax url列表
		"urlId": {
			current: $ajax(ajaxOptions1),
			queue: [ajaxOptions2, ajaxOptions3]
		}
		**/
	}

	var conv = function(str){
		return str.replace(/\W/g,'_')
	}

	var onResponse = function(json){
		
	}

	var uniqueAjax = function(options){
		var opts = $.extend({
			flag: 'default',
			/*	flag
					标识当对同一个url发起请求，如未success，后面又来请求时，将如何处理：
					@param default 默认，放弃后来的
					@param queue 将后来的加入队列，依次处理
					@param latest 放弃前面的，发起最新的
			**/

			flagPrior: 'right',
			/*	flagPrior
					队列中，flag参数覆盖的优先级
					@param right 默认，后者优先
					@param left 前者优先
			**/

			type: 'post'
		}, options||{})

		var key = conv(opts.url)

		//扩展3个方法
		opts.success = function(){
			onResponse(arguments[0])
			options.success && options.success.apply(this,arguments)
			setTimeout(next,0)
		}
		opts.complete = function(){
			options.complete && options.complete.apply(this,arguments)
			setTimeout(next,0)
		}
		opts.error = function(){
			onResponse(arguments[0])
			options.error && options.error.apply(this,arguments)
			setTimeout(next,0)
		}

		var post = function(_opts){
			if(block) return
			// KVM.loading.show()
			return $.ajax(_opts)
		}

		//如果后面还有排队的，则发请求，并弹出队列
		var next = function(){
			uniques[key].current = null
			if(!uniques[key].queue.length) return

			uniques[key].current = post(uniques[key].queue[0])
			uniques[key].queue.shift()
		}

		//终止当前ajax
		var abort = function(){
			if(uniques[key].current){
				uniques[key].current.abort()
				uniques[key].current = null
			}
		}

		//如果是第一次请求 or 当前队列都是空的，直接发请求
		if(!uniques[key] || (!uniques[key].current&&!uniques[key].queue.length) ){
			uniques[key] = {
				current: post(opts),
				queue: []
			}
			return
		}

		//如果不是第一次往这个url发请求，并且前面的请求没完成
		if( uniques[key] && uniques[key].current ){
			//取flag
			var flag = opts.flag
			if( opts.flagPrior == 'left' && uniques[key].queue.length ){
				flag = uniques[key].queue[0].flag
			}
			//按flag发请求
			switch(opts.flag){
				case 'latest':
					uniques[key].current.abort()
					uniques[key] = {
						current: post(opts),
						queue: []
					}
					break
				case 'queue':
					uniques[key].queue.push(opts)
					break
			}
		}

	}

	if(!window.UniqueAjax){
		window.UniqueAjax = uniqueAjax
	}
	return uniqueAjax
})