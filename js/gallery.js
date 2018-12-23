'use strict';

(function () {
	var differentFotoTemplate = document.querySelector('#picture')
	  .content
	  .querySelector('.picture');
	var galleryContainer = document.querySelector('.pictures');
	var imgFilters = document.querySelector('.img-filters');	

	var renderFotos = function (foto) {
		var fotoObject = differentFotoTemplate.cloneNode(true);
		fotoObject.querySelector('.picture__img').src = foto.url;
		fotoObject.querySelector('.picture__likes').textContent = foto.likes;
		fotoObject.querySelector('.picture__comments').textContent = foto.comments.length;
		return fotoObject;
	};

	window.createFotosGallery = function (finalFotos) {		
		imgFilters.classList.remove('img-filters--inactive');
		var fragment = document.createDocumentFragment(); 
		for (var i = 0; i < finalFotos.length; i++) {
			fragment.appendChild(renderFotos(finalFotos[i]));		
		}
		galleryContainer.appendChild(fragment);	
	};
	
})();
