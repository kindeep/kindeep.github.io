import { Box, Container, Grid, Link, Typography, Button, List, ListItemButton, ListItemIcon, ListItemText, Card, CardHeader, ListSubheader } from "@mui/material";
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
import { Link as RouterLink } from 'react-router-dom';
import ArrowRight from '@mui/icons-material/ArrowForwardIos';
import { grey } from '@mui/material/colors';

export default function Home() {
  return (
    <>
      <Container>
        <Typography variant="h2" mt={8} >
          Hi👋, I'm Kindeep.
        </Typography>
        <Typography variant="h5" mt={2} color={grey[600]}>
          A Software Engineer in Toronto.
        </Typography>

        <Box mt={6} sx={{ backgroundColor: "primary.light", overflow: "hidden", pl: 2, color: "primary.contrastText", borderRadius: 2, display: "inline-flex", alignItems: "center" }}>
          <ArrowRight />
          <Box sx={{ backgroundColor: "primary.main", px: 3, ml: 2 }}>

            <Link to="/projects" sx={{ py: 2, pr: 4, display: "inline-block" }} component={RouterLink} variant="h5" color="inherit">Projects</Link>

            <Link to="/games" component={RouterLink} variant="h5" color="inherit">Games</Link>
          </Box>
        </Box>

        <Box mt={20}>
          <Card variant="outlined" >
            <List subheader={
              <ListSubheader>Get in touch</ListSubheader>
            }>
              <ListItemButton component="a" href="mailto:me@kindeep.me">
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText>
                  me@kindeep.me
                </ListItemText>
              </ListItemButton>
              
              <ListItemButton>
                <ListItemIcon>
                  <LinkedInIcon />
                </ListItemIcon>
                <ListItemText>
                  Linkedin
                </ListItemText>
              </ListItemButton>
            </List>
            <List subheader={
              <ListSubheader>Other Links</ListSubheader>
            }>
           <ListItemButton component="a"
                href="https://www.github.com/kindeep">
                <ListItemIcon>
                  <GitHubIcon />
                </ListItemIcon>
                <ListItemText>
                  GitHub
                </ListItemText>
              </ListItemButton>
            </List>
          </Card>
        </Box>

      </Container>
    </>
  );
}
