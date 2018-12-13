'use strict';

(function () {
	window.loadData = function (url, onLoad, onError) {
		var xhr = new XMLHttpRequest ();
		xhr.responseType = 'json';

		xhr.addEventListener('load', function () {
			if (xhr.status === 200) {
				onLoad(xhr.response, window.createFotosGallery, window.chooseSmallFotoForShowingBig);
			} else {
			onError(observeErrors(xhr));
			}
		});

		xhr.open('GET', url);
		xhr.send();
	};

	window.postData = function (url, onLoad, onError) {
		var formElement = document.querySelector('.img-upload__form');
		var imgUploadSubmit = document.querySelector('.img-upload__submit');

		imgUploadSubmit.addEventListener('click', sendRequest);

		var sendRequest = function (evt) {
			evt.preventDefault();
			var formData = new FormData(formElement);
			var xhr = new XMLHttpRequest ();
			xhr.open('POST', url);
			xhr.onreadystatechange = function () {
				if (xhr.status == 200){
					onLoad(xhr.responseText);
				}	else {
					onError(observeErrors(xhr));
				}
			};
			xhr.send(formData);
		};
	};

	var observeErrors = function (xhr) {
		var error;
		switch(xhr.status) {
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
