/*---------------------
    NAVIGATION TOGGLE
  ---------------------*/
/**
 * Example:
 * http://codepen.io/msguerra74/pen/yaocw/
 */

var $navToggle = $(".menu"),
  $navMenu = $("nav ul");
$(".menu").on("click", function() {
  $navToggle.toggleClass("active");
  $navMenu.toggleClass("active");
});