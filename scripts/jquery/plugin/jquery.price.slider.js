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
	 * @name : priceSlider
	 */
	$.fn.priceSlider = function (options) {
		var defaults = {
				max : '',
				min : '',
				start : '',
				end : ''
			},
        	config = $.extend(true, defaults, options),
        	$slider = this;
        
        
        return this.each(function (i, v) {
    		
    		var $start = $(config.start),
	        	$end = $(config.end),
	        	$min = $(config.min, $slider),
	        	$max = $(config.max, $slider),
	        	min = $min.text() || 0,
	        	max = $max.text() || 1000000,
	        	start = parseInt($start.asNumber(), 10),
	        	end = parseInt($end.asNumber(), 10);
	        
	        
	        
	        var $startHandle = undefined,
	        	$endHandle = undefined,
	        	$handles = undefined;
	        	
	        min = parseInt(min.replace(/,/g,''), 10);
	        max = parseInt(max.replace(/,/g,''), 10);
	        
	        
	        // TODO : number parse, ... parse money..
	        $slider.slider({
				range: true,
				min: min,
				max: max,
				step: 1000,
				values: [ start, end ],
				slide: function( event, ui ) {
					
					var start = ui.values[0],
						end = ui.values[1];
										
					$startHandle.text($.addCommas(start));
					$endHandle.text($.addCommas(end));
					$start.val($.addCommas(start));
					$end.val($.addCommas(end));
				}
			});
						
			$start.on('keyup keydown keypress', function(e){
				
				if(!$.isNumberKey(e)) return false;
				
				if(!$.isNumberKey(e)) {
					return false;
				}
				
				var sVal = $start.val();
				
				$slider.slider('values', 0, sVal);
				$startHandle.text($.addCommas(sVal));
			});
			
			$start.on('focus', function(e) {
				$start.val($start.asNumber());
			});
			
			$start.on('blur', function(e) {
				$start.formatCurrency();
				
				if($start.asNumber() < min){
					$start.val(min);
				}
				if($start.asNumber() > $end.asNumber()){
					$start.val($end.val());
				}
				
				$start.formatCurrency();
				$slider.slider('values', 0, $start.asNumber());
				$startHandle.text($start.val());
			});
			
			$end.on('keyup keydown keypress', function(e){
				
				if(!$.isNumberKey(e)) return false;
				
				var eVal = $end.val();
				
				$slider.slider('values', 1, eVal);
				$endHandle.text($.addCommas(eVal));
			});
			
			$end.on('focus', function(e) {
				$end.val($end.asNumber());
			});
			
			$end.on('blur', function(e) {
				$end.formatCurrency();
				
				if($end.asNumber() > max){
					$end.val(max);
				}
				if($end.asNumber() < $start.asNumber()){
					$end.val($start.val());
				}
				
				$end.formatCurrency();
				$slider.slider('values', 1, $end.asNumber());
				$endHandle.text($end.val());
			});
	        
			var handleInfo = [
					{name : '최소 가격', price : $.addCommas(start)},
					{name : '최대 가격', price : $.addCommas(end)}
				];
							
      		$slider.find('.ui-slider-handle').each(function(i, v){
      			
      			var html = $('<span class="hidden">' + handleInfo[i].name + '</span><span class="price-tooltip-wrap"><em class="price-tooltip">' + handleInfo[i].price + '</em></span>');
      			
      			$(v).html(html);
      		});
      		
      		$handles = $slider.find('.price-tooltip');
      		$startHandle = $($handles.get(0));
      		$endHandle = $($handles.get(1));
      		
    	});
	};
	
})(jQuery, window, document);
