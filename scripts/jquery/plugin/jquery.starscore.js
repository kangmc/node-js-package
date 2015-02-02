;
/*	
 *	jQuery starScore
 *	
 *	Copyright (c) 2014 MZ jeros
 *
 *	Dual licensed under the MIT and GPL licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */
(function( $, window, document){
	
	/** 
	 * @name : starScore
	 */
	$.fn.starScore = function( options ) {
		var defaults = {
				target : ''
			},                                  			// default config info.
        	config = $.extend(true, defaults, options),     // extend default config form options.
			clsName = 'active';
		
		return this.each(function (i, v) {
    		
    		var $score = $(v),
    			$input = $($score.data('target'));
    		
    		$score.find('button').on('click mouseover', eventHandler);
    		
    		$score.on('mouseleave', function() {
    			
    			var val = $score.data('score') || 0;
    			
    			if(val == 0) {
    				$score.find('button').removeClass(clsName);
    			} else {
    				$score.find('button').each(function (i, v) {
        				var $btn = $(this);
        				
        				if(val == $btn.val()){
        					btnActive($btn);
        					return;
        				}
        			});
    			}
    		});
    		
    		function eventHandler(e) {
    			
    			var $btn = $(this);
    			
    			btnActive($btn);
    			
    			if(e.type == 'click'){
    				setValue($btn.val());
    			}
    			
    			return false;
    		}
    		
    		function btnActive ($b) {
    			$b.addClass(clsName).nextAll().addClass(clsName);
				$b.prevAll().removeClass(clsName);
    		}
    		
    		function setValue (val) {
    			$score.data('score', val);
    			$input.val(val);
    		}
    	});
	};
})(jQuery, window, document);
