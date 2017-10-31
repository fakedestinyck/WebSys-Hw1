
(function ( $ ) {
 

    $.fn.hexed = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            difficulty: 5,
            turns: 10
        }, options );
 
        var red = "00".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
        var blue = "00".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
        var green = "00".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});

        var color = '#' + red + blue + green;

        this.html("difficulty: " + settings.difficulty + " random color: " + color);
        return this;
 
    };
 
}( jQuery ));


$(document).ready(function() {

	$("#testdiv").hexed({difficulty: 3});

})