/*---------------------
    NAVIGATION TOGGLE
  ---------------------*/

/**
 * JavaScript and jQuery example:
 * http://codepen.io/msguerra74/pen/yaocw/
 */

document.querySelector('nav .menu').onclick = function() {
  var navToggle = document.querySelector('nav .menu');
  var navMenu = document.querySelector('nav ul');
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
};