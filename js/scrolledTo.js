function scrolledIntoView(elem){
    var docViewTop = $(window).scrollTop()-200;
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    return ((elemTop <= docViewBottom) && elemTop >= docViewTop);
}