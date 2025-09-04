import { useState } from "react";

let gameOver = false;

function App() {

  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [board, setBoard] = useState<(null | "X" | "O")[]>(Array(9).fill(null));
  
  
  const winConditions = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diagonals
];

  function handleCellClick(e: React.MouseEvent) {
    if(gameOver) return;

    const idx = (e.target as HTMLDivElement).dataset.index;

    if (idx !== undefined) {
      const index = parseInt(idx);
      if (board[index] === null) {
        board[index] = currentPlayer;
        setBoard([...board]);

        checkWin();
        switchPlayer();
      }
    }
  }

  function switchPlayer() {
    if (currentPlayer === "X")
      setCurrentPlayer("O")
    else
      setCurrentPlayer("X")

  }

  function checkWin(){
    for (let [a,b,c] of winConditions) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        document.getElementById("status")!.innerText = `Player ${board[a]} wins!`;
        gameOver = true;
        return;
      }
    }

    if(board.every(cell => cell !== null)){
      document.getElementById("status")!.innerText = `It's a draw!`;
      gameOver = true;
    } 
    else {
      document.getElementById("status")!.innerText = `Player ${currentPlayer === "X" ? "O" : "X"}'s turn`;
    }
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    gameOver = false;
    document.getElementById("status")!.innerText = `Player ${currentPlayer}'s turn`;
    
  }


  return (
    <>
      <h1>Tic-Tac-Toe</h1>
      <div id="status">Player {currentPlayer}'s turn</div>
      <div id="board" className="board">


        
        {
          // Render the board cells here
          board.map((cell, idx) => {
            return <div key={idx} onClick={handleCellClick} className="cell" data-index={idx}>{cell}</div>
          })
        }

      </div>
      <button id="reset" onClick={resetGame}>Reset Game</button>
    </>
  )
}

export default App
