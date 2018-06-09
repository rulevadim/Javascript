'use strict';

var quotesPattern = /^'|(\s)'|'(\s)|'$/g

window.onload = function() {
  var text = document.querySelector('#text');
  var button = document.querySelector('#quotesChange');
  button.addEventListener('click', function() {
    var str = text.value;
    text.value = str.replace(quotesPattern, '$1"$2');
  })
}