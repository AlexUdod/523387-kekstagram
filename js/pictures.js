var COMMENTS_LIST = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 
'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 
'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var DESCRIPTIONS_LIST = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 
'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 
'Вот это тачка!'];
var FOTOS_EFFECTS = ['filter: grayscale(0..1)', 'filter: sepia(0..1)', 'filter: invert(0..100%)', 
'filter: blur(0..3px)', 'filter: brightness(1..3)'];

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var NUMBER_ITEMS = 25;
var MIN_LIKES_NUMBER = 15;
var MAX_LIKES_NUMBER = 200;
var MIN_COMMENTS_NUMBER = 1;
var MAX_COMMENTS_NUMBER = 2;
var MIN_COMMENTS_AVATARS_NUMBER = 1;
var MAX_COMMENTS_AVATARS_NUMBER = 6;

var differentFotoTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

var galleryContainer = document.querySelector('.pictures');
var bigFotoContainer = document.querySelector('.big-picture');
var bigFotoContainerForImg = bigFotoContainer.querySelector('.big-picture__img');
var bigFotoImg = bigFotoContainerForImg.querySelector('img');
bigFotoImg.classList.add('big-picture__target-url');
var bigPictureCancel = bigFotoContainer.querySelector('.big-picture__cancel');
var imgFilters = document.querySelector('.img-filters');
var imgUploadInput = document.querySelector('.img-upload__input');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var imgUploadCancel = document.querySelector('.img-upload__cancel');
var sliderEffectPin = document.querySelector('.effect-level__pin');
var fotoEffectsList = document.querySelectorAll('.effects__preview');
var bigFotoEffects = document.querySelector('.img-upload__preview');



var closebigPictureWindow = function () {
	bigFotoContainer.classList.add('hidden');
};

bigPictureCancel.addEventListener('click', closebigPictureWindow);

var generItemLikes = function (min, max) {
	var randomLikesQuntity = Math.round(Math.random() * (max - min) + min);
	return randomLikesQuntity;
};

var generNumberComments = function (min, max) {
	var randomCommentsQuntity = Math.round(Math.random() * (max - min) + min);
	return randomCommentsQuntity;
};

var generItemComments = function () {
	var CommentsQuntity = generNumberComments(MIN_COMMENTS_NUMBER, MAX_COMMENTS_NUMBER);
	var finalCommentsList = '';
	for (var i = 0; i < CommentsQuntity; i++) {
		var randomCommentFromList = Math.floor(Math.random() * COMMENTS_LIST.length);
		finalCommentsList += COMMENTS_LIST[randomCommentFromList];
	}	
	return finalCommentsList;
};

var generBigFotoAvatar = function (min, max) {
	var randomBigFotoAvatarQuntity = Math.round(Math.random() * (max - min) + min);
	var finalBigFotoAvatar = 'img/avatar-' + randomBigFotoAvatarQuntity + '.svg';
	return finalBigFotoAvatar;
};

var generBigFotoComments = function () {
	var randomBigFotoComment = Math.floor(Math.random() * COMMENTS_LIST.length);
	var finalrandomBigFotoComment = COMMENTS_LIST[randomBigFotoComment];
	return finalrandomBigFotoComment;
};

var generItemDescription = function () {
	var randomDescriptionFromList = Math.floor(Math.random() * DESCRIPTIONS_LIST.length);
	var finalDescription = DESCRIPTIONS_LIST[randomDescriptionFromList];
	return finalDescription;
};

// создаем массив с обьектами 
var createItemsObject = function () {
	var itemsObjectsList = [];
	for (var i = 0; i < NUMBER_ITEMS; i++) {
		itemsObjectsList[i] = {
			url: 'photos/' + (i + 1) + '.jpg',
			likes: generItemLikes(MIN_LIKES_NUMBER, MAX_LIKES_NUMBER),
			commentsNumber: generNumberComments(MIN_COMMENTS_NUMBER, MAX_COMMENTS_NUMBER),
			comments: generItemComments (),
			bigFotoComments: {
				commentAvatar: generBigFotoAvatar(MIN_COMMENTS_AVATARS_NUMBER, MAX_COMMENTS_AVATARS_NUMBER),
				commentText: generBigFotoComments()
				},
			description: generItemDescription()
		}
	}
	return itemsObjectsList;
};

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
	var finalFotos = createItemsObject(); //подтянули создание обьекта массива
	var fragment = document.createDocumentFragment(); //обернули для единоразовой отрисовки браузером
	for (var i = 0; i < finalFotos.length; i++) {
		fragment.appendChild(renderFotos(finalFotos[i]));//создали и вставили элемент в массив		
	}
	galleryContainer.appendChild(fragment);// вставили элемент в разметку
};
createFotosGallery();// вызвали функцию

