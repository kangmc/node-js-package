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
	 * @name : scrollinto
	 * @TODO : 레이어 스크롤이 끝난 후, 다시 스크롤 하면 body scroll 동작하도록 처리.
	 * 다시 스크롤 한다는 기준의 이벤트가 없음.
	 */
	$.fn.scrollinto = function(options) {
		
		var defaults = {
				step : 40
			},
            config = $.extend(true, defaults, options);     // extend default config form options.
        
		function moveDeltaY ($t, deltaY) {
			
			var move = $t.scrollTop() + (config.step * (- deltaY));
			$t.scrollTop(move);
		}
		
        return this.each(function (i, v) {
        	
        	var $t = $(v);
        	
        	$t.on('mouseenter', function () {
				$(document.body).on('mousewheel', bodyWheelHandler);
			}).on('mouseleave', function () {
				$(document.body).off('mousewheel', bodyWheelHandler);
			});
			
			function bodyWheelHandler (e) {
				
				moveDeltaY($t, e.deltaY);
				return false;
			}
        });
	};
	

})( jQuery, window, document );