/* ===== TIC TAC TOE single page web app ===== */

// Track whose turn it is
// % 2 gives player
var turnTracker = 0;

// Players
var players = {
  0: 'X',
  1: 'O'
};


// traverse DOM and create gameboard array
var gameboard = [];

for (var i = 0; i < 3; i++) {
  var row = []
  for (var j = 0; j < 3; j++) {
    row.push(document.getElementById(i.toString() + j.toString()));
  }
  gameboard.push(row);
}

console.log(gameboard)

// NEW GAME function
var newGame = function() {
  gameboard.forEach(function(row) {
    row.forEach(function(box) {
      box.textContent = '';
    })
  })
};

// Attach as listener for new game button
document.getElementById('new-game').addEventListener('click', newGame);

// Toggle box function
var placePiece = function(box) {
  if (this.textContent === '') {
    var piece = players[turnTracker % 2]
    var row = this.id[0];
    var col = this.id[1];
    var position = this.id;

    this.textContent = piece;
    turnTracker++;

    // check if winning move
    var horizontalWin = checkHorizontalWin(piece, row);

    // check if tie
    if (turnTracker === 9) {
      // RENDER TIE
    }
  }
};

// Attach as event listener on each game-box
gameboard.forEach(function(row) {
  row.forEach(function(box) {
    box.addEventListener('click', placePiece)
  })
})

// CHECK IF WON FUNCTIONS
var checkHorizontalWin = function(piece, row) {
  var result = null;
  for (var i = 0; i < 3; i++) {
    if (gameboard[row][i].textContent != piece) {
      return false;
    }
  }
  return true;
}
