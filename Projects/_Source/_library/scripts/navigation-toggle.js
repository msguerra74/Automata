//---------------------
//  NAVIGATION TOGGLE
//---------------------

// Example:
// http://codepen.io/msguerra74/pen/yaocw/

// jQuery Version

var $navToggle = $(".menu"),
  $navMenu = $("nav ul");
$(".menu").on("click", function() {
  $navToggle.toggleClass("active");
  $navMenu.toggleClass("active");
});

/*// JavaScript Version

document.querySelector('nav .menu').onclick = function() {
  var navToggle = document.querySelector('nav .menu');
  var navMenu = document.querySelector('nav ul');
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
};*/