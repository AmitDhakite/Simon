var buttonColors = ["r", "b", "g", "y"];
var gamePattern = [];
var userClickedPattern = [];
var level=0;
var started=false;
//Random Number Generator
function nextSequence() {
  userClickedPattern=[];
  level++;
  var randomNumber = Math.floor((Math.random() * 4));
  var randomChoosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChoosenColor);
  $("."+randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  makeSound(randomChoosenColor);
  $("h1").text("Level: "+level);
}

//Make sound
var col;

function makeSound(col) {
      var aud = new Audio("sounds/"+col+".mp3");
      aud.play();
}

function lse() {
  var aud = new Audio("sounds/wrong.mp3");
  aud.play();
}
//press function
function prss(col) {
  $("." + col).addClass("pressed");
  setTimeout(function() {
    $("." + col).removeClass("pressed");
  }, 100);
}
function wrongPress(col){
  var aud = new Audio("sounds/wrong.mp3");
  aud.play();
  $("." + col).addClass("game-over");
  setTimeout(function() {
    $("." + col).removeClass("game-over");
  }, 100);
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 200);
}

$(document).keypress(function(){
  if(!started){
    started = true;
    $("h1").text("Level "+level);
    nextSequence();
  }
});
$("h1").click(function(){
  if(!started){
    started = true;
    $("h1").text("Level "+level);
    nextSequence();
  }
});


$(".btn").click(function(){
  console.log("btn: "+this.id);
  userClickedPattern.push(this.id);
  makeSound(this.id);
  prss(this.id);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(d){
  if(userClickedPattern[d]===gamePattern[d]){
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else{
    wrongPress(userClickedPattern[d]);
    started=false;
    gamePattern=[];
    $("h1").text("Game Over at level:"+level+", Press any key to Restart");
    level=0;
  }
}
