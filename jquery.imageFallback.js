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

	if (typeof exports !== 'undefined' && window.$) { // CommonJS
		var imageFallback = fn($);

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = imageFallback;
		}

		exports.imageFallback = imageFallback;

		$.fn.imageFallback = imageFallback;
	} else if (typeof define === 'function' && define.amd) { // AMD
		define(['jquery'], function ($) {
			$.fn.imageFallback = fn($);
			return fn;
		});
	} else if (window.$) { // Global jQuery
		$.fn.imageFallback = fn($);
	} else {
		throw "jQuery not defined."
	}
})();