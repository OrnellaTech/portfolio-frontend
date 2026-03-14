import { inject } from "@angular/core";
import { BaseService } from "../base/BaseService";
import { iSocialLink } from "../models/about";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { iUser } from "../models/IUser";

// Définis le type directement dans le service
export interface ApiSocialLink {
  id?: number;
  nom: string;
  lien: string;
  utilisateur?: number;
}

@Injectable({
    providedIn:"root"
})

export class UserService {

    private baseService = inject(BaseService);

      // Récupérer l'utilisateur complet depuis le back
  getUser(id: number): Observable<iUser> {
    return this.baseService.get<iUser>(`http://127.0.0.1:8000/api/Utilisateur/${id}/`);
  }

  //Récupérer tout les utilisateurs
  getAllUsers(): Observable<any[]>{
    return this.baseService.get<any[]>('http://127.0.0.1:8000/api/Utilisateur/');
  }

   // Utilise ApiSocialLink ici, pas iSocialLink
    getAllSocialLinkByUserId(id: number): Observable<ApiSocialLink[]> {
        return this.baseService.get<ApiSocialLink[]>(`http://127.0.0.1:8000/api/SocialLink/${id}/`);
    }

  // shared/service/UserService.ts
 getUserProjects(userId: number): Observable<any[]> {
        return this.baseService.get<any[]>(`http://127.0.0.1:8000/api/Projet/?utilisateur=${userId}`);
    }

    
      
}