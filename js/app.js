console.log("hello");

// Make the map
const rows = [0, 0, 0, 0, 0, 0, 0];
const cols = [0, 0, 0, 0, 0, 0, 0];

for (let y = 0; y < rows.length; y++) {
  for (let x = 0; x < cols.length; x++) {
    //created my own custom attributes 'data-x' and 'data-y'
    $("#grid").append(
      `<li><div id="cell-${x}-${y}" class="hexagon" data-x="${x}" data-y="${y}"></li>`
    );
  }
}
// sets up random first board
const randomStart = () => {
  const divLengthX = $(".hexagon").length;

  const random1 = Math.floor(Math.random() * divLengthX);
  $(".hexagon")
    .eq(random1)
    .addClass("player1");

  const divLengthY = $(".hexagon").length;

  const random2 = Math.floor(Math.random() * divLengthY);
  $(".hexagon")
    .eq(random2)
    .addClass("player2");
};

$(".hexagon").click(function(event) {
  // only allow moves to hexagons that have the class can-move
  if (!$(this).hasClass("can-move")) {
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
  $(`.${playerClass}`).each(function() {
    if ($(this).hasClass("can-move")) {
      $(this).addClass("can-attack");
    }
  });
}

function fairMove(playerClass, x, y) {
  // some reg-exy like behavior to target my custom attributes for grid system.
  $(`[data-x=${x + 1}][data-y=${y}]`).addClass("can-move");
  $(`[data-x=${x - 1}][data-y=${y}]`).addClass("can-move");
  $(`[data-x=${x}][data-y=${y + 1}]`).addClass("can-move");
  $(`[data-x=${x}][data-y=${y - 1}]`).addClass("can-move");
}

function showFairMoves(playerClass) {
  // .each iterates through the list
  $(`.${playerClass}`).each(function() {
    // 'this' refers to an HTML element, selecting it with jQuery `$(...)` allows us to use other jQuery operations such as .data()
    fairMove(playerClass, $(this).data("x"), $(this).data("y"));
  });
}

//update scores
function updateScoresP1(playerClass) {
  const playerScore = $(`.${playerClass}`).length;

  $(".p1Score").text(playerScore);
}
function updateScoresP2(playerClass) {
  const playerScore = $(`.${playerClass}`).length;

  $(".p2Score").text(playerScore);
}

// battle
function battle() {
  //if a square with a class of 'can-attack' is clicked then
  $(".can-attack").click(function(event) {
    console.log("you attacked someone");

    const randomWinner = Math.floor(Math.random() * 16) + 1;
    const lengthOfPlayer1 = $(".player1").length;
    const lengthOfPlayer2 = $(".player2").length;
    const randomP1Square = Math.floor(Math.random() * lengthOfPlayer1);
    const randomP2Square = Math.floor(Math.random() * lengthOfPlayer2);

    // if random # is greater than 3 and less than 6 then player2 wins

    if (randomWinner >= 1 && randomWinner <= 7) {
      $(this)
        .removeClass("player1 player1 can-move can-attack player2 player2")
        .addClass("player2 p2winner");
      //$(this).css("background-color","yellow")
      //$(this).addClass("player2 p2winner")
      return;
    }
    // if random # is less than 3 and greater than 1 then player1 wins
    else if (randomWinner >= 8 && randomWinner <= 14) {
      $(this)
        .removeClass("player1 player1 can-move can-attack player2 player2")
        .addClass("player1 p1winner");
      //$(this).css("background-color","orange")
      //$(this).addClass("player1 p1winner")
      return;
    }
    //extra p1 square died in battle
    else if (randomWinner == 15) {
      const randomSingleP1SqDeath = $(".player1")
        .eq(randomP1Square)
        .removeClass("player1 player1 can-move can-attack player2 player2");
      randomSingleP1SqDeath.addClass("player2 p2winner");
      console.log("the worst - p1 lost an extra square in battle to p2. :(");
      return;
    }
    // player loses 1 random square
    else if (randomWinner == 16) {
      const randomSingleP2SqDeath = $(".player2")
        .eq(randomP2Square)
        .removeClass("player1 player1 can-move can-attack player2 player2");
      randomSingleP2SqDeath.addClass("player1 p1winner");
      console.log("the worst - p2 lost an extra square in battle to p1. :(");
      return;
    }
  });
}
const game = {
  clickCounter: 0,
  clickCountMax: 3,
  clickCount: function(event) {
    game.clickCounter++;
    if (game.clickCounter >= game.clickCountMax) {
      $(".hexagon").removeClass("can-move");
      $(".hexagon").removeClass("can-attack");
      //reset back to 0
      game.clickCounter = 0;
    }
  }
};
const limitPlayerClicks = () => {
  $(".hexagon")
    .off("click", game.clickCount)
    .click(game.clickCount);
};

// button listener
$("#p1button").click(function(event) {
  game.clickCounter = 0;

  //clears hexagon from other player

  $(".hexagon").removeClass("p1winner");
  $(".hexagon").removeClass("p2winner");
  $(".hexagon").removeClass("can-move");
  $(".hexagon").removeClass("can-attack");

  // toggle between players
  $("#p1button")
    .addClass("p1ButtonClicked btn-danger")
    .removeClass("btn-secondary");
  $("#p2button")
    .removeClass("p2ButtonClicked btn-primary")
    .addClass("btn-secondary");

  // show the fair moves and attack moves
  showFairMoves("player1");
  canAttack("player2");
  battle();
  limitPlayerClicks();
  updateScoresP1("player1");
  updateScoresP2("player2");
});

$("#p2button").click(function(event) {
  game.clickCounter = 0;

  // clears hexagon from other player
  $(".hexagon").removeClass("p1winner");
  $(".hexagon").removeClass("p2winner");
  $(".hexagon").removeClass("can-move");
  $(".hexagon").removeClass("can-attack");

  // toggle between players
  $("#p2button")
    .addClass("p2ButtonClicked btn-primary")
    .removeClass("btn-secondary");
  $("#p1button")
    .removeClass("p1ButtonClicked btn-danger")
    .addClass("btn-secondary");

  // show the fair moves and attack moves
  showFairMoves("player2");
  canAttack("player1");
  battle();
  limitPlayerClicks();
  updateScoresP1("player1");
  updateScoresP2("player2");
});

// starts game
randomStart();
randomStart();
