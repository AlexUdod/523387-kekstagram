'use strict';

(function () {
		var COMMENTS_LIST = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
	'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 
	'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 
	'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

	var DESCRIPTIONS_LIST = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 
	'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 
	'Вот это тачка!'];

	var ESC_KEYCODE = 27;
	var NUMBER_ITEMS = 25;
	var MIN_LIKES_NUMBER = 15;
	var MAX_LIKES_NUMBER = 200;
	var MIN_COMMENTS_NUMBER = 1;
	var MAX_COMMENTS_NUMBER = 2;
	var MIN_COMMENTS_AVATARS_NUMBER = 1;
	var MAX_COMMENTS_AVATARS_NUMBER = 6;

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
		};
		return itemsObjectsList;
	};

	window.data = {
		createItemsObject: createItemsObject(),
		ESC_KEYCODE: ESC_KEYCODE
	};
})();
