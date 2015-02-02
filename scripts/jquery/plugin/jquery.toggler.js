;
/*	
 *	jQuery extends
 *	
 *	Copyright (c) 2014 MZ jeros
 *
 *	Dual licensed under the MIT and GPL licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */
(function( $, window, document){
	
	/** 
	 * @name : toggler
	 * @options : 
	 * {jQuery Selector} target
	 * {jQuery Selector} close
	 * {String} toggleClass : 해당 변수에 값이 있는 경우, show/hide 처리대신 add/remove 로 대체.
	 * {Number} duration
	 * {Boolean} isDocTrigger
	 * {Function} toggle : always excute form toggle
	 * {Function} beforeShow
	 * {Function} afterHide
	 * @desc :
	 * document click auto hide.
	 */
	$.fn.toggler = function (options) {
		var defaults = {
				target : '',
				close : '',
				toggleClass : '',
				duration : 0,
				isDocTrigger : false,
				toggle : function () {},
				beforeShow : function () {},
				afterHide : function () {}
			},
        	config = $.extend(true, defaults, options),
        	$btn = this,
        	$target = $(config.target),
        	$close = $(config.close, config.target);
        
        if($target.length){
        	this.on('click', toggleHandler);
        }

        function toggleHandler (e) {
			
    		if($btn.hasClass('active')) {
    			
    			hide();
    		} else {
    			
    			show();
    		}
    		return false;
        }
        
        function closeHandler (e) {
			
			var target = e.target,
				_$target = $(target),
				tag = target.tagName,
				excludeTag = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'I'];
			
			if($target.has(_$target).length === 0 && excludeTag.indexOf(tag) < 0){
				hide();
				return false;
			}
        }
        
        function show() {

        	$btn.addClass('active');
        	config.afterHide($btn);
        	config.beforeShow($btn);
        	
        	if(config.toggleClass){

        		$target.addClass(config.toggleClass);
        		
        	} else {
        		
        		$target.show(config.duration);
        		
        	}
        	
        	if(config.isDocTrigger){
        		
        		$(document).on('click', closeHandler);
        	}
        }
        
        function hide() {
			
        	$btn.removeClass('active');
        	config.afterHide($btn);
        	
        	if(config.toggleClass){
        		
        		$target.removeClass(config.toggleClass);
        		
        	} else {
        		
        		$target.hide(config.duration, function () {
	        		config.afterHide($btn);
	        	});
        	}
        	
        	$(document).off('click', closeHandler);
        }
        
        if($close.length){
        	$close.on('click', function () {
        		hide();
        	});
        }
	};
	
	
})(jQuery, window, document);
