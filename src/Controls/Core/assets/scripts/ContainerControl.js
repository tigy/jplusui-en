/**
 * @author  xuld
 */



using("Controls.Core.Base");

/**
 * 所有容器控件的基类。
 * @abstract class 
 * @extends Control
 */
var ContainerControl = Control.extend({
	
	// 基本属性
	
	tpl: '<div class="x-control">\
			<div class="x-control-body"></div>\
		</div>',
		
	headerTpl: '<div class="x-control-header"><h4></h4></div>',
	
	/**
	 * 获取当前容器的标题部分。
	 * @return {Control}
	 */
	header: function(){
		return this.find('.x-' + this.xtype + '-header');
	},
	
	/**
	 * 获取当前容器的内容部分。
	 * @getter {Control}
	 */
	body: function(){
		return this.find('.x-' + this.xtype + '-body') || this;
	},
	
	// 基本操作
	
	/**
	 * 获取当前容器显示的标题。
	 * @param {Boolean} valueAsText 是否编码 *value* 中的 HTML 字符串。
	 */
	getTitle: function(valueAsText){
		
		// 获取 header 。
		var header = this.header();
		
		// 如果存在 header， 最后一个节点即  title 标签 。
		return header ? (header.last() || header)[valueAsText ? 'getText' : 'getHtml']() : null;
	},
	
	/**
	 * 设置当前容器显示的标题。
	 * @param {String} value 要设置的标题。
	 * @param {Boolean} valueAsText 是否编码 *value* 中的 HTML 字符串。
	 */
	setTitle: function(value, valueAsText){
		
		// 获取 header 。
		var header = this.header(), title;
		
		if(value === null){
			header && header.remove();
		} else {
			
            // 如果不存在标题，则创建一个。
			if(!header){
				header = this.prepend(this.headerTpl.replace(/control/g, this.xtype));
			}
			
			// 获取或创建 title 。
			title = header.last() || header;
			
			// 设置内容。
			title[valueAsText ? 'setText' : 'setHtml'](value);
			
		}
		return this;
	},
	
	/**
	 * 获取当前容器显示的内容。
	 * @param {Boolean} valueAsText 是否编码 *value* 中的 HTML 字符串。
	 */
	getContent: function(valueAsText){
		
		// 获取 body 。
		// 获取 content 。
		var body = this.body(), content = body.last();
		
		// 如果存在多个 content，使用 body 作为 content。
		if (!content || content.prev()) {
			content = body;
		}
		
		// 获取实际的内容。
		return content[valueAsText ? 'getText' : 'getHtml']();
		
	},
	
	/**
	 * 设置当前容器显示的内容。
	 * @param {String} value 要设置的标题。
	 * @param {Boolean} valueAsText 是否编码 *value* 中的 HTML 字符串。
	 */
	setContent: function(value, valueAsText){
		
		// 获取 body 。
		var body = this.body(), 
			contentClass = 'x-' + this.xtype + '-content', 
			
			// 获取 content 。
			content = body.find(contentClass);

	    // 如果不存在 content，则创建一个。
		if (!content) {
		    body.setHtml('<div class="' + contentClass + '"></div>');
		    content = body.first();
		}
		
		// 设置文本内容。
		content[valueAsText ? 'setText' : 'setHtml'](value);
		return this;
		
	},
	
	getText: function(){
		return this.getContent(true);
	},
	
	setText: function(value){
		return this.setContent(value, true);
	},
	
	getHtml: function(){
		return this.getContent(false);
	},
	
	setHtml: function(value){
		return this.setContent(value, false);
	}

});