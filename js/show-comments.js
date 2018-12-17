'use strict';
(function () {
  window.openComments = function (data) {
    var NUMBER = 5;

    var items = document.querySelectorAll('.social__comment');
    var commentCountItem = document.querySelector('.social__comment-count');
    var commentLoaderItem = document.querySelector('.comments-loader');

    var massivLength = data.comments.length;
    var changeableNumber = NUMBER;

    for (var i = 0; i < items.length; i++) {
      items[i].style.display = "none";
    }

    var addComments = function () {
      if (massivLength <= changeableNumber) {
        changeableNumber = massivLength;
      }
      for (var i = 0; i < changeableNumber; i++) {
        commentLoaderItem.classList.remove('hidden');
        commentCountItem.textContent = new String(changeableNumber + ' из ' + massivLength);
        items[i].style.display = "flex";
        if (massivLength <= changeableNumber) {
          commentLoaderItem.classList.add('hidden');
        }          
      }
      changeableNumber += changeableNumber;
      if (massivLength < changeableNumber) {
        changeableNumber = massivLength;
      }
    };    
    addComments();

    commentLoaderItem.addEventListener('click', addComments);

  };
})();
