'use strict';

(function () {
	var differentFotoTemplate = document.querySelector('#picture')
	  .content
	  .querySelector('.picture');
	var galleryContainer = document.querySelector('.pictures');

	// создаем фото
	var renderFotos = function (foto) {
		var fotoObject = differentFotoTemplate.cloneNode(true); //даем добро на создание копий
		fotoObject.querySelector('.picture__img').src = foto.url;
		fotoObject.querySelector('.picture__likes').textContent = foto.likes;
		fotoObject.querySelector('.picture__comments').textContent = foto.comments;
		return fotoObject;
	};

	// создаем всю галлерею
	var createFotosGallery = function () {
		var finalFotos = window.data.createItemsObject;
		var fragment = document.createDocumentFragment(); 
		for (var i = 0; i < finalFotos.length; i++) {
			fragment.appendChild(renderFotos(finalFotos[i]));		
		}
		galleryContainer.appendChild(fragment);
	};
	createFotosGallery();

})();