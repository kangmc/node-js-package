;
(function ( $, window, document ) {
	/**
	 * @namespace jquery.plugin
	 * @name groupcheck
	 * @desc nodes영역에 포함된 checkbox들의 전체선택, 전체해제를 컨트롤
	 * @param {Object} jQuery object로 child checkbox전체를 넘김.
	 */
	$.fn.groupcheck = function(options) {
		var defaults = {},                                  // default config info.
			config = $.extend(true, defaults, options);     // extend default config form options.

		return this.each(function (i, v) {
			var $checkbox = $(v),
				$nodes = config.nodes;

			$checkbox.on('change', function(e) {
				var checked = this.checked;
				$nodes.each(function (i, v) {
					v.checked = checked;
					$(v).trigger('change');
				});
			});

			$nodes.each(function (i, v) {
				var $this = $(v);
				$this.on('change', isAllChecked);
			});

			function isAllChecked() {
				var allChecked = true;
				$nodes.each(function (i, v) {
					if(v.checked == false) {
						allChecked = false;
						return false;
					}
				});
				$checkbox[0].checked = allChecked;
			}

		});
	};

})( jQuery, window, document );