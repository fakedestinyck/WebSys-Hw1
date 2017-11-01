
(function ( $ ) {
 

    $.fn.hexed = function( options ) {
 
        var settings = $.extend({
            // These are the defaults.
            difficulty: 5,
            turns: 10
        }, options );
 
        var red = "00".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
        var blue = "00".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
        var green = "00".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});

        var color =  '#' + red + blue + green;

        var targetColor = document.getElementById("targetColorImage");
        var targetFiller = targetColor.getContext("2d");
        targetFiller.fillStyle = color;
        targetFiller.fillRect(0,0,100,100);
        
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
        return this;
 
    };
 
}( jQuery ));


$(document).ready(function() {
    
    var totalRounds;
    var currentRound = 1;
    var totalScore;

 	$("#hexGame").hexed();



    $("#gotitButton").click(function(){
        //if the timer isn't start
        alert("You have to start the game first!");
        
        
    });
});

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