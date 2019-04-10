$(function(){
    var burger = $("svg.burger");
    var ul = $("ul");

    burger.on("click", function(){
        ul.toggleClass("showNavbar");
    })
    $(window).on("resize", function(){
        ul.removeClass("showNavbar");
    })
    $(window).on("scroll", function(){
        ul.removeClass("showNavbar");
    })
});