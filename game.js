
var buttonColor = ["red","blue","green","yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function(){
    if(!started){

        setTimeout(function(){
            $("#level-title").text("Level " + level);
        },100000);
        
        nextSequence();
        started = true;
    }
    
});


$(".btn").click(function(){

    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length === gamePattern.length){

            setTimeout(function(){
                nextSequence();
            },100);
        }
    }
    else{
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function startOver(){

    level = 0;
    gamePattern = [];
    started = false;
}

function nextSequence(){

    userClickedPattern = [];

    level++;
    setTimeout(function(){
        $("#level-title").text("Level " + level);
    },150);
   

    var randomNumber = Math.floor(Math.random() * 4);

    var chooseRandomColor = buttonColor[randomNumber];

    gamePattern.push(chooseRandomColor);

    $("#" + chooseRandomColor).fadeIn(150).fadeOut(150).fadeIn(150);

    playSound(chooseRandomColor);
}

function playSound(name){

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){

    $("#"+ currentColour).addClass("pressed");

    setTimeout(function(){
        $("#"+ currentColour).removeClass("pressed");
    },150);
}