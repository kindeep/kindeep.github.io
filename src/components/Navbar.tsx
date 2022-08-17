import * as React from "react";
import Typography from "@mui/material/Typography";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";

import AboutHeader from "./AboutHeader";

/* Vision: animated item change, collapsible if not enough space, expands vertically when no space,
 maybe even animates to bottom of screen when small */
export default function Navbar() {
  const { pathname } = useLocation();

  const scrolled = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const homePath = pathname === "/";

  const thing = !homePath && !scrolled;

  return (
    <Container
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        pt: 2,
        pb: 2,
        zIndex: 2,
        backgroundColor: thing ? "primary.main" : "",
        color: "primary.contrastText",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            pr: 3,
          }}
        >
          <>
            <Box sx={{ visibility: thing ? "block" : "hidden" }}>
              <AboutHeader />
            </Box>
          </>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            "&": thing
              ? {
                  justifyContent: "center",
                  alignItems: "center",
                }
              : "",
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
                {/* <Button
                  sx={{ mx: 1, color: "primary.contrastText" }}
                  component={RouterLink}
                  to="/contact"
                >
                  Contact
                </Button> */}
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
