
(function ( $ ) {
 

    $.fn.hexed = function( options ) {
        
        var currentRound = 1;
        var totalScore = 0;

        var red;
        var green;
        var blue;
        
        var starttime;
        var endtime;
        var gameStarted = false;

        var startButton = this.find('#startButton');
        var gotitButton = this.find('#gotitButton');
        var totalScoreLabel = this.find('#score h3:nth-child(1)');
        var currentScoreLabel = this.find('#score h3:nth-child(2)');
        
        var highScoreForm = this.find('#highScoreForm');
        var submitButton = this.find('#submitButton');
        var userNameInput = this.find('#playerName');
 
        var settings = $.extend({
            // These are the defaults.
            difficulty: 5,
            turns: 10
        }, options );
 
        var createNewColor = function() {
            red = "00".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
            blue = "00".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
            green = "00".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
    
            var color =  '#' + red + green + blue;
    
            var targetColor = document.getElementById("targetColorImage");
            var targetFiller = targetColor.getContext("2d");
            targetFiller.fillStyle = color;
            targetFiller.fillRect(0,0,100,100);
        };
        
        
        var myUpdate = function(){

            var rgbToHex = function (rgb) { 
                var hex = Number(rgb).toString(16);
                if (hex.length < 2) {
                    hex = "0" + hex;
                }
            return hex;
            };
        
            var fullColorHex = function(r,g,b) {   
                var red = rgbToHex(r);
                var green = rgbToHex(g);
                var blue = rgbToHex(b);
                return red+green+blue;
            };
        
            var userColor = "#" + fullColorHex(redInput,greenInput,blueInput);
            var myColor = document.getElementById("myColorImage");
            var myFiller = myColor.getContext("2d");
            myFiller.fillStyle = userColor;
            myFiller.fillRect(0,0,100,100);
        };

        var redSlider = document.getElementById("redSlider");
        var redOutput = document.getElementById("redValue");
        redOutput.innerHTML = redSlider.value;
        
        var greenSlider = document.getElementById("greenSlider");
        var greenOutput = document.getElementById("greenValue");
        greenOutput.innerHTML = greenSlider.value;
        
        var blueSlider = document.getElementById("blueSlider");
        var blueOutput = document.getElementById("blueValue");
        blueOutput.innerHTML = blueSlider.value;
        
        
        var redInput = redOutput.innerHTML;
        var greenInput = greenOutput.innerHTML;
        var blueInput = blueOutput.innerHTML;
        
        myUpdate();
        
        redSlider.oninput = function() {
            redOutput.innerHTML = this.value;
            redInput = this.value;
            greenInput = greenSlider.value;
            blueInput = blueSlider.value;
            myUpdate();
        };
        
        greenSlider.oninput = function() {
            greenOutput.innerHTML = this.value;
            redInput = redSlider.value;
            greenInput = this.value;
            blueInput = blueSlider.value;
            myUpdate();
        };

        blueSlider.oninput = function() {
            blueOutput.innerHTML = this.value;
            redInput = redSlider.value;
            greenInput = greenSlider.value;
            blueInput = this.value;
            myUpdate();
        };
        // this.html("difficulty: " + settings.difficulty + " random color: " + color);
        
        var calcScore = function () {
            var percentOffRed = Math.abs(parseInt(red,16)-redSlider.value)/255*100;
            var percentOffGreen = Math.abs(parseInt(green,16)-greenSlider.value)/255*100;
            var percentOffBlue = Math.abs(parseInt(blue,16)-blueSlider.value)/255*100;
            var percentOff = (percentOffRed+percentOffGreen+percentOffBlue)/3;
            var timeTaken = endtime-starttime;
            var rawScore = ((15-settings.difficulty-percentOff)/(15-settings.difficulty)) * (15000-timeTaken);
            // alert(15-settings.difficulty-percentOff);
            if (rawScore < 0 || 15-settings.difficulty-percentOff < 0 || 15000-timeTaken < 0) {
                rawScore = 0;
            }
            rawScore = Math.round(rawScore*100)/100;
            var alertString = "percent off: " + percentOff + "\n";
            alertString += "milliseconds taken: " + timeTaken + "\n";
            alertString += "score: " + rawScore;
            alert(alertString);
            return rawScore;
        };
        

        startButton.click(function() {
            if ( !gameStarted ) {
                starttime = new Date().getTime();
                settings.turns = document.getElementById('turnInput').value;
                if (settings.turns === "" || isNaN(settings.turns)) {
                    settings.turns = 5;
                }
                settings.turns = Math.floor(settings.turns);
                createNewColor();
                gameStarted = true;
                // TODO: Get selected difficulty
            } else {
                alert('Game already started!');
            }
        });
        
        // implement gotIt! Button

        gotitButton.click(function () {
           // if the timer isn't start, make an alert
            if ( !gameStarted ) {
                window.alert("Please start the game first");
            } else {
                // TODO: stop timer
                endtime = new Date().getTime();
                var thisScore = calcScore();
                currentScoreLabel.text("Score on Last Color: "+thisScore);
                totalScore += thisScore;
                totalScoreLabel.text("Your Score: "+totalScore);
                if (currentRound === settings.turns) {
                    gameStarted = false;
                    alert("Game over!\nYour total score: "+ totalScore);
                    currentRound = 1;
                    highScoreForm.show();
                    userNameInput.focus();
                } else {
                    starttime = new Date().getTime();
                    currentRound += 1;
                    createNewColor();
                }
            }
        });
        
        // function for clicking form button
        submitButton.click(function () {
            var array = [];
            var userName = userNameInput.val();
            var retrievedHighscore;
            array.push({
                playerName: userName,
                difficulty: settings.difficulty,
                turns: settings.turns,
                score: totalScore,
                timestamp: $.now()
            });
            if (localStorage.getItem('highScore') === null) {
                retrievedHighscore = {highScores:array};
            } else {
                retrievedHighscore = JSON.parse(localStorage.getItem('highScore'));
                var arrayString = JSON.stringify(array);
                retrievedHighscore.highScores.push(JSON.parse(arrayString.substring(1,arrayString.length-1)));
            }
            localStorage.setItem('highScore', JSON.stringify(retrievedHighscore));
            highScoreForm.hide();
            totalScore = 0; // reset total score
        });
        
        
        return this;
 
    };
 
}( jQuery ));


$(document).ready(function() {

 	$("#hexGame").hexed();

});

// Below is javascript for the drop down menu

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
