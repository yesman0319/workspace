'use strict'

define(['jquery'],function($){

	var html = [
				// '<div id="responser" class="noVis">',
				// '</div>'
				''].join(''),
			logs = []

	var ele = $(html).appendTo('body')

	$(document).on('click', function(e){
		if(e.target == ele.get(0)) return
		hide()
	})

	var show = function(options){
		var opts = $.extend({
			title: '',
			text: '',
			status: null,
			all: false
		}, options||{})

		logs.push(opts.text)

		var txt = opts.all ? logs.join('<br>') : opts.text

		ele.empty().html(opts.title + '：' + txt)
		fit()
		ele.removeClass('noVis')
	}

	var hide = function(){
		ele.addClass('noVis')
	}

	var fit = function(){
		ele.css({
			'margin-left': -ele.width()/2 + 'px',
			'margin-top': -ele.height()/2 + 'px'
		})
	}


	return {
		ele: ele,
		show: show,
		hide: hide
	}
})