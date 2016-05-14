// $(".nav a").on("click", function(){
//    $(".nav").find(".active").removeClass("active");
//    $(this).parent().addClass("active");
// });

Template.navbar.events({
  "click .nav a" : function (e) {
    $(".nav").find(".active").removeClass("active");
    $(e.target).parent().addClass("active");
  }
})
