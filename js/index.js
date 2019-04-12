$(function () {
    var frontHr = $(".hrTop, .hrBot");
    var oldSpans = $("span");
    var h1 = $("h1");
    frontHr.addClass("moveHr");

    $(window).on("scroll", function(){
        if(scrolledIntoView($("#om-AROS div p"))){
            $("#om-AROS div p").css("transform", "translateX(0)");
            $("#om-AROS div p").css("opacity", "1");
        }
        if(scrolledIntoView($("#om-AROS div figure"))){
            $("#om-AROS div figure").css("transform", "translateX(0)");
            $("#om-AROS div figure").css("opacity", "1");
        }
    });

    for (var i = 0; i < oldSpans.length; i++) {
        var word = oldSpans.eq(i).text();
        var spanWidth = oldSpans.eq(i).width() / oldSpans.eq(i).parent().width() * 100;
        var wordSpan = $("<span>");
        for (var y = 0; y < word.length; y++) {
            wordSpan.append("<span class='jump'>" + word[y] + "</span>");
        }
        wordSpan.appendTo(h1);
        var newHr = $("<hr>");
        $("#header-wrapper").append(newHr);
        newHr.css("width", spanWidth + "%");
        newHr.addClass("moveHr");
        h1.append("<br>");
        $("h1>span").addClass("moveH1");
        var selectedWordSpan = $(".moveH1").eq(i);
        newHr.css("top", selectedWordSpan.position().top + selectedWordSpan.height() - 5);
        newHr.css("left", selectedWordSpan.position().left + 1200);

        newHr.data("word", i);
    }

    oldSpans.remove();
    $(".moveH1").on('transitionend webkitTransitionEnd oTransitionEnd', function (event) {
        var letters = $(this).find("span");
        if (event.target === $(this)[0]) {
            console.log("first");
            letters.css("transition", "0s");
            $(".moveHr").css("transition", "0s");
            $(".moveH1").css("transition", "0s");
            letters.on({
                mouseenter: function () {
                    $(this).off("transitionend webkitTransitionEnd oTransitionEnd");
                    $(this).css("transition", ".5s");
                    $(this).css("transform", "translateY(-20px)");
                },
                mouseleave: function () {
                    $(this).css("transform", "translateY(0px)");
                    $(this).on('transitionend webkitTransitionEnd oTransitionEnd', function () {
                        $(this).css("transition", "");
                    });
                }
            });
        }
    });

    $(window).on("resize", function () {
        console.log("resize");
        $("hr.moveHr").each(function () {
            var index = $(this).data("word");
            var word = $(".moveH1").eq(index);
            $(this).css("top", word.position().top + word.height() - 5);
            $(this).css("left", word.position().left);
        });
    });

    // Slider
    var leftArrow = $(".left-arrow");
    var rightArrow = $(".right-arrow");
    var anmeldelser = $(".anmeld");

    anmeldelser.each(function (index) {
        if (index == 0) {

        } else {
            $(this).css("display", "none");
        }
    })

    leftArrow.on("click", function () {
        var current = $(".current");
        var index = anmeldelser.index($(".current"));
        var next = anmeldelser.eq(index - 1);
        if (index == 0) {
            next = anmeldelser.last();
        }
        next.css("left", "-200%");
        next.css("display", "block");
        current.css("display", "block");
        current.animate({
            left: "200%"
        }, 200);
        next.animate({
            left: "0%"
        }, 200);
        next.addClass("current");
        current.removeClass("current");
    });
    rightArrow.on("click", function () {
        var current = $(".current");
        var index = anmeldelser.index($(".current"));
        var next = anmeldelser.eq(index + 1);
        if (index == anmeldelser.length-1) {
            next = anmeldelser.first();
        }
        next.css("left", "200%");
        next.css("display", "block");
        current.css("display", "block");
        current.animate({
            left: "-200%"
        }, 200);
        next.animate({
            left: "0%"
        }, 200);
        next.addClass("current");
        current.removeClass("current");



    });
})