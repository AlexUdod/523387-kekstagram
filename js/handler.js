'use strict';

(function () {

		var mainContainer = document.querySelector('main');
		var errorTemplate = document.querySelector('#error')
		 .content
		 .querySelector('.error');

		var onLoad = function (data) {
			console.log(data);
			window.createFotosGallery(data);
			window.chooseSmallFotoForShowingBig(data);
		};

		var onError = function (message) {
			console.error(message);
			var netError = errorTemplate.cloneNode(true);
			netError.querySelector('.error__title').textContent = message;
			mainContainer.appendChild(netError);
		};

		window.loadData('https://js.dump.academy/kekstagram/data', onLoad, onError);
		window.postData('https://js.dump.academy/kekstagram', onLoad, onError);
})();
