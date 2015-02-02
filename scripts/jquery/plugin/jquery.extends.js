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
	 * @name : openWindow
	 */
	$.openWindow = function (options) {
		var defaults = {
				url : '',
				name : '',
				option : {
					width : 600,
					height : 400,
					toolbar : 'no',
					menubar : 'no',
					location : 'no',
					scrollbars : 'no',
					status : 'no'
				}
			},                                  // default config info.
        	config = $.extend(true, defaults, options);     // extend default config form options.
        	
		var winOptions = $.param(config.option);
		
		if(!config.url) return;
		
		window.open(config.url, config.name, winOptions);
		
		return this.each(function (i, v) {
    		
    	});
	};
	
	/** 
	 * @name : openLayer
	 * @depends : underscore
	 */
	$.openLayer = function (options) {
		var defaults = {
				returnTarget : '',
				target : document.body,
				contents : function () {},
				callback : function (){}
			},
        	config = $.extend(true, defaults, options),
        	$target = $(config.target),
        	isMask = $.mask !== undefined;
        
        if(isMask) $.mask.show();
        
        var $contents = $(config.contents());
        $target.append($contents);
        config.callback();
        
        // set close event handler.
        $contents.find('button.btn_close').on('click', function(){
        	if(isMask) $.mask.hide();
        	$contents.remove();
        	config.returnTarget.focus();
        });
        
        //set focus
        $contents.find('a, button').on('keyup keydown', focusHandler).first().focus();
		var moveFirst = false;
        function focusHandler(e) {
            var keyCode = e.keyCode;
                        
            if (keyCode == 9) {
                if (moveFirst) {
                    $contents.find('a, button').first().focus();
                    moveFirst = false;
                    return false;
                }
                if ($(this)[0] == $contents.find('a, button').last()[0]) {
                    moveFirst = true;
                    return false;
                }
            }
        }
        
        // TODO : 클로즈 발생시 포커스 돌려주기.
        
        
	};
	
	
	
	
})(jQuery, window, document);
