// Light Box
$(function(){

    // light box tilpasser sig skærmen
var scrollDis;
$('body').scroll(function() {
  scrollDis = $('body').scrollTop();  
});


// lav elementet
var $zoomBil = $('<div id="zoomBil"></div>');
var $divRe = $('<div style="position:relative"></div>')
var $wrap = $('<div id="wrap"></div>');
var $image = $('<img class="image" >');
var $video = $('<video class="video" autoplay="autoplay" loop="loop" muted="muted"></video>');
var $text = $('<p id="billedText"></p>');
var $close = $('<figure class="close">&times;</figure>')

// 
$zoomBil.append($divRe);
$divRe.append($wrap);
$wrap.append($image);
$wrap.append($video);
$wrap.append($text);
$wrap.append($close);
$('body').append($zoomBil);


// click event
$('.img-galleri').on('click', 'a', function(evnet){
  event.preventDefault();
  console.log(this)
  

  if($(this).children().eq(1).is("img")){
    var imageSrc = $(this).attr('href');
    $image.attr('src', imageSrc);
    $video.hide();
    $image.show();
  } else{
    var videoSrc = $(this).attr('href');
    $video.attr('src', videoSrc);
    $image.hide();
    $video.show();

  }
  
  $zoomBil.show();
  
})
// click event for close.
$close.click(function(){
  $zoomBil.hide();
});
$wrap.click(function(){
  $zoomBil.hide();
})
});