'use strict';

(function () {
	var imgFilters = document.querySelector('.img-filters');
	var imgUploadInput = document.querySelector('.img-upload__input');
	var imgUploadOverlay = document.querySelector('.img-upload__overlay');
	var imgUploadCancel = document.querySelector('.img-upload__cancel');
	var sliderEffectPin = document.querySelector('.effect-level__pin');
	var fotoEffectsList = document.querySelectorAll('.effects__preview');
	var bigFotoEffects = document.querySelector('.img-upload__preview');
	var containerRangeEffectLevel = document.querySelector('.effect-level');
	var effectPhotoLevelInput = document.querySelector('.effect-level__value');
	var effectPhotoLevelLline = document.querySelector('.effect-level__line');
	var scaleLine = document.querySelector('.effect-level__depth');

	var styleContainerRangeEffectLevel = getComputedStyle(containerRangeEffectLevel);
	var width = styleContainerRangeEffectLevel.getPropertyValue('width');
	var styleEffectPhotoLevelLline = getComputedStyle(effectPhotoLevelLline);
	var marginRight = styleEffectPhotoLevelLline.getPropertyValue('right');
	var marginLeft = styleEffectPhotoLevelLline.getPropertyValue('left');

	var minPinPosition = 0;
	var maxPinPosition = parseInt(width, 10) - parseInt(marginLeft, 10) - parseInt(marginRight, 10);
	
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
			scaleLine.style.width = currentPosition + 'px';

			if (currentPosition < minPinPosition || currentPosition > maxPinPosition) {
				document.removeEventListener('mousemove', onMouseMove);
			};

			var addBigFotoEffectsFromScale = function () {
				var pointsScale = calcScale();
				for (var i = 0; i < pointsScale.length; i++) {
					if (currentPosition < pointsScale[i]) {
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

	var onPopupEscPress = function (evt) {
		if (window.form.inputHashtags === document.activeElement || 
			window.form.inputTextDescription === document.activeElement) {
			return;
		} 
		if (evt.keyCode === ESC_KEYCODE) {
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

})();