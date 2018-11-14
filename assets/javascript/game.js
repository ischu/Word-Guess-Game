// remember to console.log!

// Word Selection Section

var animalArray = ["elephant", "ostrich", "squirrel", "leopard", "termite", "orangutang", "crocodile", "aligator",
    "zebra", "gorilla", "toucan", "dolphin", "peacock", "flamingo", "donkey", "hornet"];

// Variables... not really declared yet
// var theWord;
// var wordLength = theWord.length; 

// Selects a word from the array and returns it
function wordSelector() {
    // randomly selects an animal word from the array and assigns it to theWord
    theWord = animalArray[Math.floor(Math.random() * animalArray.length)];
    console.log("The secret word is " + theWord);
    return theWord;
}

// sets the amount of spaces displayed to match length of the word
function blankSetter() {
    // number of blanks equals number of letters
    blankNumber = theWord.length;
    console.log("The secret word is " + blankNumber + " letters long.");
    // sets array of blanks to be displayed on screen
    var blankSet = " _";
    var i = 1;
    // adds blanks until blankSet is correct length
    while (i < blankNumber) {
        blankSet = blankSet + " _";
        i++;
    }
    // writes blankSet on screen
    document.getElementById("secretWord").innerHTML = blankSet;
    console.log(blankSet);
    return blankSet;
}

// function to reset game on win/loss

function resetGame() {
    // resets guess counter
    guessCount = 15;
    // picks new word
    wordSelector();
    // sets appropriate number of blanks
    blankSetter();
    // resets 
    // resets placeholder text in guessed letters section
    document.getElementById("guessLett").innerHTML = "Guess a Letter!";
}

// function to reveal secret word, img, etc.

function revealSecret() {
    // reveals word
    document.getElementById("secretWord").innerHTML = theWord;
    // reveals img
    // plays sound
}

// Wins counter
var winCount = 0;
var youWin = false;

function winCounter() {
    // checks if user won equals true
    if (youWin) {
        // adds a win
        winCount++;
        console.log(winCount);
        // resets win to false
        youWin = false;
        // updates win counter
        document.getElementById("winNum").innerHTML = winCount;
    }
    // Will probably need to change this to an else if (youLose) type thing
    else {
        console.log("you lose");
    }
};

function winButt() {
    youWin = true;
}
// Guess counter
var guessCount = 15;
function guessCounter() {
        // reduce counter by 1
        guessCount--;
        console.log(guessCount);
        // write guess counter value
        document.getElementById("guessNum").innerHTML = guessCount;
        return guessCount;
};

// key press stuff

var letterArray = [];
resetTime = false;

document.onkeyup = function (_event) {
    // check if it's time to reset
    if(resetTime){
        resetGame();
        resetTime=false;
        letterArray=[];
    }
    // check if key pressed is a letter key
    else if (/[a-z]/.test(_event.key) && _event.key.length === 1) {
        // sets theLetter to the pressed key
        var theLetter = _event.key;
        console.log("you pressed " + theLetter);

        // checks if game is lost
        if (guessCount === 0) {
            // if it is, show answer, alert user to loss, and prep for reset
            revealSecret();
            document.getElementById("banner").innerHTML = "YOU LOSE";
            resetTime = true;
            return resetTime;
            // resetGame();
        }
        else {
            // check that letter has not been guessed yet
            if (!letterArray.includes(" " + theLetter)) {
                // reduce guess counter
                guessCounter();
                // push letter to guessed letters array (with spacing)
                // maybe add .toUpperCase?
                letterArray.push(" " + theLetter);
                console.log(letterArray);
                // adds letter to guessed letters section
                document.getElementById("guessLett").innerText = letterArray;
                return theLetter;
            }
            else {
                alert("YOU ALREADY GUESSED " + theLetter.toUpperCase() + "!")
            };
        }
    }
    else {
        alert("PRESS A LETTER KEY!");
    }
};



