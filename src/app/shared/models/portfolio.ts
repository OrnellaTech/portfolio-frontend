export interface iPortofolio {
    intro : string;
    projects?: iProject[];
}

export interface iProject {
    title: string;
    tools: string[];
    description: string;
    imageUrl: string;
    projectUrl?: string;
    role?: string;
    category?: string;
    note?: string;
    githubUrl?: string;
    mediaType?: 'video' | 'image' | 'gallery';
    mediaUrl?: string; // URL de la vidéo ou des images pour la galerie
    gallery?: string[];
}