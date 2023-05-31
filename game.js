var userClickedPattern = [];
var gamePattern = [];

var level =0;
var started = false;

var buttonColours = ["red","blue","green","yellow"];

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function nextSequence() {

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    playSound(randomChosenColour);
    
};

function playSound(name){
    $("#"+name).fadeOut(150).fadeIn(150);
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

$(".btn").on("click", function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    checkAnswer(userClickedPattern.length-1);
});

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function (){
        $("#" + currentColour).removeClass("pressed");
    },100);
};

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        console.log("succcess"); 
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    } else {
        console.log("fail");
        $("#level-title").text("Level " + level + " Game Over, Press any key to Restart");
        var audio1 = new Audio("./sounds/wrong.mp3");
        audio1.play();
        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
        },200);  
        gamePattern = [];
        level = 0;
        started = false;
    };
};

