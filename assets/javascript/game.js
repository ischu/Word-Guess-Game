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

function winButt(){
    youWin = true;
}
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
    // check if key pressed is a letter

    if (/[a-z]/.test(_event.key)) {
        // sets theLetter to the pressed key
        var theLetter = _event.key;
        console.log("you pressed " + theLetter);
        // check that letter has not been guessed yet
        if (!letterArray.includes(" " + theLetter)) {
            // reduce guess counter
            guessCounter();
            // push letter to guessed letters array (with spacing)
            // maybe add .toUpperCase?
            letterArray.push(" " + theLetter);
            console.log(letterArray);
            // adds letter to guessed letters section
            document.getElementById("guessLett").innerHTML = letterArray;
            return letterArray;
        }
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