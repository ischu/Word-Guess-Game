// remember to console.log!
// at this point I probably can organize all of this into one object

// Word Selection Section

var animalArray = ["elephant", "ostrich", "squirrel", "leopard", "termite", "orangutang", "crocodile", "aligator",
    "zebra", "gorilla", "toucan", "dolphin", "peacock", "flamingo", "donkey", "hornet"];

// CHANGE THIS SO IT WON'T PICK THE SAME ANIMAL TWICE!
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
    console.log(theWord + " is " + blankNumber + " letters long.");
    // sets array of blanks to be displayed on screen
    blankSet = ["_"];
    var i = 1;
    // adds blanks until blankSet is correct length
    while (i < blankNumber) {
        blankSet.push("_");
        i++;
    }
    // writes blankSet on screen as string with spaces instead of commas
    spacedWrite("secretWord", blankSet);
    console.log(blankSet);
    return blankSet;
}

// function for properly writing blankset array as string with spaces
function spacedWrite(x, y) {
    document.getElementById(x).innerHTML = y.toString().replace(/,/g, " ");
}

// function for replacing text in HTML elements (makes code look nicer)
function justWrite(x, y) {
    document.getElementById(x).innerHTML = y;
}

// Reset game after win/loss
var resetTime = false;

function resetGame() {
    // resets guess counter
    guessCount = 15;
    justWrite("guessNum", guessCount);
    // picks new word
    wordSelector();
    // sets appropriate number of blanks
    blankSetter();
    // clears letterArray (guessed letters)
    letterArray = [];
    // resets text in guessed letters section and instructions
    justWrite("guessLett", "Guess a Letter!");
    justWrite("playAgain", "guess a letter!");
    // Game has been reset- the time to reset has passed
    resetTime = false;
}

// function to reveal secret word, img, etc. on win/loss

function revealSecret() {
    // reveals word
    blankSet = theWord;
    spacedWrite("secretWord", blankSet);
    // reveals img
    // plays sound
}

// Wins counter
var winCount = 0;

// check if blankSet is equivalent to theWord
function winTime() {
    if (blankSet.join("") === theWord) {
        //adds 1 to win count
        winCount++;
        // updates win counter
        justWrite("winNum", winCount);
        console.log(winCount);
        // Sets banner to alert player of win
        justWrite("banner", "YOU WIN!!!");
        // reveals secret img, sound, etc. (NOT YET FULLY IMPLEMENTED)
        revealSecret();
        //preps game for reset
        justWrite("playAgain", "play again!");
        resetTime = true;
        return resetTime;
    }
};

// Guess counter
var guessCount = 15;
function guessCounter() {
    // reduce counter by 1
    guessCount--;
    console.log(guessCount);
    // write guess counter value
    justWrite("guessNum", guessCount);
    // check if out of guesses--> lose sequence
    if (guessCount < 1) {
        // show answer, alert user to loss, and prep for reset
        revealSecret();
        justWrite("banner", "you lose.");
        justWrite("playAgain", "play again!");;
        resetTime = true;
        return resetTime;
    }
};

// key press stuff
document.onkeyup = function (event) {
    // check if resetting
    if (!resetTime) {

        // check if key pressed is a letter key
        if (/[a-z]/.test(event.key) && event.key.length === 1) {
            // sets theLetter to the pressed key
            theLetter = event.key;
            console.log("you pressed " + theLetter);

            // check that letter has not been guessed yet
            if (!letterArray.includes(theLetter.toUpperCase())) {
                // pushes upper-case version of letter to guessed letters array
                letterArray.push(theLetter.toUpperCase());
                console.log(letterArray);
                // adds letter to guessed letters section with spacing and no commas
                spacedWrite("guessLett", letterArray);
                // reduces guess counter
                guessCounter();
                // checks if letter is in word and places it in corresponding blank if it is
                letterReplace();
                // checks if player has won game and intiates win sequence if yes
                winTime();
                // log and return theLetter
                console.log(theLetter);
                return theLetter
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
    };
};

// letter replace function
function letterReplace() {
    for (var i = 0; i < theWord.length; i++) {
        // finds where the letter matches a character in the word and the corresponding blank in blankSet
        if (theLetter === theWord[i] && blankSet[i] === "_") {
            // replace correct blank with theLetter
            blankSet[i] = theLetter;
        }
    }
    // write, logs, and returns updated set of blanks
    spacedWrite("secretWord", blankSet);
    console.log(blankSet);
    return blankSet;
}