import { inject } from "@angular/core";
import { BaseService } from "../base/BaseService";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { iUser } from "../models/IUser";
import { environment } from "../../../environments/environment"; // ← Ajoute cette ligne

export interface ApiSocialLink {
  id?: number;
  nom: string;
  lien: string;
  utilisateur?: number;
}

@Injectable({ providedIn: "root" })
export class UserService {
  private baseService = inject(BaseService);
  private apiUrl = environment.apiUrl; // variable d'environnement

  getUser(id: number): Observable<iUser> {
    return this.baseService.get<iUser>(`${this.apiUrl}/Utilisateur/${id}/`);
  }

  getAllUsers(): Observable<any[]> {
    return this.baseService.get<any[]>(`${this.apiUrl}/Utilisateur/`);
  }

  getAllSocialLinkByUserId(id: number): Observable<ApiSocialLink[]> {
    return this.baseService.get<ApiSocialLink[]>(`${this.apiUrl}/SocialLink/${id}/`);
  }

  getUserProjects(userId: number): Observable<any[]> {
    return this.baseService.get<any[]>(`${this.apiUrl}/Projet/?utilisateur=${userId}`);
  }
}