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
    blankSet = ["_"];
    var i = 1;
    // adds blanks until blankSet is correct length
    while (i < blankNumber) {
        blankSet.push("_");
        i++;
    }
    // writes blankSet on screen as string with spaces instead of commas
    secretWordWrite(blankSet);
    console.log(blankSet);
    return blankSet;
}

// function for properly writing blankset array as string with spaces
function secretWordWrite(x) {
    document.getElementById("secretWord").innerHTML = x.toString().replace(/,/g, " ");
}

// function to reset game on win/loss

function resetGame() {
    // resets guess counter
    guessCount = 15;
    document.getElementById("guessNum").innerHTML = guessCount;
    // picks new word
    wordSelector();
    // sets appropriate number of blanks
    blankSetter();
    // resets 
    // resets placeholder text in guessed letters section
    document.getElementById("guessLett").innerHTML = "Guess a Letter!";
    document.getElementById("playAgain").innerHTML = "guess a letter!";
}

// function to reveal secret word, img, etc. on win/loss

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

// Delete
function winButt() {
    youWin = true;
}
// Guess counter
var guessCount = 15;
function guessCounter() {
    // if guesses remain, reduce number of guesses remaining
    if (guessCount > 1) {
        // reduce counter by 1
        guessCount--;
        console.log(guessCount);
        // write guess counter value
        document.getElementById("guessNum").innerHTML = guessCount;
        return guessCount;
    }
    // if no guesses left
    else {
        // reduce counter to zero
        guessCount--;
        console.log(guessCount);
        // write guess counter value
        document.getElementById("guessNum").innerHTML = guessCount;
        // show answer, alert user to loss, and prep for reset
        revealSecret();
        document.getElementById("banner").innerHTML = "YOU LOSE";
        document.getElementById("playAgain").innerHTML = "play again!";
        resetTime = true;
        return resetTime;
    }
};

// key press stuff

var letterArray = [];
resetTime = false;
var theLetter;

document.onkeyup = function (_event) {
    // check if resetting
    if (!resetTime) {

        // check if key pressed is a letter key
        if (/[a-z]/.test(_event.key) && _event.key.length === 1) {
            // sets theLetter to the pressed key
            theLetter = _event.key;
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
                document.getElementById("guessLett").innerText = letterArray;
                console.log(theLetter);
                // returns theLetter as a string
            }
            // if letter has been guessed- obnoxious alert!
            else {
                alert("YOU ALREADY GUESSED " + theLetter.toUpperCase() + "!")
            };
        }
        // if not a letter key- obnoxious alert!
        else {
            alert("PRESS A LETTER KEY!");
        };
    }
    // if resetting 
    else {
        resetGame();
        resetTime = false;
        letterArray = [];
    };
    return theLetter
};
// letter replace function
function letterReplace() {
    for (var i = 0; i < theWord.length; i++) {
        // finds where the letter is in the word
        if (theLetter === theWord[i]) {
            // replace correct blank(s) with theLetter
            blankSet[i] = theLetter;
            secretWordWrite(blankSet);
            console.log(blankSet);
            return blankSet;
        }

    }
}

// check if blankSet has any blanks left- if no set youWin to true & resetTime to true

function LR() {
    console.log(theLetter);
}