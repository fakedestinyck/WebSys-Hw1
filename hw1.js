
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

        var targetColor = document.getElementById("targetColorImage");
        var targetFiller = targetColor.getContext("2d");

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
            green = "00".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
            blue = "00".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
    
            var color =  '#' + red + green + blue;
    
            
            targetFiller.fillStyle = color;
            targetFiller.fillRect(0,0,100,100);
        };
        
        
        var myUpdate = function(){
            // updates the color of the user input color box

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

        // variables for sliders and input boxes for the red, green, blue input
        var redSlider = document.getElementById("redSlider");
        var redBox = document.getElementById("redBox");
        redSlider.value = redBox.value;
        
        var greenSlider = document.getElementById("greenSlider");
        var greenBox = document.getElementById("greenBox");
        greenSlider.value = greenBox.value;
        
        var blueSlider = document.getElementById("blueSlider");
        var blueBox = document.getElementById("blueBox");
        blueSlider.value = blueBox.value;
        
        
        var redInput = 0;
        var greenInput = 0;
        var blueInput = 0;
        
        myUpdate();
        
        redSlider.oninput = function() {
            redBox.value = this.value;
            redInput = this.value;
            myUpdate();
        };
        
        redBox.oninput = function() {
            if (this.value < 0)
                this.value = 0;
            if (this.value > 255)
                this.value = 255;
            redSlider.value = this.value;
            redInput = this.value;
            myUpdate();
        };
        
        greenSlider.oninput = function() {
            greenBox.value = this.value;
            greenInput = this.value;
            myUpdate();
        };
        
        greenBox.oninput = function() {
            if (this.value < 0)
                this.value = 0;
            if (this.value > 255)
                this.value = 255;
            greenSlider.value = this.value;
            greenInput = this.value;
            myUpdate();
        };

        blueSlider.oninput = function() {
            blueBox.value = this.value;
            blueInput = this.value;
            myUpdate();
        };
        
        blueBox.oninput = function() {
            if (this.value < 0)
                this.value = 0;
            if (this.value > 255)
                this.value = 255;
            blueSlider.value = this.value;
            blueInput = this.value;
            myUpdate();
        };
        
        var calcScore = function () {
            var percentOffRed = Math.abs(parseInt(red,16)-redSlider.value)/255*100;
            var percentOffGreen = Math.abs(parseInt(green,16)-greenSlider.value)/255*100;
            var percentOffBlue = Math.abs(parseInt(blue,16)-blueSlider.value)/255*100;
            var percentOff = (percentOffRed+percentOffGreen+percentOffBlue)/3;
            var timeTaken = endtime-starttime;
            var rawScore = ((15-settings.difficulty-percentOff)/(15-settings.difficulty)) * (15000-timeTaken);
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
                if (settings.turns == "" || isNaN(settings.turns) || settings.turns <= 0) {
                    // if turn value is invalid turns is put back to 10
                    settings.turns = 10;
                }
                settings.turns = Math.floor(settings.turns);
                settings.difficulty = document.getElementById('difficultySelector').value;
                createNewColor();
                gameStarted = true;
                totalScore = 0; // reset total score
                currentRound = 1; // reset current round to 1
                
            } else {
                alert('Game already started!');
            }
        });

        gotitButton.click(function () {
           // if the timer isn't start, make an alert
            if ( !gameStarted ) {
                window.alert("Please start the game first");
            } else {
                endtime = new Date().getTime();
                var thisScore = calcScore();
                currentScoreLabel.text("Score on Last Color: "+thisScore);
                totalScore += thisScore;
                totalScoreLabel.text("Your Score: "+totalScore);
                if (currentRound === settings.turns) {
                    gameStarted = false;
                    alert("Game over!\nYour total score: "+ totalScore);
                    highScoreForm.show();
                    userNameInput.focus();
                } else {
                    starttime = new Date().getTime();
                    currentRound += 1;
                    createNewColor();
                }
                // reset selectors...
                redSlider.value = 0;
                greenSlider.value = 0;
                blueSlider.value = 0;
                redInput = 0;
                greenInput = 0;
                blueInput = 0;
                redBox.value = 0;
                greenBox.value = 0;
                blueBox.value = 0;
                myUpdate();
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
            // reset image color
            targetFiller.fillStyle = 'white';
            targetFiller.fillRect(0,0,100,100);
        });
        
        
        return this;
 
    };
 
}( jQuery ));


$(document).ready(function() {

 	$("#hexGame").hexed();

});