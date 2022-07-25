import React, {createRef} from 'react';
import { useEffect } from 'react';
import startGame from '@kindeep/flappy-aves';

export default function Flappy() {
    const canvasRef = createRef<HTMLCanvasElement>();

    useEffect(() => {
        canvasRef.current && startGame(canvasRef.current);
    },[canvasRef])

    return <> 
    I flappy
    <canvas ref={canvasRef}>Ooooo flappy</canvas>
    </>
}