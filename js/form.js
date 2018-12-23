'use strict';

(function () {
	var ESC_KEYCODE = 27;

	var onInputHashtags = document.querySelector('.text__hashtags');
	var onInputTextDescription = document.querySelector('.text__description');

	onInputHashtags.addEventListener('invalid', function () {
		onInputHashtags.style.border = '2px solid red';
	 	if (onInputHashtags.validity.tooShort) {
		onInputHashtags.setCustomValidity('Хэш-тег должен состоять минимум из 2-х символов');
		}	else if (onInputHashtags.validity.patternMismatch) {
		onInputHashtags.setCustomValidity('Хэш-тег начинается с символа # (решётка) и разделяються пробелами, xеш-тег не может состоять только из одной решётки');
		}	else if (onInputHashtags.validity.tooLong) {
		onInputHashtags.setCustomValidity('Имя не должно превышать 105-ти символов');
		} else if (onInputHashtags.validity.valueMissing) {
		onInputHashtags.setCustomValidity('Обязательное поле');
		} else if (onInputHashtags.validity.customError) {
		onInputHashtags.setCustomValidity(onInputHashtags.validationMessage);
		}	else {
		onInputHashtags.style.border = '2px solid white';
	  onInputHashtags.setCustomValidity('');
	  
		}
	});

	onInputHashtags.addEventListener('input', function (evt) {
	  var target = evt.target;
	  var itemsMassiv = createMassivFromInputHashtags();
	  var condition = createMirrorMassiveHashtags();
	  onInputHashtags.style.border = '2px solid red';
	  for (var i = 0; i < itemsMassiv.length; i++) {  	
	    if (itemsMassiv.length > 5) {
		    target.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
		  } else if (itemsMassiv[i].length < 2 || itemsMassiv[i].length > 20) {
		  	target.setCustomValidity('Xеш-тег не может состоять только из одной решётки, максимальная длина одного хэш-тега 20 символов, включая решётку');
		  } else if (condition === true) {
	      target.setCustomValidity('Oдин и тот же хэш-тег не может быть использован дважды');
	    }	else {
	    	target.style.border = '2px solid white';
		  	target.setCustomValidity('');
		  }
	  }
	});

	onInputTextDescription.addEventListener('invalid', function () {
		onInputTextDescription.style.border = '2px solid red';
		if (onInputTextDescription.validity.valueMissing) {
			onInputTextDescription.setCustomValidity('Обязательное поле');				
		}	else {
			onInputTextDescription.style.border = '2px solid white';
			onInputTextDescription.setCustomValidity('');
		}
	});

	var createMirrorMassiveHashtags = function () {
		var hashtagsList = createMassivFromInputHashtags();
		var mirrorMassiv = [];
		var condition = false;
		for (var i = 0; i < hashtagsList.length; i++) {
			if (mirrorMassiv.indexOf(hashtagsList[i]) === -1) {
				mirrorMassiv.push(hashtagsList[i]);
			} else {
				condition = true;
			}
		}
		return mirrorMassiv;
	};

	var createMassivFromInputHashtags = function () {
		var massivFromInputHashtags = onInputHashtags.value.split(' ');
		return massivFromInputHashtags;
	};

	var createMassivOnChange = function () {
		onInputHashtags.addEventListener('change', createMassivFromInputHashtags);
	};

	createMassivOnChange();

	window.form = {
		inputHashtags: onInputHashtags,
		inputTextDescription: onInputTextDescription,
		ESC_KEYCODE: ESC_KEYCODE,
		sendForm: function () {
			if (onInputHashtags.validationMessage !== true) {
				window.pictureEffects.imgUploadOverlay.classList.add('hidden');
				onInputHashtags.value = '';
				onInputTextDescription.textContent = '';
			} 
		}
	};	
})();
