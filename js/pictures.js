var COMMENTS_LIST = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 
'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 
'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var DESCRIPTIONS_LIST = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 
'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 
'Вот это тачка!'];

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
}

//  в переменную находим нужный темплэйт по идентификатору и в нем находим
// франмент по классу куда будем вставлять новые эллементы
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
	var finalFotos = createItemsObject(); //подтянули создание обьекта массива
	var fragment = document.createDocumentFragment(); //обернули для единоразовой отрисовки браузером
	for (var i = 0; i < finalFotos.length; i++) {
		fragment.appendChild(renderFotos(finalFotos[i]));//создали и вставили элемент в массив		
	}
	galleryContainer.appendChild(fragment);// вставили элемент в разметку
};
createFotosGallery();// вызвали функцию

var bigFotoContainer = document.querySelector('.big-picture');
bigFotoContainer.classList.remove('hidden');

var renderBigFoto = function (bigFoto) {
	var bigFototObject = bigFotoContainer;
	bigFototObject.querySelector('.big-picture__img').src = 'img/logo-background-3.jpg';
	bigFototObject.querySelector('.likes-count').textContent = bigFoto.likes;
	bigFototObject.querySelector('.comments-count').textContent = bigFoto.commentsNumber;
	bigFototObject.querySelector('.social__picture').src = bigFoto.bigFotoComments.commentAvatar;
	bigFototObject.querySelector('.social__text').textContent = bigFoto.bigFotoComments.commentText;
	bigFototObject.querySelector('.social__caption').textContent = bigFoto.description;
	return bigFototObject;
};

var createBigFoto = function() {
	var finalBigFotos = createItemsObject(); //вызвали создание элемента
	var essentialBigFoto = renderBigFoto(finalBigFotos[0]) //закинули данные 1-го элемета массива в создание большой фотки
	return essentialBigFoto;
};

createBigFoto();

var commentCountItem = document.querySelector('.social__comment-count');
commentCountItem.classList.add('visually-hidden');

var commentLoaderItem = document.querySelector('.comments-loade');
commentLoaderItem.classList.add('visually-hidden');