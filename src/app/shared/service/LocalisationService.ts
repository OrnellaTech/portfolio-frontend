import { inject } from "@angular/core";
import { BaseService } from "../base/BaseService";
import { iLocalisation } from "../models/ILocalisation";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: "root" })
export class LocalisationService {
  private baseService = inject(BaseService);
  private apiUrl = environment.apiUrl;

  getLocalisationByUserId(userId: number): Observable<iLocalisation> {
    return new Observable(observer => {
      this.baseService.get<any[]>(`${this.apiUrl}/Localisation/?utilisateur=${userId}`)
        .subscribe({
          next: (response) => {
            console.log('Localisation API response:', response);
            let loc = (Array.isArray(response) && response.length > 0) ? response[0] : null;
            observer.next({
              pays: loc?.pays || 'Côte d\'Ivoire',
              ville: loc?.ville || 'Grand-Bassam',
              longitude: loc?.longitude || 0,
              latitude: loc?.latitude || 0,
              quartier: loc?.quartier || ''
            });
            observer.complete();
          },
          error: (err) => {
            console.error('Erreur localisation:', err);
            observer.next({
              pays: 'Côte d\'Ivoire',
              ville: 'Grand-Bassam',
              longitude: 0,
              latitude: 0,
              quartier: ''
            });
            observer.complete();
          }
        });
    });
  }
}