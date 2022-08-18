import * as React from "react";
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
  Navigate,
} from "react-router-dom";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import AboutHeader from "./components/AboutHeader";
import Projects from "./pages/Projects";
import Games from "./pages/Games";
import "./App.css";
import Navbar from "./components/Navbar";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ef9a9a',
    },
    secondary: {
      main: '#b2ebf2',
    }, 
  },
});

function Footer() {
  return (
    <>
      <Box
        sx={{
          // height: 50,
        }}
      ></Box>
    </>
  );
}

// TODO: Add homepage and projects page
export default function App() {
  return (
    <>
      <ThemeProvider theme={theme} >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="contact" element={<Contact />} /> */}
          <Route path="games" element={<Games />} />
          <Route path="projects" element={<Projects />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </ThemeProvider>

    </>
  );
}
