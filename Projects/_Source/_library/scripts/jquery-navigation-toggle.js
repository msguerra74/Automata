/*---------------------
    NAVIGATION TOGGLE
  ---------------------*/

/**
 * JavaScript and jQuery example:
 * http://codepen.io/msguerra74/pen/yaocw/
 **
 * IE6+
 */

$("#nav-toggle").on("click", function() {
  var $nav = $("#nav");
  $(this).toggleClass("active");
  $nav.toggleClass("active");
});