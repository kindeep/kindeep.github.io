import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import AboutHeader from "../components/AboutHeader";
import Flappy from "../components/Flappy";
import Projects from "./Projects";
import { IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import TicTacToe from '../components/TicTacToe';

export default function Home() {
  return (
    <>
      <Container>
        {/* <Box sx={{ display: { xs: "block", md: "none" }, pb: 3 }}>
          <AboutHeader />
        </Box> */}
        <Typography variant="h4" mt={4}>Kindeep Singh Kargil</Typography>
        <Typography variant="subtitle1">Software Engineer</Typography>
        <div>
        <IconButton edge="start" component="a" href="https://www.linkedin.com/in/kindeep"><LinkedInIcon/></IconButton>
        <IconButton component="a" href="https://www.github.com/kindeep"><GitHubIcon/></IconButton>
        <IconButton component="a" href="mailto:me@kindeep.me"><EmailIcon/></IconButton>
        </div>
        <Typography variant="h4" mb={3} mt={3}>Games</Typography>


        <Grid container spacing={2}>
          <Grid item md={6}>
            <Flappy/>
          </Grid>          
          <Grid item md={6}>
            <TicTacToe/>
          </Grid>
        </Grid>

        <Typography variant="h4" mb={3} mt={3}>Projects</Typography>
        <Projects/>
      </Container>
    </>
  );
}
