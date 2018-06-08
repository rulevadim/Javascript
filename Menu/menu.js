'use strict';

/**
 * Класс Menu.
 * Создание объекта класса автоматически
 * создает меню.
 * 
 * @param {[[string, string, string]]} menuItems Массив определяющий меню.
 * @param {string} parent    Родительский элемент для меню. Если нет то body.
 * @param {string} menu      Содержит само меню, как элемент DOM.
 */
function Menu(menuItems, parent) {
  this.parent = parent || document.body;
  this.menu = null;
  this.render(menuItems, this.parent);
}

/**
 * Создает меню в дереве DOM.
 * Внутри используется функция menuBuilder,
 * для создания меню. Рекурсия используется
 * для создания вложенности.
 * 
 * @param  {[[string, string, string]]} menuItems Пункты меню
 * @param  {string} parent  Родительский элемент меню
 */
Menu.prototype.render = function(menuItems, parent) {
  var i = 0;
  var li;
  var self = this;
  (function menuBuilder(parent, itemLevel) {
    var itemLevel = itemLevel || 0;
    var menu = self.createEl('ul', parent);
    while (menuItems[i]) {
      if (i && menuItems[i][0].length < menuItems[i-1][0].length) break;
      // Рекурсия
      if (menuItems[i][1].split('-')[itemLevel + 1]) {
        menuBuilder(li, itemLevel + 1);
      }
      li = self.createEl('li', menu, menuItems[i][1], menuItems[i][2]);
      i++;
    }
    self.menu = menu;
  })(parent);
}

/**
 * Создает елемент заданный в переменной tag.
 * Если это li, то в зависимости от того
 * задана ссылка или нет создает внутри
 * либо элемент a, либо p.
 * 
 * @param  {string} tag    Тэг элемента.
 * @param  {string} parent Родитель, внутри которого создасться элемент.
 * @param  {string} title  Текс элемента. Для ссылок и параграфов.
 * @param  {string} link   Ссылка.
 * @return {HTML Element}  Елемент в дереве DOM
 */
Menu.prototype.createEl = function(tag, parent, title, link) {
  var element = document.createElement(tag);
  switch (tag) {
    case 'li':
      if (link) {
        this.createEl('a', element, title, link);
      } else {
        this.createEl('p', element, title)
      }
      break;
    case 'a':
      element.textContent = title;
      element.href = link;
      break;
    case 'p':
      element.textContent = title;
  }
  return parent.appendChild(element);
}

Menu.prototype.remove = function() {
  this.menu.remove();
}

window.onload = function() {
  /**
   * Формат записи меню:
   * [
   *   'Номер пункта с учетом вложенности',
   *   'Название заголовка пункта меню',
   *   'Ссылка, если есть'
   * ]
   * Массив из таких массивов определяет меню.
   * Вложенность любая, ссылка опциональна.
   * 
   * @type {[[string, string, string]]}
   */
  var menuItems = [
    ['1', 'Заголовок 1', '#'],
    ['1-1', 'Заголовок 1-1', '#'],
    ['1-2', 'Заголовок 1-2', '#'],
    ['2', 'Заголовок 2', '#'],
    ['2-1', 'Заголовок 2-1'],
    ['2-1-1', 'Заголовок 2-1-1', '#'],
    ['2-1-1-1', 'Заголовок 2-1-1-1', '#'],
    ['2-1-1-2', 'Заголовок 2-1-1-2', '#'],
    ['2-1-1-3', 'Заголовок 2-1-1-3', '#'],
    ['2-1-2', 'Заголовок 2-1-2', '#'],
    ['2-2', 'Заголовок 2-2', '#'],
    ['3', 'Заголовок 3', '#'],
    ['4', 'Заголовок 4', '#']
  ]
  var menu = document.querySelector('#menu');
  var testMenu = new Menu(menuItems, menu);
  //setTimeout(function() {testMenu.remove()}, 2000);

}
