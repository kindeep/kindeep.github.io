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
  const { pathname } = useLocation();

  const homePath = pathname === "/";

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {homePath && (
          <>
            <Typography>
              I'm <b>Kindeep Singh Kargil</b>, a Software Engineer in Toronto
              specializing in Full-Stack Development.
            </Typography>

            <Link component={RouterLink} to="/contact">
              Connect
            </Link>
          </>
        )}
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
          <Typography noWrap>
            <Box
              sx={{
                bgcolor: "primary.main",
                borderRadius: 6,
                mx: 3,
                my: 2,
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
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<>Home</>} />
        <Route path="contact" element={<Contact />} />
        <Route path="games" element={<>Games</>} />
        <Route path="projects" element={<>Projects</>} />
      </Routes>
    </>
  );
}