var renderBigFoto = function (bigFoto) {
	var bigFototObject = bigFotoContainer;
	// bigFototObject.querySelector('.big-picture__target-url').src = bigFoto.url;
	bigFototObject.querySelector('.likes-count').textContent = bigFoto.likes;
	bigFototObject.querySelector('.comments-count').textContent = bigFoto.commentsNumber;
	bigFototObject.querySelector('.social__picture').src = bigFoto.bigFotoComments.commentAvatar;
	bigFototObject.querySelector('.social__text').textContent = bigFoto.bigFotoComments.commentText;
	bigFototObject.querySelector('.social__caption').textContent = bigFoto.description;
	return bigFototObject;
};

// ВЫВОД ПО КЛИКУ БОЛЬШОЙ ФОТКИ

var newCreatedSmallFotos = document.querySelectorAll('.picture');
var newCreatedSmallFotosImg = document.querySelectorAll('.picture__img');

var showBigPictureOnClick = function (activeSmallFoto, imgUrl, bigPhoto) {
	activeSmallFoto.addEventListener('click', function () {
		bigFotoContainer.classList.remove('hidden');
		bigFotoImg.src = imgUrl.src;
		var essentialBigFoto = renderBigFoto(bigPhoto);
	})
};

var chooseSmallFotoForShowingBig = function () {
	var finalBigFotos = createItemsObject();
	for (var i = 0; i < newCreatedSmallFotos.length; i++) {
		showBigPictureOnClick(newCreatedSmallFotos[i], newCreatedSmallFotosImg[i], finalBigFotos[i]);
	}
};
chooseSmallFotoForShowingBig();

var commentCountItem = document.querySelector('.social__comment-count');
commentCountItem.classList.add('visually-hidden');

var commentLoaderItem = document.querySelector('.comments-loader');
commentLoaderItem.classList.add('visually-hidden');

// ДЗ № 4

// ВЫБОР ОТТЕНКОВ ФОТО

var addBigFotoEffects = function (smallFotoEffect) {
	smallFotoEffect.addEventListener('click', function () {
		if (bigFotoEffects.classList.length > 1) {
			bigFotoEffects.classList.remove(bigFotoEffects.classList[1]);
		}
		bigFotoEffects.classList.add(smallFotoEffect.classList[1]);
	});
};

var chooseSmallPhotoEffects = function () {
	for (var i = 0; i < fotoEffectsList.length; i++) {
		addBigFotoEffects(fotoEffectsList[i]);
	}
};

chooseSmallPhotoEffects();

// ВЫБОР ОТТЕНКОВ ПО ШКАЛЕ
var containerRangeEffectLevel = document.querySelector('.effect-level');
var effectPhotoLevelInput = document.querySelector('.effect-level__value');
var effectPhotoLevelLline = document.querySelector('.effect-level__line');

var styleContainerRangeEffectLevel = getComputedStyle(containerRangeEffectLevel);
var width = styleContainerRangeEffectLevel.getPropertyValue('width');
var styleEffectPhotoLevelLline = getComputedStyle(effectPhotoLevelLline);
var marginRight = styleEffectPhotoLevelLline.getPropertyValue('right');
var marginLeft = styleEffectPhotoLevelLline.getPropertyValue('left');
var minPinPosition = 0;
var maxPinPosition = parseInt(width, 10) - parseInt(marginLeft, 10) - parseInt(marginRight, 10);

