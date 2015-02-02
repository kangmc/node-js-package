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
	 * @name : listAccordion
	 */
	$.fn.listAccordion = function (options) {
		var typeInfo = {
				'all' : 'A',
				'one' : 'O'
			},
			defaults = {
				type : 'one'
			},
        	config = $.extend(true, defaults, options),
        	$target = this,
        	tagName = $target.get(0).tagName,
        	activeCls = 'active';
        
        config.type = (typeInfo[config.type] || typeInfo.one);
        
        
        var $headers = getHeaders(), 
        	$bodys;
        
        $headers.on('click', actionHandler);
        
        function getHeaders(){
        	
        	var selector = 'h3 > A';
        	
        	if(tagName == 'TABLE') {
        		selector = 'tr:odd > .title > a';
        	}
        	return $target.find(selector);
        }
        
        function getItem($t){
        	
        	var $item;
        	
        	if(tagName == 'TABLE') {
        		$item = $t.closest('tr').next();
        	} else {
        		$item = $t.closest('li');
        	}
        	return $item;
        }
        
        function actionHandler(e){
        	
        	var $item = getItem($(this));
        	
        	if(config.type === typeInfo.always){
        		
        		if($item.hasClass(activeCls)){
        			$item.removeClass(activeCls);
        		} else {
        			$item.addClass(activeCls);
        		}
        	} else {
        		
        		if($item.hasClass(activeCls)){
        			$item.removeClass(activeCls);
        		} else {
        			$item.addClass(activeCls).siblings().removeClass(activeCls);
        		}
        	}
        	
        	
			return false;
        }
        return this.each(function (i, v) {
    		
    	});
	};
	
})(jQuery, window, document);
