/*---------------------
    NAVIGATION TOGGLE
  ---------------------*/

/**
 * JavaScript and jQuery example:
 * http://codepen.io/msguerra74/pen/yaocw/
 **
 * JavaScript version based on:
 * http://toddmotto.com/creating-jquery-style-functions-in-javascript-hasclass-addclass-removeclass-toggleclass/
 **
 * IE7+
 */

function hasClass(elem, className) {
  return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
}

function toggleClass(elem, className) {
  var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, " ") + ' ';
  if (hasClass(elem, className)) {
    while (newClass.indexOf(" " + className + " ") >= 0) {
      newClass = newClass.replace(" " + className + " ", " ");
    }
    elem.className = newClass.replace(/^\s+|\s+$/g, '');
  } else {
    elem.className += ' ' + className;
  }
}

document.getElementById('nav-toggle').onclick = function() {
  var nav = document.getElementById('nav');
  toggleClass(this, 'active');
  toggleClass(nav, 'active');
};