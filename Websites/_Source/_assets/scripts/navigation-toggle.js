/*---------------------
    NAVIGATION TOGGLE
  ---------------------*/

/**
 * JavaScript and jQuery example:
 * http://codepen.io/msguerra74/pen/yaocw/
 **
 * IE10+
 */

document.querySelector('#nav-toggle').onclick = function() {
  var nav = document.querySelector('#nav');
  this.classList.toggle('active');
  nav.classList.toggle('active');
};