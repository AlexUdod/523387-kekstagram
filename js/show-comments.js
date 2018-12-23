'use strict';
(function () {
  window.openComments = function (data) {
    var COMMENTS__STEP = 5;

    var items = document.querySelectorAll('.social__comment');
    var commentCountItem = document.querySelector('.social__comment-count');
    var onCommentLoaderItem = document.querySelector('.comments-loader');

    var massivLength = data.comments.length;
    var changeableNumber = COMMENTS__STEP;

    for (var i = 0; i < items.length; i++) {
      items[i].style.display = 'none';
    }

    var addComments = function () {
      if (massivLength <= changeableNumber) {
        changeableNumber = massivLength;
      }
      for (var j = 0; j < changeableNumber; j++) {
        onCommentLoaderItem.classList.remove('hidden');
        commentCountItem.textContent = new String(changeableNumber + ' из ' + massivLength);
        items[j].style.display = 'flex';
        if (massivLength <= changeableNumber) {
          onCommentLoaderItem.classList.add('hidden');
        }          
      }
      changeableNumber += changeableNumber;
      if (massivLength < changeableNumber) {
        changeableNumber = massivLength;
      }
    };    
    addComments();

    onCommentLoaderItem.addEventListener('click', addComments);

  };

})();
