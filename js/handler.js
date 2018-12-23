'use strict';

(function () {
	var GET__URL = 'https://js.dump.academy/kekstagram/data';
	var POST__URL = 'https://js.dump.academy/kekstagram';

	var mainContainer = document.querySelector('main');
	var errorTemplate = document.querySelector('#error')
		.content
		.querySelector('.error');
	var onCurrentPostForm = document.querySelector('.img-upload__form');

	var onLoad = function (data) {
		window.createFotosGallery(data);
		window.chooseSmallFotoForShowingBig(data);
		window.receiveOnLoadData(data);
	};

	var onError = function (message) {
		var netError = errorTemplate.cloneNode(true);
		netError.querySelector('.error__title').textContent = message;
		mainContainer.appendChild(netError);
		document.addEventListener('keydown', onEscCloseErrorWindow);
		var errorWindow = document.querySelector('.error');
		errorWindow.style.zIndex = '1000';
		onBtnCloseErrorWindow();
		onBodyCloseErrorWindow();
	};

	var callFormData = function () {
		onCurrentPostForm.addEventListener('submit', function (evt) {
			window.form.sendForm();
			window.backend.postData(POST__URL, onLoad, onError, onCurrentPostForm);
			evt.preventDefault();
		});
	};
	callFormData();

	var closeErrorWindow = function () {
		var errorWindow = document.querySelector('.error');
		errorWindow.style.display = 'none';
	};

	var onBtnCloseErrorWindow = function () {
		parent.addEventListener('click', function (e) {
			if (e.target && e.target.nodeName === 'BUTTON') {
				closeErrorWindow();
			}
		});
	};

	var onBodyCloseErrorWindow = function () {
		var parent = document.querySelector('body');
		parent.addEventListener('click', closeErrorWindow);
	};

	var onEscCloseErrorWindow = function (evt) {
		if (evt.keyCode === window.form.ESC_KEYCODE) {
			closeErrorWindow();
		}
	};

	window.backend.loadData(GET__URL, onLoad, onError);

})();
