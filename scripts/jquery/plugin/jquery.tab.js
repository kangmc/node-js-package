;
/** 
 *
 */
(function ($, window, document, undefined) {
	$.fn.tab = function(options) {
		var base = $(this);

		options = $.extend({}, $.fn.tab.options, options);

		function init() {
			base.find(options.navs).on('click', show);
		}

		function show(e) {
			if(e) {
				e.preventDefault();
			}

			$(this).addClass(options.current)
				.siblings().removeClass(options.current);

			$(this.hash).addClass(options.contents)
				.siblings().removeClass(options.contents);
		}

		this.go = function(index) {
			base.find(options.navs).eq(index).trigger('click');
		};

		init();

		return this.each(function () {
			var elem = $(this);
		});
	};

	$.fn.tab.options = {
		navs:'> a',
		contents:'active',
		current:'active'
	};
})(jQuery, window, document, undefined);
