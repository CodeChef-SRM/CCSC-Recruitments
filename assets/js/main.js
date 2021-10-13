$(document).ready(function() {

  /**Navbar Shrink **/
  $(window).on("scroll", function(){
    if($(this).scrollTop() > 50){
      $(".navbar").addClass("navbar-shrink");
    }
    else{
      $(".navbar").removeClass("navbar-shrink");
    }
  });
  
/* Page Scrolling */
$(function(){
  $.scrollIt(-50);
});

/* Navbar */
$(".nav-link").on("click", function(){

  $(".navbar-collapse").collapse("hide");

});

});



