export interface iOffer {
    intro : string;
    item? : iItem[];
}

export interface iItem {
    nom: string;
    detail: string;
}