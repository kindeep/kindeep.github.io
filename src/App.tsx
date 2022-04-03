import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button, Link } from "@mui/material";
import {
  Link as RouterLink,
  useLocation,
  Route,
  Routes,
} from "react-router-dom";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import AboutHeader from "./components/AboutHeader";
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

/* Vision: animated item change, collapsible if not enough space, expands vertically when no space,
 maybe even animates to bottom of screen when small */
function Navbar() {
  const { pathname } = useLocation();

  const scrolled = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const homePath = pathname === "/";

  return (
    <Container
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        pt: 2,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Box
          sx={{
            flexGrow: 1,
            pr: 3,
            display: { xs: "none", md: "block" },
          }}
        >
          {homePath && (
            <>
              <Box sx={{ visibility: scrolled ? "hidden" : "block" }}>
                <AboutHeader />
              </Box>
            </>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // justifyContent: "center",
            // alignItems: "center",
          }}
        >
          <div>
            <Typography noWrap>
              <Box
                sx={{
                  bgcolor: "primary.main",
                  borderRadius: 6,
                  p: 2,
                  flexGrow: 1,
                  display: "flex",
                }}
              >
                <Button
                  sx={{
                    mx: 1,
                    color: "primary.contrastText",
                    display: homePath ? "none" : "block",
                  }}
                  component={RouterLink}
                  to="/"
                >
                  Home
                </Button>
                <Button
                  sx={{ mx: 1, color: "primary.contrastText" }}
                  component={RouterLink}
                  to="/contact"
                >
                  Contact
                </Button>
                <Button
                  sx={{ mx: 1, color: "primary.contrastText" }}
                  component={RouterLink}
                  to="/projects"
                >
                  Projects
                </Button>
                <Button
                  sx={{ mx: 1, color: "primary.contrastText" }}
                  component={RouterLink}
                  to="/games"
                >
                  Games
                </Button>
              </Box>
            </Typography>
          </div>
        </Box>
      </Box>
    </Container>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <Box sx={{ height: 120 }}></Box>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="contact" element={<Contact />} />
        <Route path="games" element={<>Games</>} />
        <Route path="projects" element={<>Projects</>} />
      </Routes>
    </>
  );
}
