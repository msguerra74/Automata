/*-----------------
    SMOOTH SCROLL
  -----------------*/

/**
 * JavaScript and jQuery example:
 * http://codepen.io/msguerra74/pen/fxjiK
 **
 * jQuery version based on:
 * http://www.paulund.co.uk/smooth-scroll-to-internal-links-with-jquery/
 **
 * IE6+
 */

$("a[href^='#']").on("click", function(e) {
  e.preventDefault();
  var target = this.hash,
    $target = $(target);
  $("html, body").stop().animate({
    "scrollTop": $target.offset().top
  }, 800);
});