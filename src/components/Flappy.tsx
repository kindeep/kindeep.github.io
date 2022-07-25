import React, {createRef} from 'react';
import { useEffect } from 'react';
import startGame from '@kindeep/flappy-aves';

export default function Flappy() {
    const canvasRef = createRef<HTMLCanvasElement>();

    useEffect(() => {
        canvasRef.current && startGame(canvasRef.current);
    },[canvasRef])

    return <> 
    
    <canvas ref={canvasRef} className="game-canvas">Ooooo flappy</canvas>
    </>
}