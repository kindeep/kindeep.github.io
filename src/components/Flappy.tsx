import React, { createRef } from "react";
import { useEffect } from "react";
import startGame from "@kindeep/flappy-aves";
import Card from "@mui/material/Card";
import { CardHeader, CardMedia } from "@mui/material";

export default function Flappy() {
  const canvasRef = createRef<HTMLCanvasElement>();

  useEffect(() => {
    canvasRef.current && startGame(canvasRef.current);
  }, [canvasRef]);

  return (
    <>
      <Card variant="outlined">
        <CardHeader title="Flappy Aves" />
        <CardMedia component="canvas" ref={canvasRef} className="game-canvas" />
      </Card>
    </>
  );
}
