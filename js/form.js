'use strict';

(function () {
	var ESC_KEYCODE = 27;

	var inputHashtags = document.querySelector('.text__hashtags');
	var inputTextDescription = document.querySelector('.text__description');

	inputHashtags.addEventListener('invalid', function (evt) {
		inputHashtags.style.border = '2px solid red';
	 	if (inputHashtags.validity.tooShort) {
		inputHashtags.setCustomValidity('Хэш-тег должен состоять минимум из 2-х символов');
		}	else if (inputHashtags.validity.patternMismatch) {
		inputHashtags.setCustomValidity('Хэш-тег начинается с символа # (решётка) и разделяються пробелами, xеш-тег не может состоять только из одной решётки');
		}	else if (inputHashtags.validity.tooLong) {
		inputHashtags.setCustomValidity('Имя не должно превышать 105-ти символов');
		} else if (inputHashtags.validity.valueMissing) {
		inputHashtags.setCustomValidity('Обязательное поле');
		} else if (inputHashtags.validity.customError) {
		inputHashtags.setCustomValidity(inputHashtags.validationMessage);
		}	else {
		inputHashtags.style.border = '2px solid white';
	  inputHashtags.setCustomValidity('');
		}
	});

	inputHashtags.addEventListener('input', function (evt) {
	  var target = evt.target;
	  var itemsMassiv = createMassivFromInputHashtags();
	  var condition = createMirrorMassiveHashtags();
	  inputHashtags.style.border = '2px solid red';
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

	inputTextDescription.addEventListener('invalid', function (evt) {
		inputTextDescription.style.border = '2px solid red';
		if (inputTextDescription.validity.valueMissing) {
			inputTextDescription.setCustomValidity('Обязательное поле');				
		}	else {
			inputTextDescription.style.border = '2px solid white';
			inputTextDescription.setCustomValidity('');
		}
	});

	var createMirrorMassiveHashtags = function () {
		var itemsMassiv = createMassivFromInputHashtags();
		var mirrorMassiv = [];
		var condition = false;
		for (var i = 0; i < itemsMassiv.length; i++) {
			if (mirrorMassiv.indexOf(itemsMassiv[i]) === -1) {
				mirrorMassiv.push(itemsMassiv[i]);
			} else {
				condition = true;
			}
		}
		return condition;
	};

	var createMassivFromInputHashtags = function () {
		var massivFromInputHashtags = inputHashtags.value.split(' ');
		return massivFromInputHashtags;
	};

	var createMassivOnChange = function () {
		inputHashtags.addEventListener('change', createMassivFromInputHashtags);
	};

	createMassivOnChange();

	window.form = {
		inputHashtags: inputHashtags,
		inputTextDescription: inputTextDescription,
		ESC_KEYCODE: ESC_KEYCODE 
	};	
})();
