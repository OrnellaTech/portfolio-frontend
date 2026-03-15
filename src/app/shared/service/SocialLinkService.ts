import { inject } from "@angular/core";
import { BaseService } from "../base/BaseService";
import { iSocialLink } from "../models/about";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:"root"
})

export class SocialLinkService {

    private baseService = inject(BaseService);
    // Récupérer les liens sociaux d'un utilisateur
    getAllSocialLinkByUserId(id:number): iSocialLink[]{
        return [] as iSocialLink[]
    }
      
}