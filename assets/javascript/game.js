// Object Edition of Game

var game = {
    winCount: 0,
    resetTime: false,
    // won: false,
    mammalArray: ["elephant", "squirrel", "leopard", "orangutan", "zebra", "gorilla", "dolphin", "donkey", "dog", "cat"],
    reptileArray: ["crocodile", "alligator", "python", "cobra", "tortoise", "iguana", "rattlesnake", "gecko", "chameleon", "skink"],
    birdArray: ["ostrich", "parrot", "peacock", "flamingo", "toucan", "penguin", "puffin", "oriole", "bobolink", "falcon"],
    bugArray: ["hornet", "termite", "ant", "bumblebee", "cricket", "grasshopper", "scarab", "housefly", "dragonfly", "mosquito"],
    // array of all "catagory" arrays
    arrayOf: [],
    // index number of array within arrayOf (default is animalArray)
    n: 0,

    // sets arrayOf to include all arrays
    setArrayOf: function () {
        this.arrayOf = [this.mammalArray, this.reptileArray, this.birdArray, this.bugArray];
        // console.log(this.arrayOf, this.mammalArray, this.reptileArray, this.birdArray, this.bugArray);
        return this.arrayOf;
    },
    // functions for document...ById stuff
    spacedWrite: function (ID, text) {
        document.getElementById(ID).textContent = text.toString().replace(/,/g, " ");
    },
    justWrite: function (ID, text) {
        document.getElementById(ID).textContent = text;
    },
    // function which resets game for play/replay
    // changing "n" changes the category (arrayOf indexed array)
    resetGame: function (n) {
        // resets guess counter
        this.setArrayOf();
        guessCount = 15;
        // unsets "win-protector"
        won = false;
        this.justWrite("guessNum", guessCount);
        // picks new word
        this.wordSelector(this.arrayOf[n]);
        // console.log(this.arrayOf[n]);
        // sets appropriate number of blanks
        this.blankSetter();
        // clears letterArray (guessed letters)
        letterArray = [];
        // resets text in guessed letters section and instructions
        this.justWrite("playAgain", "guess a letter!");
        this.justWrite("guessLett", "guess a letter");
        instructions.setAttribute("class", "secondText leftMarg ");
        // Game has been reset- the time to reset has passed
        this.resetTime = false;
    },
    // function which reveals secret word, sound, img, and shows instructions to play again
    revealSecret: function () {
        // reveals word
        blankSet = theWord;
        this.justWrite("secretWord", blankSet);
        // highlights instructions to play again
        this.justWrite("playAgain", "play again!");
        instructions.setAttribute("class", "highlightText leftMarg")
        // reveals img (img name is the word)
        secretImg.src = ("assets/images/" + theWord + ".jpg");
        // plays sound
    },
    // selects a word from the array to be guessed
    wordSelector: function (array) {
        // randomly selects an animal word from the array and assigns it to theWord
        theWord = array[Math.floor(Math.random() * array.length)];
        // words only repeat after entire array has been spent
        for (i = 0; i < array.length; i++) {
            // resets arrays before empty
            if (array.length === 1) {
                this.mammalArray = ["elephant", "squirrel", "leopard", "orangutan", "zebra", "gorilla", "dolphin", "donkey", "dog", "cat"]
                this.reptileArray = ["crocodile", "alligator", "python", "cobra", "tortoise", "iguana", "rattlesnake", "gecko", "chameleon", "skink"]
                this.birdArray = ["ostrich", "parrot", "peacock", "flamingo", "toucan", "penguin", "puffin", "oriole", "bobolink", "falcon"]
                this.bugArray = ["hornet", "termite", "ant", "bumblebee", "cricket", "grasshopper", "scarab", "housefly", "dragonfly", "gnat"]
            }
            // removes value from array 
            else if (theWord === array[i]) {
                array.splice(i, 1);
            }
        }
        console.log("The secret word is " + theWord);
        console.log(array);
        // return theWord;
    },
    // sets "blanks" (underscores) and displays them on screen
    blankSetter: function () {
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
        this.spacedWrite("secretWord", blankSet);
        console.log(blankSet);
        return blankSet;
    },
    // replaces blanks with letters when player guesses correctly
    letterReplace: function () {
        for (var i = 0; i < theWord.length; i++) {
            // finds where the letter matches a character in the word and the corresponding blank in blankSet
            if (theLetter === theWord[i] && blankSet[i] === "_") {
                // replace correct blank with theLetter
                blankSet[i] = theLetter;
            }
        }
        // write, logs, and returns updated set of blanks
        this.spacedWrite("secretWord", blankSet);
        console.log(blankSet);
        return blankSet;
    },
    // triggers win player wins game
    winTime: function () {
        // this runs when game is resetting after a loss to prevent an error message when blankSet is undefined
        if (this.resetTime) {
            console.log("not an error message")
        }
        else if (blankSet.join("") === theWord) {
            //adds 1 to win count
            this.winCount++;
            // updates win counter
            this.justWrite("winNum", this.winCount);
            console.log(this.winCount);
            // Sets banner to alert player of win
            this.justWrite("banner", "YOU WIN!!!");
            // reveals secret img, sound, etc.
            this.revealSecret();
            //preps game for reset
            this.resetTime = true;
            // prevents "losing" after winning on last guess
            won = true;
            // return resetTime;
        }
    },
    // reduces guess count, triggers loss when at zero
    guessCounter: function () {
        // reduce counter by 1
        guessCount--;
        console.log(guessCount);
        // write guess counter value
        this.justWrite("guessNum", guessCount);
        // check if out of guesses--> lose sequence (doesn't run if player wins with last guess)
        if (guessCount === 0 && won === false) {
            // show answer, alert user to loss, and prep for reset
            this.revealSecret();
            this.justWrite("banner", "you lose.");
            this.resetTime = true;
            // return resetTime;
        }
    },
    // changes the array the word is selected from
    chooseArray: function (categoryNumber) {
        // sets the category by changing the index number of arrayOf (n)
        this.n = categoryNumber;
        this.resetGame(this.n);
        // selects category text with matching ID
        for (i = 0; i < this.arrayOf.length; i++) {
            categoryi = document.getElementById("category" + i);
            // and highlights it as the chosen category
            if (categoryNumber === i) {
                categoryi.setAttribute("class", "selectedCategory");
            }
            // while resetting any other highlighted categories
            else {
                categoryi.setAttribute("class", "");
            }
        }
    },



};

document.onkeyup = function (event) {
    // check if resetting
    if (game.resetTime === false) {

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
                game.spacedWrite("guessLett", letterArray);
                // checks if letter is in word and places it in corresponding blank if it is
                game.letterReplace();
                // checks if player has won game and intiates win sequence if yes
                game.winTime();
                // reduces guess counter
                game.guessCounter();
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
        game.resetGame(game.n);
    };
};