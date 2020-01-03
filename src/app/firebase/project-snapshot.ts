export interface ProjectSnapshot {
    title: string;
    subtitle: string;
    descriptionHTML: string;
    links: CardLinkSnapshot[];
    priority: number;
    cardImage: CardImageSnapshot;
}

export interface CardLinkSnapshot {
    textHTML: string;
    href: string;
}

export interface CardImageSnapshot {
    type: string; // "url" or "html" or "youtube" or "twitter"
    url: string;
    html: string;
    alt: string;
    youtubeVideoId: string;

}
