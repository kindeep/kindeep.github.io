import TicTacToe from "../components/TicTacToe";
import { Grid } from "@mui/material";
import React from "react";
import Flappy from "../components/Flappy";

export default function Games() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={6} sx={{ flexShrink: 0 }}>
        <Flappy />
      </Grid>
      <Grid item xs={12} sm={12} md={6} sx={{ flexShrink: 0 }}>
        <TicTacToe />
      </Grid>
    </Grid>
  );
}
