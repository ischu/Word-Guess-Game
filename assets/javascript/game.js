// remember to console.log!

// Wins counter
var winCount = 0;
var youWin = true;

function winCounter() {
    if (youWin) {
        winCount++;
        console.log(winCount);
        youWin = false;
        document.getElementById("winNum").innerHTML = winCount;
    }
    else {
        console.log("you lose");
    }
};
// Guess counter
var guessCount = 15;
function guessCounter() {
    guessCount--;
    console.log(guessCount);
    document.getElementById("guessNum").innerHTML = guessCount;
};

// key press stuff

var letterArray = [];

document.onkeyup = function (_event) {
    // checks if key pressed is a letter
    if (/[a-z]/.test(_event.key)) {
        // sets theLetter to the pressed key
        var theLetter = _event.key;
        console.log("you pressed " + theLetter);
        // reduces guess counter
        guessCounter();
        // add theLetter to guessed letters array
        letterArray.push(theLetter);
        // adds letter to 
        document.getElementById("guessLett").innerHTML = letterArray;
        return theLetter;
    }
    else {
        alert("press a letter key!");
    }
};

// Word Selection
var animalArray = ["elephant", "ostrich", "squirrel", "leopard", "termite", "orangutang", "crocodile", "aligator",
    "zebra", "gorilla", "toucan", "dolphin", "peacock", "flamingo", "donkey"];
var theWord;

// winCounter()