'use strict';

(function () {
	var MAX__NEW__PHOTOS = 10;

	var filterPopular = document.querySelector('#filter-popular');
	var filterNew = document.querySelector('#filter-new');
	var filterDiscussed = document.querySelector('#filter-discussed');
	var imgFilterButtons = document.querySelectorAll('.img-filters__button');

	var deleteFotos = function () {
		var elements = document.getElementsByClassName('picture');
		while (elements[0]) {
<<<<<<< HEAD
			elements[0].parentNode.removeChild(elements[0]);
=======

			elements[0].parentNode.removeChild(elements[0]);

>>>>>>> 76f7b207a0d4da2ead68e4c3efabb98b69a53a2d
		}
	};

	var removeActiveClass = function () {
		imgFilterButtons.forEach(function (element) {
			element.classList.remove('img-filters__button--active');
		});
	};

	var shuffle = function (o) {
		for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	};

<<<<<<< HEAD
=======

>>>>>>> 76f7b207a0d4da2ead68e4c3efabb98b69a53a2d
	var clearPhotos = function () {
		removeActiveClass();
		deleteFotos();
		filterPopular.classList.add('img-filters__button--active');
	};

	window.receiveOnLoadData = function (data) {
		var dataCopy = data.slice();
		filterPopular.addEventListener('click', function () {
			clearPhotos();
			window.debounce(window.createFotosGallery, data);
		});

		filterNew.addEventListener('click', function () {
			clearPhotos();
			var randomMassiv = shuffle(dataCopy).slice(0, MAX__NEW__PHOTOS);
			window.debounce(window.createFotosGallery, randomMassiv);
<<<<<<< HEAD
=======

	window.receiveOnLoadData = function (data) {
		var dataCopy = data.slice();
		
		filterPopular.addEventListener('click', function () {
			removeActiveClass();
			deleteFotos();
			filterPopular.classList.add('img-filters__button--active');
			window.debounce(window.createFotosGallery, data);			
		});

		filterNew.addEventListener('click', function () {
			removeActiveClass();					
			deleteFotos();
			filterNew.classList.add('img-filters__button--active');
			var randomMassiv = shuffle(dataCopy).slice(0, MAX__NEW__PHOTOS);
			window.debounce(window.createFotosGallery, randomMassiv);			

>>>>>>> 76f7b207a0d4da2ead68e4c3efabb98b69a53a2d
		});

		filterDiscussed.addEventListener('click', function () {
			removeActiveClass();
			deleteFotos();
			filterDiscussed.classList.add('img-filters__button--active');

			dataCopy.sort(function (a, b) {
				if (a.comments.length < b.comments.length) {
					return 1;
<<<<<<< HEAD
				}
=======

				}

				}	

>>>>>>> 76f7b207a0d4da2ead68e4c3efabb98b69a53a2d
				if (a.comments.length > b.comments.length) {
					return -1;
				}
				return 0;			
			});
			window.debounce(window.createFotosGallery, dataCopy);			
		});
	};
<<<<<<< HEAD
	
=======




>>>>>>> 76f7b207a0d4da2ead68e4c3efabb98b69a53a2d
})();
