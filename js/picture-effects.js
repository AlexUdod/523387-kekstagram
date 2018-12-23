'use strict';

(function () {
	var SCALE__STEP = 25;
	var MIN__SCALE__VALUE = 25;
	var MAX__SCALE__VALUE = 100;
	var FILTER__POINTS = 100;

	var onScaleControlSmaller = document.querySelector('.scale__control--smaller');
	var onScaleControlBigger = document.querySelector('.scale__control--bigger');
	var scaleControlValue = document.querySelector('.scale__control--value');
	var onImgUploadInput = document.querySelector('.img-upload__input');
	var imgUploadOverlay = document.querySelector('.img-upload__overlay');
	var onImgUploadCancel = document.querySelector('.img-upload__cancel');
	var effectsContainer = document.querySelector('.effects__list');
	var onSliderEffectPin = document.querySelector('.effect-level__pin');
	var sliderEffectValue = document.querySelector('.effect-level__value');
	var fotoEffectsList = document.querySelectorAll('.effects__preview');
	var bigFotoEffects = document.querySelector('.img-upload__preview');
	var containerRangeEffectLevel = document.querySelector('.effect-level');
	var effectPhotoLevelLline = document.querySelector('.effect-level__line');
	var scaleLine = document.querySelector('.effect-level__depth');

	var styleContainerRangeEffectLevel = getComputedStyle(containerRangeEffectLevel);
	var width = styleContainerRangeEffectLevel.getPropertyValue('width');
	var styleEffectPhotoLevelLline = getComputedStyle(effectPhotoLevelLline);
	var marginRight = styleEffectPhotoLevelLline.getPropertyValue('right');
	var marginLeft = styleEffectPhotoLevelLline.getPropertyValue('left');

	var filtersList = [
		{
			name: 'grayscale',
			minValue: 0,
			maxValue: 1,
			measure: ''
		},
		{
			name: 'sepia',
			minValue: 0,
			maxValue: 1,
			measure: ''
		},
		{
			name: 'invert',
			minValue: 0,
			maxValue: 100,
			measure:	'%'			
		},
		{
			name: 'blur',
			minValue: 0,
			maxValue: 3,
			measure:	'px'	
		},
		{
			name: 'brightness',
			minValue: 1,
			maxValue: 3,
			measure: ''			
		}
	];	

	var minPinPosition = 0;
	var maxPinPosition = parseInt(width, 10) - parseInt(marginLeft, 10) - parseInt(marginRight, 10);

	var addBigFotoEffects = function (smallFotoEffect, filter) {
		smallFotoEffect.addEventListener('click', function () {

			if (bigFotoEffects.classList.length > 1) {
				bigFotoEffects.classList.remove(bigFotoEffects.classList[1]);
			}
			bigFotoEffects.classList.add(smallFotoEffect.classList[1]);
			onSliderEffectPin.style.left = '100%';
			scaleLine.style.width = maxPinPosition + 'px';

			if (bigFotoEffects.classList[1] !== fotoEffectsList[0].classList[1]) {
				bigFotoEffects.style.filter = filter.name + '(' + filter.maxValue + ')';
				var object = {
					minValue: filter.minValue,
					maxValue: filter.maxValue,
					filterName: filter.name,
					filterMeasure: filter.measure
				};
				sliderEffectValue.min = filter.minValue;
				sliderEffectValue.max = filter.maxValue;
				sliderEffectValue.name = filter.name;
				sliderEffectValue.alt = filter.measure;
			} else {
				effectsContainer.style.display = 'none';
				bigFotoEffects.style.filter = 'none';
			}			
		});
	};

	var chooseSmallPhotoEffects = function () {
		for (var i = 0; i < fotoEffectsList.length; i++) {
			addBigFotoEffects(fotoEffectsList[i], filtersList[i - 1]);	
		}
	};

	chooseSmallPhotoEffects();

	onSliderEffectPin.addEventListener('mousedown', function (evt) {
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

			onSliderEffectPin.style.left = (onSliderEffectPin.offsetLeft - shift.x) + 'px';
			var currentPosition = (onSliderEffectPin.offsetLeft - shift.x);		
			scaleLine.style.width = currentPosition + 'px';

			if (currentPosition < minPinPosition || currentPosition > maxPinPosition) {
				document.removeEventListener('mousemove', onMouseMove);
			}

			var addBigFotoDeep = function () {
				var filterMinValue = sliderEffectValue.min;
				var filterMaxValue = sliderEffectValue.max;
				var filterPoints = countDeepParametrs(parseInt(filterMinValue, 10), parseInt(filterMaxValue, 10));
				var scalePoints = calcScale();
				var currentValue = currentPosition;
				for (var i = 0; i < scalePoints.length; i++) {
					if (currentValue === scalePoints[i]) {
						sliderEffectValue.value = filterPoints[i];
						if (bigFotoEffects.classList[1] !== fotoEffectsList[0].classList[1]) {
							bigFotoEffects.style.filter = sliderEffectValue.name + '(' 
						+ sliderEffectValue.value + sliderEffectValue.alt + ')';
						}					
						break;
					}		
				}
				sliderEffectValue.value = currentValue;
			};
			addBigFotoDeep();

	  };

	  var onMouseUp = function (upEvt) {
	  	upEvt.preventDefault();
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp); 		
	  };

		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);	
	});

	var countDeepParametrs = function (min, max) {
		var minValue = min;
		var filterPoints = [];
		for (var i = 0; i < FILTER__POINTS; i++) {
			min += (max - minValue)  / FILTER__POINTS;
			filterPoints[i] = min;
		}
		return filterPoints;
	};

	var calcScale = function() {
		var point = 0;
		var controlPoints = [];
		for (var i = 0; i < FILTER__POINTS; i++) {
			point += Math.floor(maxPinPosition / FILTER__POINTS);
			controlPoints[i] = point;
		}
		return controlPoints;
	};

	var onPopupEscPress = function (evt) {
		if (window.form.inputHashtags === document.activeElement || 
			window.form.inputTextDescription === document.activeElement) {
			return;
		} 
		if (evt.keyCode === window.form.ESC_KEYCODE) {
			closeImgUploadWindow();
		}
	};

	var summonImgFiltersForm = function () {
		imgUploadOverlay.classList.remove('hidden');
		scaleControlValue.value = MAX__SCALE__VALUE + '%';
		bigFotoEffects.style.transform = 'scale(' + MAX__SCALE__VALUE/100 + ')';
		document.addEventListener('keydown', onPopupEscPress);
	};

	onImgUploadInput.addEventListener('change', summonImgFiltersForm);

	var closeImgUploadWindow = function () {
		imgUploadOverlay.classList.add('hidden');
	};

	onImgUploadCancel.addEventListener('click', closeImgUploadWindow);

	var changeValue = function (data) {
		scaleControlValue.value = data + '%';
		bigFotoEffects.style.transform = 'scale(' + data/100 + ')';
	};

	var verifyPictureSize = function (data) {
		if (data > MAX__SCALE__VALUE) {
			data = MAX__SCALE__VALUE;
		} else if (data < MIN__SCALE__VALUE) {
			data = MIN__SCALE__VALUE;
		}
		changeValue(data);
		return data;
	};

	var changeScale = function () {
		var currentScaleValue = MAX__SCALE__VALUE;

		onScaleControlSmaller.addEventListener('click', function () {
			currentScaleValue -= SCALE__STEP;
			currentScaleValue = verifyPictureSize(currentScaleValue);
		});

		onScaleControlBigger.addEventListener('click', function () {
			currentScaleValue += SCALE__STEP;
			currentScaleValue = verifyPictureSize(currentScaleValue);
		});

	};
	changeScale();

	window.pictureEffects = {
		imgUploadOverlay: imgUploadOverlay
	};

})();
