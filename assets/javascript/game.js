// remember to console.log!

// Wins counter
var winCount = 0;
var youWin = true;

function winCounter() {
    if (youWin) {
        winCount++;
        console.log(winCount);
        youWin=false;
        document.getElementById("winNum").innerHTML=winCount;
    }
    else {
        console.log("you lose");
    }
};
// Guess counter
var guessCount = 15;
function guessCounter(){
    guessCount--;
    console.log(guessCount);
    document.getElementById("guessNum").innerHTML=guessCount;
}

var animalArray=["elephant", "ostrich", "squirrel", "leopard", "termite", "orangutang", "crocodile", "aligator",
    "zebra", "gorilla", "toucan", "dolphin", "peacock", "flamingo", "donkey"];
var theWord;

// winCounter()