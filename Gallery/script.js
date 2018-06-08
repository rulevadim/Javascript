'use strict';

function createEl(tag, parent, text, link, src) {
  var element = document.createElement(tag);
  var parent = parent || document.body;
  switch (tag) {
    case 'li':
      if (link) {
        createEl('a', element, text, link);
      } else {
        createEl('p', element, text)
      }
      break;
    case 'a':
      element.textContent = text;
      element.href = link;
      break;
    case 'p':
      element.textContent = text;
    case 'img':
      element.src = src;
  }
  return parent.appendChild(element);
}

function gallery(callback) {
  var response;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'gallery.json');
  xhr.send();

  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        response = JSON.parse(xhr.responseText);
        callback(response);
      }
    }
  }
}

window.onload = function() {
  gallery(function(response) {
    var ul = createEl('ul');
    response.forEach(function(img) {
      var li = createEl('li', ul);
      var a = createEl('a', li, null, img.imgBig);
      var img = createEl('img', a, null, null, img.imgSmall);
    })
  });
}