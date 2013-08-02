// Menu Toggle Class
var $menu = $(".menu"),
  $active = $("nav ul");
$(".menu").on("click", function() {
  $active.toggleClass("active");
  $menu.toggleClass("active");
});