'use strict';

(function () {
var bigFotoContainer = document.querySelector('.big-picture');
var bigFotoContainerForImg = bigFotoContainer.querySelector('.big-picture__img');
var bigFotoImg = bigFotoContainerForImg.querySelector('img');
bigFotoImg.classList.add('big-picture__target-url');
var bigPictureCancel = bigFotoContainer.querySelector('.big-picture__cancel');
var newCreatedSmallFotos = document.querySelectorAll('.picture');
var newCreatedSmallFotosImg = document.querySelectorAll('.picture__img');

var closebigPictureWindow = function () {
	bigFotoContainer.classList.add('hidden');
};

bigPictureCancel.addEventListener('click', closebigPictureWindow);

var renderBigFoto = function (bigFoto) {
	var bigFototObject = bigFotoContainer;
	bigFototObject.querySelector('.likes-count').textContent = bigFoto.likes;
	bigFototObject.querySelector('.comments-count').textContent = bigFoto.commentsNumber;
	bigFototObject.querySelector('.social__picture').src = bigFoto.bigFotoComments.commentAvatar;
	bigFototObject.querySelector('.social__text').textContent = bigFoto.bigFotoComments.commentText;
	bigFototObject.querySelector('.social__caption').textContent = bigFoto.description;
	return bigFototObject;
};

var showBigPictureOnClick = function (activeSmallFoto, imgUrl, bigPhoto) {
	activeSmallFoto.addEventListener('click', function () {
		bigFotoContainer.classList.remove('hidden');
		bigFotoImg.src = imgUrl.src;
		renderBigFoto(bigPhoto);
	})
};

var chooseSmallFotoForShowingBig = function () {
	var finalBigFotos = window.data.createItemsObject;
	for (var i = 0; i < newCreatedSmallFotos.length; i++) {
		showBigPictureOnClick(newCreatedSmallFotos[i], newCreatedSmallFotosImg[i], finalBigFotos[i]);
	}
};

chooseSmallFotoForShowingBig();

var commentCountItem = document.querySelector('.social__comment-count');
commentCountItem.classList.add('visually-hidden');

var commentLoaderItem = document.querySelector('.comments-loader');
commentLoaderItem.classList.add('visually-hidden');

})();
