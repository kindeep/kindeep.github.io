import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import AboutHeader from "../components/AboutHeader";
import Flappy from "../components/Flappy";
import Projects from "./Projects";
import { IconButton } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import TicTacToe from "../components/TicTacToe";
import Games from "./Games";

export default function Home() {
  return (
    <>
      <Container>
        {/* <Box sx={{ display: { xs: "block", md: "none" }, pb: 3 }}>
          <AboutHeader />
        </Box> */}
        <Typography variant="h4" mt={4} mb={1}>
          Kindeep Singh Kargil
        </Typography>
        <Typography variant="subtitle1">Software Engineer</Typography>
        <Box mt={1}>
          <IconButton
            edge="start"
            component="a"
            href="https://www.linkedin.com/in/kindeep"
            
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton component="a" href="https://www.github.com/kindeep">
            <GitHubIcon />
          </IconButton>
          <IconButton component="a" href="mailto:me@kindeep.me">
            <EmailIcon />
          </IconButton>
        </Box>
        <Typography variant="h4" mb={1} mt={3}>
          Games
        </Typography>
        <Typography variant="subtitle1" mb={3} color="">
          Some browser games to play while you're here
        </Typography>
        <Games />

        <Typography variant="h4" mb={3} mt={3} id="projects">
          Projects
        </Typography>
        <Projects />
      </Container>
    </>
  );
}
