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

$(function(){
    Boy = $("#Boy");
    Platform = $("#Platform");
    RegisterKeyEvents();
    function Loop(){
        FallDown();
        RisingUp();
        requestAnimationFrame(Loop);
        $("#JumpingUp").text(jumpingUp);
        $("#FallingDown").text(fallingDown);
    }
    Loop();
});

function FallDown(){
    if(jumpingUp)
        return
    
    var onGround = checkCollisions(Boy, Platform);
    if(onGround)
    {
        fallingDown = false;
        jumpingUp = false;
        return;
    }

    fallingDown = true;
    CurrentJumpAcc += 0.03;
    BoyY += BoyFallSpeed * CurrentJumpAcc;
    Boy.css("transform", "translate3d(0,"+BoyY+"%,0)");
}

function RisingUp(){
    if(fallingDown || !jumpingUp)
        return;
    // if(Boy.position().top < JumpStartPos-jumpHeight)
    // {
    //     jumpingUp = false;
    //     fallingDown = true;
    //     return;
    // }
    jumpingUp = true;
    if(CurrentJumpAcc < 0){
        jumpingUp = false;
        fallingDown = true;
        CurrentJumpAcc = 0;
        return;
    }
    CurrentJumpAcc -= 0.030;
    BoyY -= BoyFallSpeed * CurrentJumpAcc;
    Boy.css("transform", "translate3d(0,"+BoyY+"%,0)");
}

function RegisterKeyEvents(){
    $(document).on("keydown", function(e){
        //Spacebar
        if(e.keyCode == 32){
            Jump();
        }
    });
    $(document).on("click", function(){
        Jump();
    });
}

function Jump(){
    if(fallingDown || jumpingUp)
        return;

    jumpingUp = true;
    CurrentJumpAcc = JumpAcc;
    JumpStartPos = Boy.position().top;
}