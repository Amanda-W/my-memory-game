let card = document.getElementsByClassName("card");
let cardArray = [...card];
let deck = document.querySelector(".deck");

let openCardsArray = [];
let matchedCards = [];

let moves = 0;
let second = 0;
let minute = 0;
let interval;
let timerRunning = false
let timer = document.querySelector(".timer");

let stars = document.querySelectorAll(".fa-stars");
let starArray= document.querySelectorAll(".stars li");


let reset = document.querySelector(".fa-repeat");

let xBtn = document.getElementsByClassName("close")[0];

let refreshBtn = document.querySelector(".restart");


//shuffle function provided by Udacity
function shuffle(array) {
	let currentIndex= array.length,
	temporaryValue, randomIndex;

	while( currentIndex !==0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;

	}
	return array;
}

//make the cards able to flip by toggling the classes on the cards
function clickCard(card) {
	card.classList.toggle("open");
	card.classList.toggle("show");
	card.classList.toggle("disabled");
}
//start the game and call the shuffle function. shuffle the deck when the window loads
function start() {

	let randomCards = shuffle(cardArray);
	
	for(let i = 0; i < cardArray.length; i++) {
		cardArray[i].parentNode.removeChild(cardArray[i]);

	}
	for(let k = 0; k< randomCards.length; k++) {
		deck.appendChild(randomCards[k]);
	}
};

window.onload = start();

//this is the basic game logic. when cards are opened they will be added to the open cards array. when they match they will be put into 
//the matched cards array. A timeout is set to flip the cards back over if they don't match.
function openCard(event) {
	//starts timer
		if(timerRunning === false) {
		timerRunning = true;
		second=0;
		minute= 0;
		startTimer();
}
	clickCard(event.target);
	//this checks if a card is already in the openCard array. if it's not, it adds it to the open array
	//once added to the open card array, the event listener on the card for clicks is removed so i can't be clicked again until it flips back over
	if(openCardsArray.indexOf(event.target) == -1){
	openCardsArray.push(event.target);
	for( let i =0; i < openCardsArray.length; i++) {
		openCardsArray[i].removeEventListener("click",openCard);
	}
} 
//this moves the counter for every two clicks
	let length = openCardsArray.length
	if(length === 2) {
		moveCounter();
		//if the cards classes match, then call the cardsMatch function
		if(openCardsArray[0].children[0].className === openCardsArray[1].children[0].className) {
			cardsMatch();
		} else{
			//remove click event listeners
			for(let i = 0 ; i < cardArray.length; i++) {
				cardArray[i].removeEventListener("click", openCard);
			};
			//if they don't match, then remove the open classes and flip back over, re-adding the click event listener
			setTimeout(function flipBack(){
				removeOpen();
				for( let i = 0; i < cardArray.length; i++) {
					cardArray[i].addEventListener("click", openCard);
				};	
			}, 500)
			
		}
	}
}
//determine if the cards classes match.
function cardsMatch(){
	openCardsArray[0].classList.add("match","disabled");
	openCardsArray[1].classList.add("match", "disabled");
	openCardsArray[0].classList.remove("show", "open");
	openCardsArray[1].classList.remove("show", "open");
	matchedCards.push(openCardsArray[0]);
	matchedCards.push(openCardsArray[1]);
	openCardsArray=[];
	youWin();
	}
//loop through the cards, add a click listener to each card
for (let i = 0; i < cardArray.length; i++) {
	cardArray[i].addEventListener("click", openCard);
	};
//remove the oped classes on cards and return array to empty
	function removeOpen() {
	openCardsArray[0].classList.remove("open", "show","disabled");
	openCardsArray[1].classList.remove("open", "show", "disabled");
	openCardsArray = [];
}
//increment the move count
function moveCounter(){
	moves++;
	let counter = document.querySelector("span").textContent = moves;
	starRating();
}
//function to start the timer . increment seconds and minutes and add to the innerHTML of the timer
function startTimer() {
	interval = setInterval(function (){
			second++;
			timer.innerHTML = minute + " mins " + second + " secs ";
			if (second == 60) {
				minute ++;
				second = 0;
			}
		},1000);
	}
// remove classes of stars according to number of moves
function starRating() {
	if(moves <14){
	}else if (moves >= 14 && moves <= 20) {
		starArray[0].getElementsByTagName('i')[0].classList.remove("fa-star");
		}else{
		starArray[0].getElementsByTagName('i')[0].classList.remove("fa-star");
		starArray[1].getElementsByTagName('i')[0].classList.remove("fa-star");
	}
}
//resets the game when you click the restart button
refreshBtn.addEventListener("click",resetGame);
//resets the game 
function resetGame() {
	start();
	//resets moves
	moves = 0;
	document.querySelector("span").textContent = moves;
	//sets arrays back to empty
	openCardsArray =[];
	matchedCards= [];
	//adds stars back in
	starArray[0].getElementsByTagName('i')[0].classList.add("fa-star");
	starArray[1].getElementsByTagName('i')[0].classList.add("fa-star");
	//stops timer
	clearInterval(interval);
	second = 0;
	minute = 0;
	timer.innerHTML = "0 mins 0 secs"
	setTimeout(function wait(){
		startTimer();
	},1000);
//removes open, show, and disabled classes on cards
	for(i = 0; i < cardArray.length; i++){
		cardArray[i].classList.remove("open", "show","match", "disabled");
	}
}
//modal pops up and tells you number of stars, moves, and time you finished with. if you click play again it resfreshes everything. if you click the x it closes the modal but the game stays the same as you ended it.
function youWin() {
	if (matchedCards.length === 16) {
		clearInterval(interval);
		let modal = document.getElementById("modal");
		modal.style.display = "block";
			}
		let starNum = document.getElementsByClassName("fa-star").length;
		document.getElementsByClassName("star-rating")[0].innerHTML = starNum;
		document.getElementById("final-moves").innerHTML = moves;
		document.getElementById("total-time").innerHTML = timer.innerHTML;
		closeOutModal();
	}
//if you click on the X btn it closes out the modal. it doesn't refresh the game.
function closeOutModal(){
	xBtn.onclick = function(){
		modal.style.display = "none";
		}
	}
//if you click the play gain button, it will close the modal and refresh the game
	let btn = document.querySelectorAll(".play-again")[0];
		btn.addEventListener("click", function(){
			modal.style.display = "none";
			resetGame();
		})
	

		

	
















