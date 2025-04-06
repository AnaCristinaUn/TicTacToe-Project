import React from 'react';
import Square from './Square';

export default function Board({ xIsNext, squares, onPlay }) {

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return { winner: squares[a], line: [a, b, c] }; // Am editat codul pentru a returna un obiect care contine X sau O (bazat pe cine a castigat) si linia de castig.
            }
        }
        return null;
    };
   
    const handleClick = (i) => {
        if (squares[i]) return;
        const nextSquares = squares.slice();
        const winner = calculateWinner(squares);
        if (winner || nextSquares[i]) return; 
        
        nextSquares[i] = xIsNext ? 'X' : 'O'; 
        onPlay(nextSquares);  
    };

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner: " + winner.winner; 
      } else if (squares.every(square => square !== null)) { 
        status = "Game ended in a draw!"; // Am adaugat un mesaj care sa arate cand este egalitate (no more spaces and no winner).
      } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
      }

    const renderSquare = (i) => {
        return(
            <Square
                value={squares[i]} 
                onClick={() => handleClick(i)} 
                isWinning={winner && winner.line.includes(i)} 
                />
        );
    };//Primeste indexul i al patratului. Value={squares[i]} valorea patratului (x,o, null).
    // Verifica daca exista un winner, daca da aceseaza proprietatea line din obj winner.
    //isWinning este true doar pentru partatele winner.
    //In css  isWinning are cod pentru a colora patratul resp.
    //Pentru a arata linia castigatoare si a o colora.
    //Mai usor asa decat sa verific la fiecare in parte manual.
    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                {renderSquare(0)} 
                {renderSquare(1)}
                {renderSquare(2)}
            </div> 
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </>
    );
}


