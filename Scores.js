$(document).ready(function() {

    var jsonObject = JSON.parse(localStorage.getItem('highScore'));
    var newArray=jsonObject.highScores;
    function sortArray(a,b){
        if (a.score === b.score ){
            return b.timestamp - a.timestamp;
        } else {
            return a.score - b.score;
        }
    }
    newArray.sort(sortArray);

    $(newArray).each(function (index,value) {
        var newRow = "<tr><td>"+value.playerName+"</td><td>"+value.difficulty+"</td><td>"+value.turns+"</td><td>"+value.score+"</td><td>"+value.timestamp+"</td></tr>";
        $("tbody").after(newRow);
    });
});