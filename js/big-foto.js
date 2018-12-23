'use strict';

(function () {
	var bigFotoContainer = document.querySelector('.big-picture');
	var bigFotoContainerForImg = bigFotoContainer.querySelector('.big-picture__img');
	var bigFotoImg = bigFotoContainerForImg.querySelector('img');
	bigFotoImg.classList.add('big-picture__target-url');
	var onBigPictureCancel = bigFotoContainer.querySelector('.big-picture__cancel');
	var socialCommentsContainer = document.querySelector('.social__comments');
	var socialCommentItem = socialCommentsContainer.querySelector('.social__comment');

	var closebigPictureWindow = function () {
		bigFotoContainer.classList.add('hidden');
		deleteComments();
	};

	var onEscCloseErrorWindow = function (evt) {
		if (evt.keyCode === window.form.ESC_KEYCODE) {
			closebigPictureWindow();
		}
	};

	var deleteComments = function () {
		var element = document.querySelector('.social__comments');
		while (element.firstChild) {
		element.removeChild(element.firstChild);
		}
	};

	onBigPictureCancel.addEventListener('click', closebigPictureWindow);

	document.removeEventListener('keydown', onEscCloseErrorWindow);

	var renderBigFoto = function (bigFoto) {
		var bigFototObject = bigFotoContainer;
		deleteComments();
		for (var i = 0; i < bigFoto.comments.length; i++)	{
			socialCommentItem.querySelector('.social__picture').src = bigFoto.comments[i].avatar;
			socialCommentItem.querySelector('.social__text').textContent = bigFoto.comments[i].message + '  ' + bigFoto.comments[i].name;
			socialCommentsContainer.appendChild(socialCommentItem.cloneNode(true));
		}
		bigFototObject.querySelector('.likes-count').textContent = bigFoto.likes;
		bigFototObject.querySelector('.social__caption').textContent = bigFoto.description;
		return bigFototObject;
	};

	var showBigPictureOnClick = function (activeSmallFoto, imgUrl, bigPhoto) {
		activeSmallFoto.addEventListener('click', function () {
			bigFotoContainer.classList.remove('hidden');
			document.addEventListener('keydown', onEscCloseErrorWindow);
			bigFotoImg.src = imgUrl.src;
			renderBigFoto(bigPhoto);
			window.openComments(bigPhoto);
		});
	};

	window.chooseSmallFotoForShowingBig = function (data) {
		var newCreatedSmallFotos = document.querySelectorAll('.picture');
		var newCreatedSmallFotosImg = document.querySelectorAll('.picture__img');
		for (var i = 0; i < newCreatedSmallFotos.length; i++) {
			showBigPictureOnClick(newCreatedSmallFotos[i], newCreatedSmallFotosImg[i], data[i]);
		}
	};

})();
