function scrolledIntoView(elem){
    var docViewTop = $(window).scrollTop()-200;
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    return ((elemTop <= docViewBottom) && elemTop >= docViewTop);
}
function Fadein (){
    $(".left-fadein, .right-fadein").each(function(){
        if(scrolledIntoView($(this))){
            $(this).css("transform", "translateX(0)");
            $(this).css("opacity", "1");
        }
    });
}

$(function(){
    Fadein ();
});
$(window).on("scroll", function(){
    Fadein ();
});