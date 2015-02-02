;
/*
 *	jQuery rolling 0.0.1
 *	
 *	Copyright (c) 2014 MZ jeros
 *
 *	Dual licensed under the MIT and GPL licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */

(function( $, window, document){
	
	/** 
	 * @name : rolling
	 */
	$.fn.rolling = function(options) {
		
		var defaults = {
				number : 0
			},
            config = $.extend(true, defaults, options);     // extend default config form options.
        
        return this.each(function (i, v) {
        	
        	
        });
	};
	
})( jQuery, window, document );