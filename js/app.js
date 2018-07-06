console.log('hello');

// Make the map

let rows = [0, 0, 0, 0, 0, 0, 0, ];
let cols = [0, 0, 0, 0, 0, 0, 0, ];



for (let y = 0; y < rows.length; y++) {
 //$("#grid").append("<div></div>");

 for (let x = 0; x < cols.length; x++) {
  $("#grid").append(`<li><div id="cell-${x}-${y}" class="hexagon" data-x="${x}" data-y="${y}"></li>`);
 }
}

// sets up random first board

let randomStart = () => {
 let divLengthX = $(".hexagon").length;

 let random = Math.floor(Math.random() * divLengthX);
 $(".hexagon").eq(random).addClass("player1");

 let divLengthY = $(".hexagon").length;

 random = Math.floor(Math.random() * divLengthY);
 $(".hexagon").eq(random).addClass("player2");
}

/////////////////////////////////////////////////////////////////////////////

$('.hexagon').click(function(event) {
 //	only allow moves to hexagons that have the class can-move
 if (!$(this).hasClass('can-move')) {
  return false;
 }

 if ($("#p2button").hasClass("p2ButtonClicked")) {
  // console.log('I am a blue square for player 2'+this.id);
  //$('.p2Coord').append(`<div>'I am a blue square for player 2 at '${this.id}</div>`);
  $(this).addClass("player2");
 }

 if ($("#p1button").hasClass("p1ButtonClicked")) {
  // console.log('I am a red square for player 1 at'+this.id);
  //$('.p1Coord').append(`<div>'I am a red square for player 1 at '${this.id}</div>`);
  $(this).addClass("player1");
 }
});


function canAttack(playerClass) {
 //magic below
 $(`.${playerClass}`).each(function() {
   if ($(this).hasClass('can-move')) {
    $(this).addClass('can-attack');
   }
  })
  // magic above
}

function fairMove(playerClass, x, y) {
 //magic below

 $(`[data-x=${x+1}][data-y=${y}]`).addClass('can-move');
 $(`[data-x=${x-1}][data-y=${y}]`).addClass('can-move');
 $(`[data-x=${x}][data-y=${y+1}]`).addClass('can-move');
 $(`[data-x=${x}][data-y=${y-1}]`).addClass('can-move');

 // magic above
}

function showFairMoves(playerClass) {
 // .each iterates through the list
 $(`.${playerClass}`).each(function() {
  // 'this' refers to an HTML element, selecting it with jQuery `$(...)` again allows us to use other jQuery operations such as .data()
  fairMove(playerClass, $(this).data('x'), $(this).data('y'));
 });
}


//update scores

function updateScoresP1(playerClass) {
	let playerScore = $(`.${playerClass}`).length

	$('.p1Score').text(playerScore);
	}
function updateScoresP2(playerClass) {
	let playerScore = $(`.${playerClass}`).length

	$('.p2Score').text(playerScore);
	}







// battle
function battle() {

 //if a square with a class of 'can-attack' is clicked then 
 $('.can-attack').click(function(event) {

  console.log('you attacked someone');

  let randomWinner = Math.floor(Math.random() * 10) + 1
  let lengthOfPlayer1 = $(".player1").length;
  let lengthOfPlayer2 = $(".player2").length;
  let randomP1Square = Math.floor(Math.random() * lengthOfPlayer1);
  let randomP2Square = Math.floor(Math.random() * lengthOfPlayer2);


// if random # is greater than 3 and less than 6 then player2 wins
  if (randomWinner >= 1 && randomWinner <= 4) {
   $(this).removeClass("player1 player1 can-move can-attack player2 player2");
    //$(this).css("background-color","yellow")
   $(this).addClass('player2')
   $(this).addClass('p2winner')
  }
  // if random # is less than 3 and greater than 1 then player1 wins
   if (randomWinner >= 5 && randomWinner <= 8) {

   $(this).removeClass("player1 player1 can-move can-attack player2 player2");
    //$(this).css("background-color","orange")
   $(this).addClass('player1')
   $(this).addClass('p1winner')
  }
  //extra p1 square died in battle
  if (randomWinner == 9) {
  		let randomSingleP1SqDeath = $(".player1").eq(randomP1Square).removeClass("player1 player1 can-move can-attack player2 player2");
  			randomSingleP1SqDeath.addClass("player2")
		 console.log("the worst - p1 lost an extra square in battle to p2. :(")
  }
  // player loses 1 random square
  if (randomWinner == 10) {
  		let randomSingleP2SqDeath = $(".player2").eq(randomP2Square).removeClass("player1 player1 can-move can-attack player2 player2");
  			randomSingleP2SqDeath.addClass("player1")
		 console.log("the worst - p2 lost an extra square in battle to p1. :(")
  }
//   // player 2 loses a random square
//   if (randomWinner == 11) {
//   		$(".player2").eq(randomP2Square).removeClass("player2");
// 		 console.log("An extra p2 square died in battle :(")
//   }
// // 
// if (randomWinner == 12){

// 	  	let $player1Loser = $(".player").eq(randomP1Square).removeClass(".player1");

// 	  	$player1Loser.addClass("player2 takenP2")

// 		 console.log("THE WORST - a square from player 2 (blue) was taken and added to player 2 (red)")
// }
// // 
// if (randomWinner == 13){

// 	  	let $player2Loser = $(".player2").eq(randomP2Square).removeClass(".player2");

// 	  	$player2Loser.addClass("player1 takenP1")


// 		 console.log("THE WORST - a square from player 1 (red) was taken and added to player 2 (blue)")
// }





 })
}
const game = {
 clickCounter: 0,
 clickCountMax: 3,
 clickCount: function(event) {
  game.clickCounter++
   if (game.clickCounter >= game.clickCountMax) {
    $('.hexagon').removeClass('can-move')
    $('.hexagon').removeClass('can-attack')
     //reset back to 0
    game.clickCounter = 0;
   }
 }
}
const limitPlayerClicks = () => {


 $('.hexagon').off('click', game.clickCount).click(game.clickCount)

};


////// button listener
$("#p1button").click(function(event) {
 game.clickCounter = 0;

 //clears hexagon from other player

 $('.hexagon').removeClass('p1winner')
 $('.hexagon').removeClass('p2winner')
 $('.hexagon').removeClass('can-move');
 $('.hexagon').removeClass('can-attack');


 // toggle between players
 $("#p1button").addClass("p1ButtonClicked btn-danger").removeClass('btn-secondary');
 $("#p2button").removeClass("p2ButtonClicked btn-primary").addClass("btn-secondary");

 // show the fair moves and attack moves
 showFairMoves("player1");
 canAttack("player2");
 battle();
 limitPlayerClicks();
 updateScoresP1("player1")
 updateScoresP2("player2");
});

$("#p2button").click(function(event) {
 game.clickCounter = 0;

 // clears hexagon from other player
 $('.hexagon').removeClass('p1winner')
 $('.hexagon').removeClass('p2winner')
 $('.hexagon').removeClass('can-move');
 $('.hexagon').removeClass('can-attack');

 // toggle between players
 $("#p2button").addClass("p2ButtonClicked btn-primary").removeClass('btn-secondary');
 $("#p1button").removeClass("p1ButtonClicked btn-danger").addClass("btn-secondary");

 // show the fair moves and attack moves
 showFairMoves("player2");
 canAttack("player1");
 battle();
 limitPlayerClicks();
 updateScoresP1("player1")
 updateScoresP2("player2");


});



// starts game
randomStart();
randomStart();