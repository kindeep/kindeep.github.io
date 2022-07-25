import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ProjectModel from "../api/models/Project.model";

interface PropTypes {
  project: ProjectModel;
}

const YoutubeEmbed = ({ embedId }: { embedId: string }) => (
  <CardMedia
    sx={{
      position: "relative",
      height: 350,
    }}
  >
    <Box
      component="iframe"
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: "100%",
        height: "100%",
      }}
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </CardMedia>
);

export default function ProjectListItem({ project }: PropTypes) {
  const date = project.time.toDate().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <>
      <Card variant="outlined">
        <CardContent sx={{ paddingBottom: 0 }}>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
          >
            {date}
          </Typography>
        </CardContent>
        <CardHeader title={project.title} subheader={project.subtitle} />
        {project.cardImage?.type === "url" && (
          <CardMedia
            component="img"
            image={project.cardImage.url}
            alt={project.cardImage.alt}
            sx={{
              filter: "brightness(95%)",
              maxHeight: 350,
              objectFit: "contain",
              backgroundColor: "#eee",
            }}
          ></CardMedia>
        )}
        {project.cardImage?.type === "youtube" &&
          project.cardImage.youtubeVideoId && (
            <YoutubeEmbed embedId={project.cardImage.youtubeVideoId} />
          )}
        <CardContent
          sx={{
            "& p:first-child": {
              marginTop: 0,
            },
            "& p:last-child": {
              marginBottom: 0,
            },
          }}
          dangerouslySetInnerHTML={{ __html: project.descriptionHTML }}
        ></CardContent>
        <CardActions>
          {project.links.map((link) => (
            <Button component="a" size="small" href={link.href}>
              {link.textHTML}
            </Button>
          ))}
        </CardActions>
      </Card>
    </>
  );
}
