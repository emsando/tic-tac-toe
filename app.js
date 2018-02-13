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

// NEW GAME function
var newGame = function() {
  gameboard.forEach(function(row) {
    row.forEach(function(box) {
      box.textContent = '';
    })
  })
  document.getElementById('result').style.display = 'none';
  turnTracker = 0;
};

// Attach as listener for new game button
document.getElementById('new-game').addEventListener('click', newGame);

// Toggle box function
var placePiece = function(box) {
  if (this.textContent === '') {
    var player = players[turnTracker % 2]
    var row = this.id[0];
    var col = this.id[1];
    var pos = this.id;

    this.textContent = player;

    // check if winning move
    // horizontal
    var won = checkHorizontalWin(player, row);
    if (won) {
      // TODO: RENDER WIN
      return renderWin(player);
    }

    // vertical
    won = checkVerticalWin(player, col);
    if (won) {
      // TODO: RENDER WIN
      return renderWin(player);
    }

    // major diagonal
    if (pos === '00' || pos === '11' || pos === '22') {
      won = checkMajorDiagonalWin(player);
      if (won) {
        // render win
        return renderWin(player);
      }
    }

    // minor minor diagonal
    if (pos === '20' || pos === '11' || pos === '02') {
      won = checkMinorDiagonalWin(player);
      if (won) {
        // render win
        return renderWin(player);
      }
    }

    turnTracker++;

    // check if tie
    if (turnTracker === 9) {
      renderTie();
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
var checkHorizontalWin = function(player, row) {
  for (var i = 0; i < 3; i++) {
    if (gameboard[row][i].textContent !== player) {
      return false;
    }
  }
  return true;
};

var checkVerticalWin = function(player, col) {
  for (var i = 0; i < 3; i++) {
    if (gameboard[i][col].textContent !== player) {
      return false;
    }
  }
  return true;
};

var checkMajorDiagonalWin = function(player) {
  for (var i = 0; i < 3; i++) {
    if (gameboard[i][i].textContent !== player) {
      return false;
    }
  }
  return true;
};

var checkMinorDiagonalWin = function(player) {
  for (var i = 0; i < 3; i++) {
    if (gameboard[2 - i][i].textContent !== player) {
      return false;
    }
  }
  return true;
};


// RENDER WIN

var renderWin = function(player) {
  var result = document.getElementById('result')
  result.textContent = `PLAYER ${(turnTracker % 2) + 1} WINS!`
  result.style.display = 'block';
}

var renderTie = function() {
  var result = document.getElementById('result')
  result.textContent = 'IT\'S A TIE!'
  result.style.display = 'block';
}
