import { Typography, Grid, Container } from "@mui/material";
import React from "react";
import useProjects from "../api/data/useProjects";
import ProjectListItem from "../components/Project";

export default function Projects() {
  const { projects } = useProjects();
  return (
    <>
      <Container>
        <Typography variant="h4" mb={3} mt={3} id="projects">
          Projects
        </Typography>
        <Grid container spacing={2}>
          {projects
            ?.sort((p1, p2) => p2.time.toMillis() - p1.time.toMillis())
            .map((project) => (
              <Grid item sx={{ flex: "100%" }}>
                <ProjectListItem project={project} />
              </Grid>
            ))}
        </Grid>
      </Container>
    </>
  );
}
