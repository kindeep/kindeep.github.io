import React from "react";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import { Box, IconButton, Link } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function AboutHeader() {
  return (
    <>
      <Box sx={{}}>
        {/* <Box
          sx={{
            backgroundColor: "primary.light",
            position: "absolute",
            top: 0,
            left: 0,
            height: 100,
            width: "100%",
            zIndex: -1
          }}
        /> */}
        <Typography variant="h4">Kindeep Singh Kargil</Typography>
        <Box mt={1}>
          <IconButton
            edge="start"
            component="a"
            href="https://www.linkedin.com/in/kindeep"
            color="inherit"
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton
            component="a"
            href="https://www.github.com/kindeep"
            color="inherit"
          >
            <GitHubIcon />
          </IconButton>
          <IconButton component="a" href="mailto:me@kindeep.me" color="inherit">
            <EmailIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  );
}