sliderEffectPin.addEventListener('mousedown' , function (evt) {
	evt.preventDefault();

	var startCoords = {
		x: evt.clietX,
	};

	var onMouseMove = function (moveEvt) {
		moveEvt.preventDefault();

		var shift = {
			x: startCoords.x - moveEvt.clientX,
		};

		startCoords = {
			x: moveEvt.clientX,
		};

		sliderEffectPin.style.left = (sliderEffectPin.offsetLeft - shift.x) + 'px';
		var currentPosition = (sliderEffectPin.offsetLeft - shift.x);		

		if (currentPosition < minPinPosition || currentPosition > maxPinPosition) {
			document.removeEventListener('mousemove', onMouseMove);
		};

		var addBigFotoEffectsFromScale = function () {
			var pointsScale = calcScale();
			for (var i = 0; i < pointsScale.length; i++) {
				if (currentPosition < pointsScale[i]) {
					// всавлю условие на присвоение эффекта большой фотке
					if (bigFotoEffects.classList.length > 1) {
						bigFotoEffects.classList.remove(bigFotoEffects.classList[1]);
					}
						bigFotoEffects.classList.add(fotoEffectsList[i].classList[1]);
					break;					
				}
			}				
		};
		addBigFotoEffectsFromScale();

  };

  	var onMouseUp = function (upEvt) {
  		upEvt.preventDefault();
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp); 		
  };

	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('mouseup', onMouseUp);	
});

// Пропорция количества оттенков на шкале
var calcScale = function() {
	var point = 0;
	var controlPoints = [];
	for (var i = 0; i < fotoEffectsList.length; i++) {
		point += Math.round(maxPinPosition / fotoEffectsList.length);
		controlPoints[i] = point;
	}
	return controlPoints;
};

//ДЗ №5 ХЭШ-ТЭГИ
var inputHashtags = document.querySelector('.text__hashtags');
var inputTextDescription = document.querySelector('.text__description');

var onPopupEscPress = function (evt) {
	if (inputHashtags === document.activeElement || inputTextDescription === document.activeElement) {
		return;
	} 
	if (evt.keyCode === ESC_KEYCODE) {
		console.log('ESC');
		closeImgUploadWindow();
	}
};

var summonImgFiltersForm = function () {
	imgFilters.classList.remove('img-filters--inactive');
	imgUploadOverlay.classList.remove('hidden');
	document.addEventListener('keydown', onPopupEscPress)
};

imgUploadInput.addEventListener('change', summonImgFiltersForm);

var closeImgUploadWindow = function () {
	imgUploadOverlay.classList.add('hidden');
};

imgUploadCancel.addEventListener('click', closeImgUploadWindow);

inputHashtags.addEventListener('invalid', function (evt) {
	 if (inputHashtags.validity.tooShort) {
		inputHashtags.setCustomValidity('Хэш-тег должен состоять минимум из 2-х символов');
	}	else if (inputHashtags.validity.patternMismatch) {
		inputHashtags.setCustomValidity('Хэш-тег начинается с символа # (решётка) и разделяються пробелами, xеш-тег не может состоять только из одной решётки');
	}	else if (inputHashtags.validity.tooLong) {
		inputHashtags.setCustomValidity('Имя не должно превышать 105-ти символов');
	} else if (inputHashtags.validity.valueMissing) {
		inputHashtags.setCustomValidity('Обязательное поле');
	} 
	// else 
	//   	inputHashtags.setCustomValidity('');
	//   }
});

inputHashtags.addEventListener('input', function (evt) {
  var target = evt.target;
  var itemsMassiv = createMassivFromInputHashtags();
  var mirrorMassiv = [];
  for (var i = 0; i < itemsMassiv.length; i++) {  	
    if (itemsMassiv.length > 5) {
	    target.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
	  } else if (itemsMassiv[i].length < 2 || itemsMassiv[i].length > 20) {
	  	target.setCustomValidity('Xеш-тег не может состоять только из одной решётки, максимальная длина одного хэш-тега 20 символов, включая решётку');
	  } else if (mirrorMassiv.indexOf(itemsMassiv[i]) === -1){
    	mirrorMassiv.push(itemsMassiv[i]);
    } else if (mirrorMassiv.indexOf(itemsMassiv[i]) > -1) {
      target.setCustomValidity('Oдин и тот же хэш-тег не может быть использован дважды');
    }	else {
	  	target.setCustomValidity('');
	  }
  }
});

var createMassivFromInputHashtags = function () {
	var massivFromInputHashtags = inputHashtags.value.split(' ');
	console.log(massivFromInputHashtags);
	return massivFromInputHashtags;
};

var createMassivOnChange = function () {
	inputHashtags.addEventListener('change', createMassivFromInputHashtags);
};

createMassivOnChange();




