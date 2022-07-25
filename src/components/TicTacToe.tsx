import React, {createRef} from 'react';
import { useEffect } from 'react';
import startGame from '@kindeep/tictactoe';

export default function TicTacToe() {
    const canvasRef = createRef<HTMLCanvasElement>();

    useEffect(() => {
        canvasRef.current && startGame(canvasRef.current);
    },[canvasRef])

    return <> 
    <canvas ref={canvasRef} className="game-canvas">TicTacToe</canvas>
    </>
}