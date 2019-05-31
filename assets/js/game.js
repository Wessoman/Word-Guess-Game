
var gameObject = {
	currentLetter: "",

	allGuesses: [],
	wrongGuesses: [],
	rightGuesses: [],
	rightGuessesInOrder: [],

	bandsArray: ["NEU", "HARMONIA", "CAN", "KRAFTWERK", "CLUSTER", "NOVALIS", "GURUGURU", "EMBRYO", "TANGERINEDREAM", "LADUESSELDORF", "BIRTHCONTROL", "NEKTAR", "BRAINTICKET", "ASHRATEMPEL", "AMONDUUL", "COSMICJOKERS", "FAUST", "SAND", "KRAAN", "AGITATIONFREE", "THIRSTYMOON", "DAVIDBOWIE", "IGGYPOP", "DEVO", "ULTRAVOX", "KLAUSSCHULZE"],
	randomWord: "",
	bandLetters:[],

	isMatch: null,
	isRepeat: null,

	guessesRemaining: 15,
	loseCount: 0,
	winCount:0,

	generateWord: function(){
		//Generate a random number to pick from the 26 listed bands
		var random_num = Math.random() * 27;
		random_num = Math.floor(random_num);

		//Assign randomWord to a randomly chosen band from the index
		//Split the band into an array of individual letters
		this.randomWord = this.bandsArray[random_num];
		this.bandLetters = this.randomWord.split("");

		console.log(this.randomWord + " " + this.bandLetters);

		//Since this function will only run on a win/loss, reset the guesses arrays
		this.allGuesses = [];
		this.wrongGuesses = [];
		this.rightGuesses = [];
		this.rightGuessesInOrder = [];
		this.guessesRemaining = 15;
	},

	checkRepeat: function(){
		var repeatCounter = -1;

		
		//Index "i" goes up, master counter
		for (var i=0; i < this.allGuesses.length; i++){
			if (this.currentLetter == this.allGuesses[i]){
				repeatCounter++;
			}
		}
		//the repeat counter?


		if (repeatCounter == 0){
			this.isRepeat = false;
		}
		else{
			this.isRepeat = true;
		}
	},
	checkMatch: function(){
		var matchCounter = 0;

		//Loop for the band names length amount of times.
		//If the guessed letter is equal to the the bands letter, the counter variable counts up one.
		for (var i=0; i < this.bandLetters.length; i++){
			if (this.currentLetter == this.bandLetters[i]){
				matchCounter++;
			}
		}
		//If counter is zero, the global isMatch variable becomes false (signifying no matches found)
		//Otherwise a match was found and isMatch becomes true.
		if (matchCounter == 0){
			this.isMatch = false;
		}
		else{
			this.isMatch = true;
		}
	},
	match_repeatComparison: function(){
		//Keeps a repeated key from taking a turn
		if (this.isRepeat == true){
			this.allGuesses.pop(this.currentLetter);
		}
		//If it's a wrong guess, pushes the current letter in the wrongGuesses.
		if (this.isRepeat == false && this.isMatch == false){
			this.wrongGuesses.push(this.currentLetter);
			this.guessesRemaining--;
		}
		//If it's a right guess, pushes the current letter in the rightGuesses.
		if (this.isRepeat == false && this.isMatch == true){
			this.rightGuesses.push(this.currentLetter);
			this.guessesRemaining--;
		}
	},
	revealBand: function(){
		//If there are no rightGuesses,
		//fill the displayed guesses with an underscore.
		if (this.rightGuesses.length == 0){
			for (var i =0; i<this.bandLetters.length; i++){
				this.rightGuessesInOrder[i] = "_";
			}
		}
		else {
			//For the bandname length
			for (var i=0; i<this.bandLetters.length; i++){
				//If the displayed guess =/= bandletters

				if (this.rightGuessesInOrder[i] != this.bandLetters[i]){

					//rightGuesses length tries
					for (var j=0; j<this.rightGuesses.length; j++){

						//The main right/wrong loop
						if (this.rightGuesses[j] == this.bandLetters[i]){
							this.rightGuessesInOrder[i] = this.bandLetters[i];
						}
						
						else {
							this.rightGuessesInOrder[i] = "_";
						}
					}
				}
			}
		}

		document.getElementById("current-word").innerHTML = this.rightGuessesInOrder.join(" ");
		document.getElementById("num-wins").innerHTML = ("Wins: " + this.winCount + "  " + "Losses: " + this.loseCount);
		document.getElementById("letters-guessed").innerHTML = this.wrongGuesses;
		document.getElementById("guesses-remaining").innerHTML = this.guessesRemaining;
	},
	checkProgress: function(){
		var counter = 0;

		//Loops the number of rounds equal to the number of letters in the band's name
		//adds one to the counter if the guess is correct
		for (var i=0; i<this.bandLetters.length; i++){
			if (this.rightGuessesInOrder[i] == this.bandLetters[i]){
				counter++;
			}
		}

		//Victory counter--If the bandletters are the length of the band name its a win (use Alert?)
		if (counter == this.bandLetters.length){
			alert("Wunderbar! Tohl!! You got it right!");
			this.winCount++;
			this.generateWord();
		}
		//loss condition (Use Alert?) out of guesses
		if (this.guessesRemaining == 0){
			alert("Ach du Lieber Himmel! Listen to more Krautrock!");
			this.loseCount++;
			this.generateWord();
		}
	}
}

var userStartedGameOnce = false;

//On every keyup...
document.onkeyup = function(q) {

	//currentLetter is grabbed from the keyboard and converted to upper case.
	//Then the letter is pushed into the allGuesses array
	gameObject.currentLetter = String.fromCharCode(q.keyCode).toUpperCase();

	//If the user presses the space button upon loading the page, start the game.
	if (gameObject.currentLetter == " " && userStartedGameOnce == false){


		gameObject.generateWord();

		userStartedGameOnce = true;

	}

	gameObject.allGuesses.push(gameObject.currentLetter);

	console.log("Current Letter: " + gameObject.currentLetter + "\n" + "Band Letters: " + gameObject.bandLetters + "\n" + "All Guesses: " + gameObject.allGuesses);


	//Checks to see if the letter has been typed before.
	//Checks to see if the letter matches with one in the band name.
	gameObject.checkRepeat();
	gameObject.checkMatch();


	//This function determines which array to push the currentLetter into.
	gameObject.match_repeatComparison();

	console.log("Correct Guesses: " + gameObject.rightGuesses);
	console.log("Incorrect Guesses: " + gameObject.wrongGuesses);
	console.log("Guesses Remaining:" + gameObject.guessesRemaining);

	//Reveals the band name as it is being guessed.
	gameObject.revealBand();
	console.log(gameObject.rightGuessesInOrder);

	//Check to see if the game is still in progress or if a win/lose went down
	gameObject.checkProgress();

	//known issues:
	//How the hell do I play a sound instead of sounding an alert?
	//How can I flash "YOU WIN" instead of an alert?
	//How can I remove the commas being drawn by revealBand?
	//I'm tired and I need my sleep now.
	
}

