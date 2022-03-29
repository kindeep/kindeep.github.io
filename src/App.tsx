import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";

interface Props {
  children: React.ReactElement;
}

function ElevationScroll(props: Props) {
  const { children } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

function Navbar() {
  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ flexGrow: 0, p: 3 }}>
        <Typography>
          I'm <b>Kindeep Singh Kargil</b>, a Software Engineer in Toronto
          specializing in Full-Stack Development.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <Box
            sx={{
              bgcolor: "primary.main",
              borderRadius: 6,
              mx: 3,
              p: 2,
              flexGrow: 1,
              display: "flex",
            }}
          >
            <Typography noWrap>
              <Button sx={{ mx: 1, color: "primary.contrastText" }}>
                About Me
              </Button>
              <Button sx={{ mx: 1, color: "primary.contrastText" }}>
                Projects
              </Button>
              <Button sx={{ mx: 1, color: "primary.contrastText" }}>
                Games
              </Button>
            </Typography>
          </Box>
        </div>
      </Box>
    </Box>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
    </>
  );
}
