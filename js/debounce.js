'use strict';

(function () {
	var DEBOUNCE__LENGHT = 500;

	var lastTimeout;
	window.debounce = function (cb, data) {
		var getData = function () {
			cb(data);
			window.chooseSmallFotoForShowingBig(data);
		};

		if (lastTimeout) {
			window.clearTimeout(lastTimeout);
		}
		lastTimeout = window.setTimeout(getData, DEBOUNCE__LENGHT);
	};

})();
