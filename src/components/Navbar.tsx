import * as React from "react";
import Typography from "@mui/material/Typography";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button, Link } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";

import AboutHeader from "./AboutHeader";

function NavItem({ name, to }: any) {
  const { pathname } = useLocation();

  const selected = pathname.includes(to);

  return (
    <>
      <Link
        to={to}
        sx={{
          px: 2,
          display: "inline-block",
          opacity: 0.8,
          textDecoration: "none",
          ":hover": {
            opacity: 1,
          },
          "&": selected
            ? {
                textDecoration: "underline",
              }
            : {},
        }}
        component={RouterLink}
        variant="h5"
        color="inherit"
      >
        {name}
      </Link>
    </>
  );
}

/* Vision: animated item change, collapsible if not enough space, expands vertically when no space,
 maybe even animates to bottom of screen when small */
export default function Navbar() {
  const { pathname } = useLocation();

  const scrolled = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const homePath = pathname === "/";

  return (
    <>
      {!homePath && (
        <>
          <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              pt: 2,
              pb: 2,
              zIndex: 2,
              color: "primary.contrastText",
              backgroundColor: !scrolled ? "primary.main" : "",
            }}
          >
            <Container>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: !scrolled
                    ? {
                        xs: "column",
                        sm: "row",
                      }
                    : "row",
                }}
              >
                <Box
                  sx={{
                    flexShrink: 1,
                    minWidth: 0,
                    minHeight: 0,
                    pr: 3,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      visibility: !scrolled ? "block" : "hidden",
                    }}
                  >
                    <AboutHeader />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    "&": !scrolled
                      ? {
                          justifyContent: "center",
                          alignItems: "flex-end",
                        }
                      : "",
                  }}
                >
                  <div>
                    {/* <Typography noWrap> */}
                    <Box
                      sx={{
                        backgroundColor: "primary.main",
                        borderRadius: 6,
                        p: scrolled
                          ? 2
                          : {
                              xs: 0,
                              sm: 2,
                            },
                        pt: scrolled
                          ? {}
                          : {
                              xs: 2,
                            },
                        flexGrow: 1,
                        display: "flex",
                      }}
                    >
                      <NavItem name="Home" to="/home" />
                      <NavItem name="Projects" to="/projects" />
                      <NavItem name="Games" to="/games" />
                      {/* <Button
                        sx={{
                          mx: 1,
                          color: "primary.contrastText",
                          display: homePath ? "none" : "block",
                        }}
                        component={RouterLink}
                        to="/"
                      >
                        Home
                      </Button> */}
                      {/* <Button
                  sx={{ mx: 1, color: "primary.contrastText" }}
                  component={RouterLink}
                  to="/contact"
                >
                  Contact
                </Button> */}
                      {/* <Button
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
                      </Button> */}
                    </Box>
                    {/* </Typography> */}
                  </div>
                </Box>
              </Box>
            </Container>
          </Box>
          <Box sx={{ height: 120 }}></Box>
        </>
      )}
    </>
  );
}
