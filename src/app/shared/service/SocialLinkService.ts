import { inject } from "@angular/core";
import { BaseService } from "../base/BaseService";
import { iSocialLink } from "../models/about";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class SocialLinkService {
  private baseService = inject(BaseService);
  private apiUrl = environment.apiUrl;

  getAllSocialLinkByUserId(id: number): Observable<iSocialLink[]> {
    // Il manque l'implémentation réelle – à corriger
    return this.baseService.get<iSocialLink[]>(`${this.apiUrl}/SocialLink/?utilisateur=${id}`);
  }
}