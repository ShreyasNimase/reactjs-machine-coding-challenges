import { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);
    setIsXTurn(!isXTurn); // toggle turn
  };

  //check winner everytime when board updates
  useEffect(() => {
    const result = checkWinner(board);
    if (result) {
      setWinner(result);
    }
  }, [board]);

  //reset Game state
  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setWinner(null);
  }

  return (
    <div className="app-container">
      <div className="title">
        <h1>TIC-TAC-TOE</h1>
      </div>
      <div className="board-items">
        <Board board={board} handleClick={handleClick} />
      </div>
      <div className="info">
        {winner ? (
          <h2 style={{color:'green'}}>{winner === "draw" ? "Its Draw! " : `${winner} Wins!`}</h2>
        ) : (
          <h2>{isXTurn ? "X" : "O"}'s Turn</h2>
        )}
      </div>
      <div className="reset-btn">
        <button type="button" onClick={resetGame}>
          RESET
        </button>
      </div>
    </div>
  );
}

function checkWinner(board) {
  const lines = [
    [0, 1, 2], //r1
    [3, 4, 5], //r2
    [6, 7, 8], //r3
    [0, 3, 6], //c1
    [1, 4, 7], //c2
    [2, 5, 8], //c3
    [0, 4, 8], //d1
    [2, 4, 6], //d2
  ];

  for (let [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; //winner  X or O
    }
  }

  if (board.every(Boolean)) return "draw"; //all cells filled, no winner yet

  return null; //if no win & board not full - game is ongoing
}

export default App;
