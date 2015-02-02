;
/**
 * @name : jquery.fn.navi
 */
(function( $, window, document){
	
	/** 
	 * @name : navi
	 */
	$.fn.navi = function(options) {
		var _this = this,
			defaults = {data : [], lnb: '', page : ''},
			config = $.extend(defaults, options);

		// return main nav
		function getList(data, deep) {
			var html = '';
			
			$.each(data, function(i, v){
				html += '<li' + (v.cls !== undefined ? ' class="' + v.cls + '"' : '') + '><a ' + (v.link !== undefined ? 'href="' + v.link + '"' : '') + '>' + v.name + '</a>';
				if(deep == true && v.child && v.child.length){
					html += '<ul>' + getList(v.child) + '</ul>';
				}
				html += '</li>';
			});
			
			return html;
		}
		
		function init() {			
			var child = setCurrent();

			$('<ul></ul>').addClass('nav navbar-nav').html(getList(config.data)).appendTo(_this);
			
			if (child) {
				$('<ul></ul>').addClass('nav nav-sidebar').html(getList(child)).appendTo(config.lnb);
				
				config.lnb.find('a').each(function(i, v){
					var $this = $(this);
					if($this.attr('href') == location.pathname) {
						$(this).closest('li').addClass('active');
					}	
				});
				
				if(!config.lnb.find('li.active').length) config.lnb.find('li:first').addClass('active');
			} else {
				config.lnb.remove();
				$('#contents').removeAttr('class').addClass('col-sm-12 main');
			}
		}
		
		
		function setCurrent() {
			var path = location.pathname.replace($.config('contextPath'), '').split('/')[0], 
				child;
			
			if(path === '/' || path === '') return null;
			
			$.each(config.data, function(i, v) {
				if(v.link.indexOf(path) > -1 ) {
					v.cls = 'active';
					child = v.child;
				}
			});
			
			return child;
		}

		init();
		
		return this;
	};
	
})( jQuery, window, document );