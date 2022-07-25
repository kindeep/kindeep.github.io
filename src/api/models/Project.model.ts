import { Timestamp } from "firebase/firestore/lite";

export interface CardImage {
  url: string;
  type: "url" | "youtube" | "html";
  alt: string;
  youtubeVideoId: undefined | string;
  html: string;
}

export interface ProjectLink {
  href: string;
  textHTML: string;
}

export default interface Project {
  title: string;
  subtitle: string;
  descriptionHTML: string;
  links: ProjectLink[];
  time: Timestamp;
  cardImage: CardImage;
}