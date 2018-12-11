'use strict';

(function () {
	var xhr = new XMLHttpRequest ();
	var request = new XMLHttpRequest ();
	var imgUploadSubmit = document.querySelector('.img-upload__submit');
	//необходимо установить соответствующий заголовок 
	// и сериализовать данные с помощью метода JSON.stringify
	var requestJson = JSON.stringify();
	xhr.responseType = 'json';

	var onLoad = function (data) {
		console.log(data);
	};

	var onError = function (message) {
		console.error(message);
	};

	//срабатывает, когда сервер вернет запрос
	xhr.addEventListener('load', function () {
		if (xhr.status === 200) {
			onLoad(xhr.response);
		} else {
			onError(observeErrors());
		}
	});

	imgUploadSubmit.addEventListener('click', function () {
		if (request.status === 200) {
			onLoad(	request.onreadystatechange = function () {		
				document.querySelector('.img-upload__form').innerHTML = request.responseText;
			});
		} else {
			onError(observeErrors());
		}
	});

	xhr.open('GET', 'https://js.dump.academy/kekstagram/data');
	xhr.send();

	request.open('POST', 'https://js.dump.academy/kekstagram');
	request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
	request.send(requestJson);

	var observeErrors = function () {
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
			default:
				error = 'Error number: ' + xhr.status + ' ' + xhr.statusText;
		}
		switch(request.status) {
			case 500:
				error = 'Remoute troubles' + ' ' + request.status;
				break;
			default:
				error = 'Error number: ' + request.status + ' ' + request.statusText;
		}
		return error;
	};


})();