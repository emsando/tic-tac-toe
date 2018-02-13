/* ===== TIC TAC TOE single page web app ===== */


// === GAME STATE ===
var state = {
  // Track whose turn it is: % 2 gives player
  turnTracker: 0,
  // Players
  players: {
    0: 'X',
    1: 'O'
  },
  scores: {
    'X': 0,
    'O': 0
  },
  lastWinner: null,
  // GAME BOARD
  gameboard: []
};

var player1 = prompt('Enter Name of Player 1');
var player2 = prompt('Enter Name of Player 2');
document.getElementById('player1name').textContent = `${player1}: X`;
document.getElementById('player2name').textContent = `${player2}: O`;


// traverse DOM and create gameboard array
for (var i = 0; i < 3; i++) {
  var row = []
  for (var j = 0; j < 3; j++) {
    row.push(document.getElementById(i.toString() + j.toString()));
  }
  state.gameboard.push(row);
}

// NEW GAME function
var newGame = function() {
  state.gameboard.forEach(function(row) {
    row.forEach(function(box) {
      box.textContent = '';
    })
  })
  document.getElementById('result').style.display = 'none';

  if (state.lastWinner === 'X' || state.lastWinner === null) {
    state.turnTracker = 0
    document.getElementById('current-turn').textContent = `${player1}'s turn!`;
  } else {
    state.turnTracker = 1;
    document.getElementById('current-turn').textContent = `${player2}'s turn!`;
  }
};

// Attach as listener for new game button
document.getElementById('new-game').addEventListener('click', newGame);

// Toggle box function
var placePiece = function(box) {
  if (this.textContent === '') {
    var player = state.players[state.turnTracker % 2]
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

    state.turnTracker++;

    // check if tie
    if (state.turnTracker >= 9) {
      renderTie();
    }

    // render turn
    renderTurn(state.players[state.turnTracker % 2]);
  }
};

// Attach as event listener on each game-box
state.gameboard.forEach(function(row) {
  row.forEach(function(box) {
    box.addEventListener('click', placePiece)
  })
})

// CHECK IF WON FUNCTIONS
var checkHorizontalWin = function(player, row) {
  for (var i = 0; i < 3; i++) {
    if (state.gameboard[row][i].textContent !== player) {
      return false;
    }
  }
  return true;
};

var checkVerticalWin = function(player, col) {
  for (var i = 0; i < 3; i++) {
    if (state.gameboard[i][col].textContent !== player) {
      return false;
    }
  }
  return true;
};

var checkMajorDiagonalWin = function(player) {
  for (var i = 0; i < 3; i++) {
    if (state.gameboard[i][i].textContent !== player) {
      return false;
    }
  }
  return true;
};

var checkMinorDiagonalWin = function(player) {
  for (var i = 0; i < 3; i++) {
    if (state.gameboard[2 - i][i].textContent !== player) {
      return false;
    }
  }
  return true;
};


// RENDER FUNCTIONS
var renderWin = function(player) {
  state.scores[player]++;
  var result = document.getElementById('result')

  // hide current turn div
  document.getElementById('current-turn').style.display = 'none';

  // display winner
  if (player === 'X') {
    result.textContent = `${player1.toUpperCase()} WINS!`
  } else {
    result.textContent = `${player2.toUpperCase()} WINS!`
  }
  result.style.display = 'block';

  // update scores and last winner
  var score = player + 'score';
  var score = document.getElementById(score);
  score.textContent = `Games Won: ${state.scores[player]}`;
  state.lastWinner = player;
}

var renderTie = function() {
  // hide current turn div
  document.getElementById('current-turn').style.display = 'none';

  // display tie
  var result = document.getElementById('result')
  result.textContent = 'IT\'S A TIE!'
  result.style.display = 'block';
};

var renderTurn = function(player) {
  var turnDiv = document.getElementById('current-turn');
  if (player === 'X') {
    turnDiv.textContent = `${player1}'s turn!`;
  } else {
    turnDiv.textContent = `${player2}'s turn!`;
  }
}

// INIT
document.getElementById('current-turn').textContent = `${player1}'s turn!`;
