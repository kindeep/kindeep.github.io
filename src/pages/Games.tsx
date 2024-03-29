import TicTacToe from "../components/TicTacToe";
import { Grid, Container, Typography } from "@mui/material";
import React from "react";
import Flappy from "../components/Flappy";

export default function Games() {
  return (
    <>
      <Container>
        <Typography variant="h4" mb={1} mt={3}>
          Games
        </Typography>
        <Typography variant="subtitle1" mb={3} color="">
          Here are some browser games you can play while here! I built them while learning JavaScript, they're hence admittedly not very polished.
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} sx={{ flexShrink: 0 }}>
            <Flappy />
          </Grid>
          <Grid item xs={12} sm={12} md={6} sx={{ flexShrink: 0 }}>
            <TicTacToe />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
