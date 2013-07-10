// Menu Toggle Class
var $nav = $("nav"),
  $menu = $(".menu");
$menu.on("click", function() {
  $menu.toggleClass("active");
  $nav.toggleClass("active");
});