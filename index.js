var randomNumber;
let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
var start =0;
var level = 0;
function nextSequence() {
  userClickedPattern = [];
  randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $(`.${randomChosenColour}`).fadeOut(200).fadeIn(200);
  playSound(randomChosenColour);
  if(start>0){
    level++;
    $("h1").text("level "+level);
  }
}
function checkAnswer(currentLevel){
  //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      startOver();
    }

}
function startOver(){
  level = 0;
  gamePattern=[];
  start =0;
  $("h1").text("Press A Key to Restart");
}
$(document).keypress(function(event){
  if (event.key == "a" && start == 0) {
    nextSequence();
    start++;
    $("h1").text("level "+level);
  }
});
for (let i=0;i<buttonColours.length;i++){
$("."+buttonColours[i]).click(function(e){
  var cc = e.currentTarget.id;
  userClickedPattern.push(cc);
  playSound(cc);
  animatePress(cc);
  checkAnswer(userClickedPattern.length-1);
});
}
function playSound(name){
  let audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}
function animatePress(currentColor){
  $("."+currentColor).addClass("pressed");
  setTimeout(function(){
    $("."+currentColor).removeClass("pressed");
  },100);
}
