import React from "react";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";

export default function AboutHeader() {
  return (
    <>
      <Typography>
        I'm <b>Kindeep</b>, a Software Engineer in Toronto
        specializing in Full-Stack Development.
      </Typography>

      <Link component={RouterLink} to="/contact">
        Connect
      </Link>
    </>
  );
}
