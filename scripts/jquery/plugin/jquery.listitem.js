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
	 * @name : listItem
	 * @desc : 
	 * mouseover, focusin : add active class
	 * mouseout, focusout : remove active class
	 * check box checked : add selected class
	 * click cart : open cart layer
	 * quantity minus/plus.
	 * @arguments
	 * {Function} detail
	 * {Function} zzim
	 * {Function} cart
	 */
	$.fn.listItem = function( options ) {
		var defaults = {
				duration : 150
			},                                  			// default config info.
        	config = $.extend(true, defaults, options),     // extend default config form options.
        	inner_config = {
        		item : '.item',
        		item_detail : 'a[name=item_detail]',
        		item_option : 'select[name=item_option]',
        		item_quantity : 'input[name=item_quantity]',
        		item_no : 'input[name=item_no]',
        		
        		
        		btn_item_detail : 'a[name=btn_item_detail]',
        		btn_item_zzim : 'a[name=btn_item_zzim]',
        		btn_item_cart : 'a[name=btn_item_cart]',
        		
        		btn_option_cart : 'a[name=btn_option_cart]',
        		btn_option_close : 'a[name=btn_option_close]',
        		
				layer : '.layer-option',
				clsActive : 'active',
				clsSelected : 'selected',
        	},
			$list = this,
			$items = this.find(inner_config.item),
			$layers = $items.find(inner_config.layer);
		
		function closeAllCart () {
			$list.find(inner_config.layer).hide();
		}
		
		// detail
		$items.on('click', inner_config.btn_item_detail, function (e) {
    		
    		if($.isFunction(config.detail)){
    			config.detail($(this));			// arguments [btn_item_detail]
    		} else {
    			location.href = $(inner_config.item_detail).attr('href');
    		}
    		return false;
		});
		
		
		// zzim
		$items.on('click', inner_config.btn_item_zzim, function (e) {
    			    		
    		if($.isFunction(config.zzim)){
    			config.zzim($(this));			// arguments [btn_item_zzim]
    		}
    		return false;
		});
				
		// cart
		$items.on('click', inner_config.btn_item_cart, function (e) {
    		
    		var $btnCart = $(this),
    			$item = $btnCart.closest(inner_config.item);
							
			// option_layer 유무에 따른 설정 변경.
			if($item.find(inner_config.layer).length){
				if($item.find(inner_config.layer).css('display') == 'none') {
					closeAllCart();
				}
				
				$item.find(inner_config.layer).fadeToggle(config.duration);
				return false;	
			} else {
				
				if($.isFunction(config.cart)){
	    			config.cart($btnCart);			// arguments [btn_item_cart]
	    		}
	    		
				return false;
			}
		});
		
		// options > cart
		$items.on('click', inner_config.btn_option_cart, function (e) {
    		if($.isFunction(config.cart)){
    			config.cart($(this));			// arguments [btn_option_cart]
    		}
    		return false;
		});
		
		// option > close
		$items.find(inner_config.btn_option_close).on('click', outHandler);
		
		function outHandler(e) {
			
			$(this).closest(inner_config.item).find(inner_config.layer).hide();
			return false;
		}
				
		
		
		// item checkbox
		$items.on('click', inner_config.item_no, function (e) {
    			    		
    		var $chk = $(this),
    			$item = $chk.closest(inner_config.item);
    		
    		if($chk.is(':checked')){
    			$item.addClass(inner_config.clsSelected);
    		} else {
    			$item.removeClass(inner_config.clsSelected);
    		}	
		});
		
		// quantity minus/plus.
		if($.isFunction($.fn.nAdjust)){
			$items.find(inner_config.item_quantity).nAdjust({
				readonly:false
			});
		}
		
		function getLastTarget($item){
			
			var searchTag = 'A, BUTTON, INPUT, SELECT, TEXTAREA';
			var $searchTag = $item.find(searchTag);
			
			return $searchTag.get($searchTag.length - 1);
		}
		
		$items.each(function (i, v) {
			
			var $item = $(v);
				lastTarget = getLastTarget($item);
			
			// item mouseover/mouseleave
			$item.on('mouseenter focusin', function (e) {
				
	    		$(this).addClass(inner_config.clsActive);
	    		return false;
			}).on('mouseleave focusout', function (e) {
				
				if(e.type == 'mouseleave'){
					$(this).removeClass(inner_config.clsActive).find(inner_config.layer).fadeOut(config.duration);
				}
					
				if(e.type == 'focusout' && e.target.name == lastTarget.name){
					
					$(this).closest(inner_config.item).removeClass(inner_config.clsActive).find(inner_config.layer).fadeOut(config.duration);
				}
	    		
				return false;
			});
		});
		
	};
	
	
})(jQuery, window, document);
