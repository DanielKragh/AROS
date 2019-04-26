var BoyFallSpeed = 0.9;
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
var EnemyRotationSpeed = 1.2;
var CurrentEnemySpawnTimerInMs;
var StartEnemySpawnTimerInMs = 2500;
var EnemySpawnTimerDecreaseAmountInMs = 50;
var MaxSpawnTimer = 500;

var CurrentHighscore = 0;
var IncrementHighscoreEveryMs = 100;

var gameOver = false;

var highscore;
var fps;

$(function () {
    Boy = $("#Boy");
    Platform = $("#Platform");
    highscore = $("#highscore");
    fps = $("#fps");
    StartGame();
    Loop();
});

function SetBoyPos(){
    var something = ($(Boy).width() / $(Boy).parent().height() * 100);
    something = 90 - something + 5;
    $(Boy).css("top", something + "%");  
}

var deltaTime = 0;
var lastUpdate = Date.now();

function Loop() {
    requestAnimationFrame(Loop);
    var now = Date.now();
    deltaTime = now - lastUpdate;
    lastUpdate = now;
    if(gameOver)
        return;
    FallDown();
    RisingUp();
    // $("#JumpingUp").text(jumpingUp);
    // $("#FallingDown").text(fallingDown);
    EnemyLoop();
    SpawnEnemies();
    Collision();
    IncrementHighscore();
    FpsCounter();
}

var framesInSecound = 0;
var fpsTimer = Date.now();
function FpsCounter(){
    framesInSecound++;
    if((Date.now() - fpsTimer) >= 1000){
        fps.text(framesInSecound);
        fpsTimer = Date.now();
        framesInSecound = 0;
    }
}

var highscoreTimer = Date.now();
function IncrementHighscore(){
    if((Date.now() - highscoreTimer) >= IncrementHighscoreEveryMs){
        CurrentHighscore++;
        highscoreTimer = Date.now();
    }
    highscore.text(CurrentHighscore);
}

function StartGame(){    
    gameOver = false;
    CurrentHighscore = 0;
    $(document).off(); //To fix jump when pressing restart
    CurrentEnemySpawnTimerInMs = StartEnemySpawnTimerInMs;
    SetBoyPos();
    $(".enemy").remove();
    Enemys = $(".enemy");
    $("#try-again").hide();
    setTimeout(function(){
        RegisterKeyEvents();
    }, 200);
}

function Collision() {
    Enemys.each(function () {
        var collision = checkCollisions(Boy, $(this));
        if (collision) {
            gameOver = true;
            $("#try-again").show();
        }
    });
}

var lastSpawned = Date.now();
var timerTest = Date.now();
function SpawnEnemies() {
    if (Date.now() - lastSpawned >= (CurrentEnemySpawnTimerInMs - EnemySpawnTimerDecreaseAmountInMs)) {
        console.log(CurrentEnemySpawnTimerInMs)
        SpawnEnemy();
        lastSpawned = Date.now();
    }
    if ((Date.now() - timerTest) >= 5000) {
        if (CurrentEnemySpawnTimerInMs <= MaxSpawnTimer) {
            CurrentEnemySpawnTimerInMs = MaxSpawnTimer;
        }
        else {
            CurrentEnemySpawnTimerInMs -= EnemySpawnTimerDecreaseAmountInMs;
        }
        timerTest = Date.now();
    }
}

function FallDown() {
    if (jumpingUp)
        return

    var groundYPosPercent = ($(Boy).width() / $(Boy).parent().height() * 100);
    groundYPosPercent = 90 - groundYPosPercent + 5;
    var boyYPercent = $(Boy).position().top / $(Boy).parent().height() * 100;
    var onGround = boyYPercent > groundYPosPercent;
    if (onGround) {
        fallingDown = false;
        jumpingUp = false;
        return;
    }

    fallingDown = true;
    CurrentJumpAcc += 0.0025*deltaTime;
    BoyY += BoyFallSpeed * CurrentJumpAcc * deltaTime;
    // Boy.css("transform", "translate3d(0," + BoyY + "%,0)");
    Boy[0].style.transform = "translate3d(0," + BoyY + "%,0)";
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
    CurrentJumpAcc -= 0.0025*deltaTime;
    BoyY -= BoyFallSpeed * CurrentJumpAcc * deltaTime;
    Boy[0].style.transform = "translate3d(0," + BoyY + "%,0)";
    // Boy.css("transform", "translate3d(0," + BoyY + "%,0)");
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
    $("#try-again").on("click", function(){
        StartGame();
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
    // console.log(element[0].offsetLeft/$("#content").width()*100);
    var percent = element[0].offsetLeft/$("#content").width()*100;
    element[0].style.left = percent - 0.07*deltaTime + "%";
}

function DeleteIfOutside(element) {
    if (element.position().left + element.width() <= 0) {
        element.remove();
        Enemys = $(".enemy");
    }
}

function rotate(element) {
    var rotation = 0;
    if (element.data("rotation")) {
        rotation = element.data("rotation");
    }
    rotation -= EnemyRotationSpeed*deltaTime;
    element.data("rotation", rotation);
    element[0].style.transform = "rotate(" + rotation + "deg)";
}

function SpawnEnemy() {
    var enemyTemplate = $("<img class='enemy' src='resurser/img/Spil/hoved1Small.png'/>");
    $("#content").append(enemyTemplate);
    console.log(enemyTemplate);
    enemyTemplate.css("left", $("#content").width() - enemyTemplate.width());
    var topPercent = 90 - ($(".enemy").width() / $(".enemy").parent().height() * 100);
    enemyTemplate.css("top", topPercent + 5 + "%")
    Enemys = $(".enemy");
}