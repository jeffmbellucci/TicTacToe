
function TTT() {
  this.player = 'X';
  this.board = this.makeBoard();
}

TTT.prototype.diagonalWinner = function () {
  var game = this;

  var diagonalPositions1 = [[0, 0], [1, 1], [2, 2]];
  var diagonalPositions2 = [[2, 0], [1, 1], [0, 2]];

  var winner = null;
  _.each(["X", "O"], function (mark) {
    function didWinDiagonal (diagonalPositions) {
      return _.every(diagonalPositions, function (pos) {
        return game.board[pos[0]][pos[1]] === mark;
      });
    }

    var won = _.any(
      [diagonalPositions1, diagonalPositions2],
      didWinDiagonal
    );

    if (won) {
      winner = mark;
    }
  });

  return winner;
};

TTT.prototype.horizontalWinner = function () {
  var game = this;

  var winner = null;
  _(["X", "O"]).each(function (mark) {
    var indices = _.range(0, 3);

    var won = _(indices).any(function (i) {
      return _(indices).every(function (j) {
        return game.board[i][j] === mark;
      });
    });

    if (won) {
      winner = mark;
    }
  });

  return winner;
};

TTT.prototype.makeBoard = function () {
  return _.times(3, function (i) {
    return _.times(3, function (j) {
      return null;
    });
  });
};

TTT.prototype.placeMark = function (pos) {
  this.board[pos[0]][pos[1]] = this.player;
	this.switchPlayer()
};

TTT.prototype.switchPlayer = function () {
  (this.player === 'X') ? (this.player = 'O') : (this.player = 'X');
};

TTT.prototype.valid = function (pos) {
  // Check to see if the co-ords are on the board and the spot is
  // empty.

  function isInRange (pos) {
    return (0 <= pos) && (pos < 3);
  }

  return _(pos).all(isInRange) && _.isNull(this.board[pos[0]][pos[1]]);
};

TTT.prototype.verticalWinner = function () {
  var game = this;

  var winner = null;
  _(["X", "O"]).each(function (mark) {
    var indices = _.range(0, 3);

    var won = _(indices).any(function (j) {
      return _(indices).every(function (i) {
        return game.board[i][j] === mark;
      });
    });

    if (won) {
      winner = mark;
    }
  });

  return winner;
};

TTT.prototype.winner = function() {
  return (
    this.diagonalWinner() || this.horizontalWinner() || this.verticalWinner()
  );
};
	$(function() {
		var game = new TTT()
		function gameLoop() {
			$('*[id*="box"]').on("click", function() {
				var coords = [$(this).attr("id")[3] % 3,
											Math.floor($(this).attr("id")[3] / 3)]
				if(game.valid(coords)){
					game.placeMark(coords)
					$(this).text(game.player)
					if(game.winner()){
						alert("VICTORY")
					}
				} else { alert('wrong move, asshole')}
			})}

			gameLoop();
	})