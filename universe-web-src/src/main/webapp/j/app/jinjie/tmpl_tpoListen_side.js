'use strict'

define(function(){
  return [
  '<div class="sidebar">',
       '<div class="list-group">',
	       '<div id="sidePerson">',
	       	'<div class="head-div">',
		      	'<img src="" id="personImgSide" class="i8 border35"  width="120" height="120">',
		      	'<p class="p7" id="sideNickname"></p>',
	      		// '<a href="##" class="red">达人</a>',
	    	  '</div>',
         '</div>',
      // '{{if data}}',
      //   '{{each data as value index}}',
      //     '<a href="##" id="{{value.id}}" class="list-group-item bold menu_head side-nav1">{{value.content}}</a>',
      //   '{{/each}}',
      // '{{/if}}',
      '</div>',
    '</div>',
  ].join('')
})
