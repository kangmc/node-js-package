;
/*
 *	jQuery number adjust 0.0.1
 *	
 *	Copyright (c) 2014 MZ jeros
 *
 *	Dual licensed under the MIT and GPL licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */
(function( $, window, document){
	
	/** 
	 * @name : nAdjust
	 */
	$.fn.nAdjust = function(options) {
		
		var defaults = {
				number : 1,
				minus : '',
				plus : '',
				readonly : false
			},
            config = $.extend(true, defaults, options)     // extend default config form options.
        	;
        
        return this.each(function (i, v) {
        	
        	var $input = $(v), 
        		$wrap = $input.parent(),
        		val = $input.val() || config.number,
        		$btnMinus = $input.prev(),
        		$btnPlus = $input.next();
        	        	
        	val = parseInt(val, 10);
        	
        	$btnMinus.on('click', minusHandler);
        	$btnPlus.on('click', plusHandler);
        	
        	if(config.readonly){
        		
        		$input.attr('readonly', true);
        	} else {
        		
        		$input.on('keyup keydown', function(e){
        			if(!$.isNumberKey(e)) return false;
        		});
        	}
        	
        	function plusHandler (e) {
        		
        		var val = parseInt($input.val(), 10) + 1;
        		
        		$input.val(val);
        	}
        	
        	function minusHandler (e) {
        		
        		var val = parseInt($input.val(), 10);
        		
        		if(val > config.number) {
        			var val = parseInt(val - 1);
    				$input.val(val);
    			}
        	}
        });
	};
	

})( jQuery, window, document );