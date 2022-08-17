import React, { createRef } from "react";
import { useEffect } from "react";
import startGame from "@kindeep/tictactoe";
import { Card, CardHeader, CardMedia } from "@mui/material";

export default function TicTacToe() {
  const canvasRef = createRef<HTMLCanvasElement>();

  useEffect(() => {
    canvasRef.current && startGame(canvasRef.current);
  }, [canvasRef]);

  return (
    <>
      <Card variant="outlined">
        <CardHeader title="Tic Tac Toe" />
        <CardMedia component="canvas" ref={canvasRef} className="game-canvas" />
      </Card>{" "}
    </>
  );
}
