import {
  Box,
  Container,
  Grid,
  Link,
  Typography,
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Card,
  CardHeader,
  ListSubheader,
} from "@mui/material";
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
import { Link as RouterLink } from "react-router-dom";
import ArrowRight from "@mui/icons-material/ArrowForwardIos";
import { grey } from "@mui/material/colors";
import Div100vh from "react-div-100vh";

export default function Home() {
  return (
    <Div100vh className="blob-container">
      <div className="shape-blob"></div>
      <div className="shape-blob one"></div>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Typography variant="h2" mt={0}>
          Hey👋, it's Kindeep!
        </Typography>
        <Typography variant="h5" mt={2} color={grey[600]}>
          I'm a Software Engineer.
        </Typography>

        <Box
          mt={4}
          sx={{
            backgroundColor: "primary.light",
            overflow: "hidden",
            pl: 2,
            color: "primary.contrastText",
            borderRadius: 2,
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          <ArrowRight />
          <Box sx={{ backgroundColor: "primary.main", px: 3, ml: 2 }}>
            <Link
              to="/projects"
              sx={{ py: 2, pr: 4, display: "inline-block" }}
              component={RouterLink}
              variant="h5"
              color="inherit"
            >
              Projects
            </Link>

            <Link
              to="/games"
              component={RouterLink}
              variant="h5"
              color="inherit"
            >
              Games
            </Link>
          </Box>
        </Box>

        <Box mt={5}>
          <Card variant="outlined">
            <List subheader={<ListSubheader>Quick Links</ListSubheader>}>
              <ListItemButton component="a" href="mailto:me@kindeep.me">
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText>me@kindeep.me</ListItemText>
              </ListItemButton>

              <ListItemButton
                component="a"
                href="https://www.linkedin.com/in/kindeep"
              >
                <ListItemIcon>
                  <LinkedInIcon />
                </ListItemIcon>
                <ListItemText>Linkedin</ListItemText>
              </ListItemButton>
              <ListItemButton
                component="a"
                href="https://www.github.com/kindeep"
              >
                <ListItemIcon>
                  <GitHubIcon />
                </ListItemIcon>
                <ListItemText>GitHub</ListItemText>
              </ListItemButton>
            </List>
          </Card>
        </Box>
      </Container>
    </Div100vh>
  );
}
