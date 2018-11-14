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
    // check if key pressed is a letter key
    if (/[a-z]/.test(_event.key) && _event.key.length === 1) {
        // sets theLetter to the pressed key
        var theLetter = _event.key;
        console.log("you pressed " + theLetter);

        // check that letter has not been guessed yet
        if (!letterArray.includes(" " + theLetter)) {
            // reduce guess counter
            guessCounter();
            // push letter to guessed letters array (with spacing)
            // maybe add .toUpperCase?
            letterArray.push(" "+theLetter);
            console.log(letterArray);
            // adds letter to guessed letters section
            document.getElementById("guessLett").innerText = letterArray;
            return theLetter;

            // Check if letter is in theWord

        }
        else {
            alert("YOU ALREADY GUESSED "+theLetter.toUpperCase()+"!")
        }
    }
    else {
        alert("PRESS A LETTER KEY!");
    }
};

// Word Selection Section

var animalArray = ["elephant", "ostrich", "squirrel", "leopard", "termite", "orangutang", "crocodile", "aligator",
    "zebra", "gorilla", "toucan", "dolphin", "peacock", "flamingo", "donkey"];

// Variables... not really declared yet
// var theWord;
// var wordLength = theWord.length; 

// Selects a word from the array and returns it
function wordSelect() {
    // randomly selects an animal word from the array and assigns it to theWord
    theWord = animalArray[Math.floor(Math.random() * animalArray.length)];
    console.log("The secret word is "+theWord);
    return theWord;
}

// sets the amount of spaces displayed to match length of the word
function blankSetter() {
    // number of blanks equals number of letters
    blankNumber = theWord.length;
    console.log("The secret word is "+blankNumber+" letters long.");
        // sets array of blanks to be displayed on screen
        var blankSet=" _";
        var i = 1;
        // adds blanks until blankSet is correct length
        while (i<blankNumber){
            blankSet = blankSet + " _";
            i++;
        }
        // writes blankSet on screen
        document.getElementById("secretWord").innerHTML = blankSet;
        console.log(blankSet);
}

