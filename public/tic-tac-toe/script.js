class TicTacToe {
    constructor() {
      this.board = Array(9).fill(null);
      this.currentPlayer = 'X';
      this.winner = null;
    }
  
    printBoard() {
      console.log(`
        ${this.board[0] || ' '} | ${this.board[1] || ' '} | ${this.board[2] || ' '}
        -----------
        ${this.board[3] || ' '} | ${this.board[4] || ' '} | ${this.board[5] || ' '}
        -----------
        ${this.board[6] || ' '} | ${this.board[7] || ' '} | ${this.board[8] || ' '}
      `);
    }
  
    makeMove(index) {
      if (this.winner || this.board[index] !== null) return false;
      this.board[index] = this.currentPlayer;
      if (this.checkWinner()) {
        this.winner = this.currentPlayer;
        console.log(`Player ${this.currentPlayer} wins!`);
      } else if (!this.board.includes(null)) {
        this.winner = 'Draw';
        console.log("It's a draw!");
      }
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      return true;
    }
  
    checkWinner() {
      const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
      ];
      return winningCombos.some(([a, b, c]) => 
        this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]
      );
    }
  }
  
  // Example usage:
  const game = new TicTacToe();
  game.printBoard();
  game.makeMove(0);
  game.makeMove(1);
  game.makeMove(4);
  game.makeMove(7);
  game.makeMove(8);
  game.printBoard();