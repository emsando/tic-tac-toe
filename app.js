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

// Toggle box function
var placePiece = function(box) {
  if (this.textContent === '') {
    this.textContent = players[turnTracker % 2];
    turnTracker++;    
  }
};

// Attach as event listener on each game-box
gameboard.forEach(function(row) {
  row.forEach(function(box) {
    box.addEventListener('click', placePiece)
  })
})
