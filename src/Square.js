import React from 'react';

export default function Square({ value, onClick, isWinning }) {
    return (
        <button 
            className={`square ${isWinning ? 'winning' : ''}`}  //Adauga stylingul daca isWinning e true.
            onClick={onClick}
        >
            {value}
        </button>
    );
}