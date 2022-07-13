import React, { useEffect, useState } from 'react';
import './App.css';
import BoardComponent from './component/BoardComponent';
import LostFigure from './component/LostFigure';
import Timer from './component/Timer';
import { Board } from './models/Board';
import { Colors } from './models/Colors';
import { Player } from './models/Players';

function App() {
  const [board, setBoard] = useState( new Board)
  const [whitePlayer , setWhitePlayer] = useState(new Player(Colors.WHITE))
  const [blackPlayer , setBlackPlayer] = useState(new Player(Colors.BLACK))
  const[currentPlayer, setCurrentPlayer] = useState<Player | null>(null)
  useEffect(() => {
    restart()
    setCurrentPlayer(whitePlayer)
  } , [])

  function restart(){
    const newBoard = new Board()
    newBoard.initCells()
    newBoard.addFigure()
    setBoard(newBoard)
  }

  function swapPlayer(){
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
  }

  return (
    <div className="App">
      <Timer
        restart={restart}
        currentPlayer = {currentPlayer}
      />
      <BoardComponent
        board={board}
        setBoard ={setBoard}
        currentPlayer = {currentPlayer}
        swapPlayer = {swapPlayer}
      />

      <div>
        <LostFigure 
        title='Черные фигуры' 
        figures = {board.lostBlackFigure}/>
        <LostFigure 
        title='Белые фигуры' 
        figures = {board.lostWhiteFigure}/>
      </div>
    </div>
  );
}

export default App;
