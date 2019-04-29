$(function(){
    var skins = ["resurser/img/Spil/BoySmall.png", "resurser/img/Spil/VadeDrengen.png"];
    var Player = $("#Player");
    var imgSellect = $(".imgSellect");
    
    Player.attr("src", skins[0]);
    imgSellect.attr("src", skins[1]);

    imgSellect.on("click",function(){
        var skinSrc = $(this).attr("src");
        var PlayerSrc = Player.attr("src");
        Player.attr("src", skinSrc);
        $(this).attr("src", PlayerSrc);
        
    });
});