'use strict';

(function () {
		var GET__URL = 'https://js.dump.academy/kekstagram/dat';
		var POST__URL = 'https://js.dump.academy/kekstagram';

		var mainContainer = document.querySelector('main');
		var errorTemplate = document.querySelector('#error')
		 .content
		 .querySelector('.error');
		var currentPostFormSubmit = document.querySelector('.img-upload__form');

		var onLoad = function (data) {
			window.createFotosGallery(data);
			window.chooseSmallFotoForShowingBig(data);
			window.receiveOnLoadData(data);
		};

		var onError = function (message) {
			console.error(message);
			var netError = errorTemplate.cloneNode(true);
			netError.querySelector('.error__title').textContent = message;
			mainContainer.appendChild(netError);
			document.addEventListener('keydown', onEscCloseErrorWindow);
			var errorWindow = document.querySelector('.error');
			errorWindow.style.zIndex = '1000';
			onBtnCloseErrorWindow();
			onBodyCloseErrorWindow();
		};

		var closeErrorWindow = function () {
			var errorWindow = document.querySelector('.error');
			errorWindow.style.display = 'none';	
		};

		var onBtnCloseErrorWindow = function () {
			parent.addEventListener('click', function(e) {
			  if(e.target && e.target.nodeName == 'BUTTON') {
			    closeErrorWindow();
			  }
			});
		};

		var onBodyCloseErrorWindow = function () {
			var parent = document.querySelector('body');
			parent.addEventListener('click', closeErrorWindow);
		};

		var onEscCloseErrorWindow = function (evt) {
			if (evt.keyCode === window.data.ESC_KEYCODE) {
				closeErrorWindow();
			}
		};

		window.loadData(GET__URL, onLoad, onError);
		window.postData(POST__URL, onLoad, onError, currentPostFormSubmit);

})();
