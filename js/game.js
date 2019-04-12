var BoyFallSpeed = 10.2;
var Boy;
var BoyY = 0;
var jumpHeight = 130;

var Platform;

var jumpingUp = false;
var fallingDown = true;

var JumpStartPos = 0;

var JumpAcc = 1;
var CurrentJumpAcc = 0;

var Enemys;
var EnemyRotationSpeed = 20;

$(function () {
    Boy = $("#Boy");
    Enemys = $(".enemy");
    Platform = $("#Platform");
    // Boy.position().top;
    RegisterKeyEvents();
    SpawnEnemy();
    // var boyTopPercent = $(Boy).width()/$(Boy).parent().height()*100;
    // var something = ($(Boy).position().top/(Boy).parent().height()*100) + boyTopPercent; 
    var something = ($(Boy).width() / $(Boy).parent().height() * 100);
    something = 90 - something + 5;

    $(Boy).css("top", something + "%");
    function Loop() {
        FallDown();
        RisingUp();
        requestAnimationFrame(Loop);
        $("#JumpingUp").text(jumpingUp);
        $("#FallingDown").text(fallingDown);
        EnemyLoop();
    }
    Loop();
});

function FallDown() {
    if (jumpingUp)
        return

    var groundYPosPercent = ($(Boy).width() / $(Boy).parent().height() * 100);
    groundYPosPercent = 90 - groundYPosPercent + 5;
    var boyYPercent = $(Boy).position().top/$(Boy).parent().height()*100;
    console.log(boyYPercent, groundYPosPercent);
    var onGround = boyYPercent > groundYPosPercent;
    if (onGround) {
        fallingDown = false;
        jumpingUp = false;
        return;
    }

    fallingDown = true;
    CurrentJumpAcc += 0.03;
    BoyY += BoyFallSpeed * CurrentJumpAcc;
    Boy.css("transform", "translate3d(0," + BoyY + "%,0)");
}

function RisingUp() {
    if (fallingDown || !jumpingUp)
        return;

    jumpingUp = true;
    if (CurrentJumpAcc < 0) {
        jumpingUp = false;
        fallingDown = true;
        CurrentJumpAcc = 0;
        return;
    }
    CurrentJumpAcc -= 0.030;
    BoyY -= BoyFallSpeed * CurrentJumpAcc;
    Boy.css("transform", "translate3d(0," + BoyY + "%,0)");
}

function RegisterKeyEvents() {
    $(document).on("keydown", function (e) {
        //Spacebar
        if (e.keyCode == 32 || e.keyCode == 38 || e.keyCode == 87) {
            Jump();
            return false;
        }
    });
    $(document).on("click", function () {
        Jump();
    });
}

function Jump() {
    if (fallingDown || jumpingUp)
        return;

    jumpingUp = true;
    CurrentJumpAcc = JumpAcc;
    JumpStartPos = Boy.position().top;
}

function EnemyLoop() {
    Enemys.each(function () {
        rotate($(this));
        MoveEnemy($(this));
        DeleteIfOutside($(this));
    });
}

function MoveEnemy(element) {
    element.css("left", element.position().left + 1)
}

function DeleteIfOutside(element) {
    if (element.position().left + element.width() <= 0) {
        element.remove();
    }
}

function rotate(element) {
    var rotation = 0;
    if (element.data("rotation")) {
        rotation = element.data("rotation");
    }
    rotation -= EnemyRotationSpeed;
    element.data("rotation", rotation);
    element.css("transform", "rotate(" + rotation + "deg)");
}

function SpawnEnemy() {
    var enemyTemplate = $("<img class='enemy' src='resurser/img/hoved1Web.png'/>");
    $("#content").append(enemyTemplate);
    console.log(enemyTemplate);
    enemyTemplate.css("left", $("#content").width() - enemyTemplate.width());
    var topPercent = 90 - ($(".enemy").width() / $(".enemy").parent().height() * 100);
    enemyTemplate.css("top", topPercent + 5 + "%")
    Enemys = $(".enemy");
}