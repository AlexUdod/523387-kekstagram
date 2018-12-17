'use strict';

(function () {
	var DEBOUNCE__LENGHT = 2000;

	var lastTimeout;
	window.debounce = function (cb) {
		if (lastTimeout) {
			window.clearTimeout(lastTimeout);
		}
		lastTimeout = window.setTimeout(cb, DEBOUNCE__LENGHT);
	}
})();