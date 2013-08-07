/*---------------------
    NAVIGATION TOGGLE
  ---------------------*/

/**
 * JavaScript and jQuery example:
 * http://codepen.io/msguerra74/pen/yaocw/
 */

var $navToggle = $("nav .menu"),
  $navMenu = $("nav ul");
$("nav .menu").on("click", function() {
  $navToggle.toggleClass("active");
  $navMenu.toggleClass("active");
});