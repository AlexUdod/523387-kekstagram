'use strict';

(function () {
	var SUCCESS_REQUEST = 200;

	window.backend = {
		loadData: function (url, onLoad, onError) {
			var xhr = new XMLHttpRequest ();
			xhr.responseType = 'json';

			xhr.addEventListener('load', function () {
				if (xhr.status === SUCCESS_REQUEST) {
					onLoad(xhr.response);
				} else {
				onError(observeErrors(xhr));
				}
			});
			xhr.open('GET', url);
			xhr.send();
		},

		postData: function (url, onLoad, onError, formElement) {
			var oData = new FormData(formElement);
			var xhr = new XMLHttpRequest();
			xhr.open('POST', url);
			xhr.onload = function () {
				if (xhr.status === SUCCESS_REQUEST) {
					onLoad(xhr.response);
				} else {
					onError(observeErrors(xhr));
				}
			};
			xhr.send(oData);
		}
	};

	var observeErrors = function (xhr) {
		var error;
		switch (xhr.status) {
			case 400:
				error = 'Wrong request' + ' ' + xhr.status;
				break;
			case 401:
				error = 'No authorisation' + ' ' + xhr.status;
				break;
			case 404:
				error = 'Nothing has been found' + ' ' + xhr.status;
				break;
			case 500:
				error = 'Remoute troubles' + ' ' + xhr.status;
				break;
			default:
				error = 'Error number: ' + xhr.status + ' ' + xhr.statusText;
		}
		return error;
	};


})();
