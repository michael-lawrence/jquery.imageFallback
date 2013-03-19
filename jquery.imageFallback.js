'use strict';

(function () {
	// Constants
	var ERROR = 'error',
		SRC = 'src',
		FALLBACK = 'fallback',
		fn = function ($) {
			return function () {
				this.each(function () {
					var $el = $(this),
						dataFallback = $el.data(FALLBACK),
						dataSrc = $el.attr(SRC),
						onError = function () {
							$el.off(ERROR, onError).attr('src', dataFallback);
						};

					if (dataFallback) {
						$el.on(ERROR, onError).attr(SRC, dataSrc);
					}
				});

				return this;
			};
		};

	if (typeof exports !== 'undefined' && $) { // CommonJS
		if (typeof module !== 'undefined' && module.exports) {
			module.exports = fn($);
		}

		exports.imageFallback = fn($);
	} else if (typeof define === 'function' && define.amd) { // AMD
		define(['jquery'], function ($) {
			$.fn.imageFallback = fn($);
			return fn;
		});
	}

	if ($) { // Global jQuery
		$.fn.imageFallback = fn($);
	}
})();