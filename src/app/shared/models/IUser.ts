export interface iUser {
    nom: string,
    prenom : string,
    photo_profil: string,
    photo_intro : string,
    description : string, 
    age : number,
    email: string,
    telephone : string, 
    lien_cv : string,
     skills_fk?: Array<{
        id?: number;
        label: string;
        value: string;
    }>;
    copyright_author?: string;
    sociallinks?: Array<{
        id?: number;
        nom: string;
        lien: string;
    }>;
    // Ajoute d'autres relations si nécessaire
    projets?: any[];
    experiences?: any[];
    services?: any[];
    titles?: string[]; // Ajout d'un champ pour les titres
    titles_text?: string; // Optionnel : si les titres sont fournis sous forme de texte
}