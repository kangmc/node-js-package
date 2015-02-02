;
(function ( $, window, document ) {
	/**
	 * @namespace jquery.plugin
	 * @name flicker	 
	 * @desc 특정영역에 플리킹 이벤트를 매핑. 좌우 방향에 따라 toLeft, toRight를 호출<br/>
	 panel flicking event catcher
	 */
	$.fn.flicker = function(options) {
		/**
		 * @example
		 * <caption>사용방법</caption>
		 * $('#Panel').flicker({ toLeft: '', toRight: '' });
		 */
		var defaults = { 
				toLeft: function() {},
				toRight: function() {}
			},
			config = $.extend(defaults, options);

		return this.each(function(i, v) {
			var $panel = $(v),
				touch_start_y = 0,
				touch_start_x = 0,
				save_x = 0,
				save_y = 0,
				move_dx = 0;

			 
			$panel
				/**
				 * touch start event mapping
				 * @name flicker#touchStart
				 * @event
				 * @param {Event} e - 이벤트 설명
				 * @desc 이벤트 설명
				 */
				.on('touchstart', function(event) {
					var e = event.originalEvent;
					if ( e.type === 'touchstart' && e.touches.length === 1 ) {
						touch_start_x = e.touches[ 0 ].pageX;
						touch_start_y = e.touches[ 0 ].pageY;
					}
				})
				/**
				 * touch move event mapping
				 * @name flicker#touchMove
				 * @event
				 * @param {Event} e
				 */
				.on('touchmove', function(event) {
					var e = event.originalEvent,
						drag_dist = 0,
						scroll_dist = 0,
						list_Width = 1;

					if ( event.type === 'touchmove' && e.touches.length === 1 ) {
						drag_dist = e.touches[ 0 ].pageX - touch_start_x;
						scroll_dist = e.touches[ 0 ].pageY - touch_start_y;
						move_dx = ( drag_dist / list_Width ) * 100;

						if ( Math.abs( drag_dist ) > Math.abs( scroll_dist ) ) {
							// ... move slide element
							e.preventDefault( );
						}
					}
				})
				.on('touchend', function(event) {
					var e = event.originalEvent;
					if ( event.type === 'touchend' && e.touches.length === 0 ) {
						if ( Math.abs( move_dx ) > 40 ) {
							if(move_dx > 0) {
								config.toLeft();
							} else {
								config.toRight();
							}
						} else {
							// ... move slide element to save_x or save_y position
						}

						touch_start_y = 0;
						touch_start_x = 0;
						move_x = 0;
						move_y = 0;
						move_dx = 0;

						e.preventDefault( );
					}
				});

		});

	/**
     * @example
     * <caption>JSDoc3 Captions</caption>
     * var a = 0;
     * 
     * for (var i = 0; i < 10; i++) {
     *     a++;
     * }
     * 
     * @example
     * jaguarjs-doc uses markdown style.
     * 
     * ```
     * var a = 0;
     * 
     * for (var i = 0; i < 10; i++) {
     *     a++;
     * }
     * ```
     */
	};
})(jQuery, window, document);