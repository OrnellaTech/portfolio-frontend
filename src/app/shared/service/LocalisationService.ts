// shared/service/LocalisationService.ts
import { inject } from "@angular/core";
import { BaseService } from "../base/BaseService";
import { iLocalisation } from "../models/ILocalisation";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn:"root"
})
export class LocalisationService {
    private baseService = inject(BaseService);
    private apiUrl = 'http://127.0.0.1:8000/api';

    // Récupérer la localisation d'un utilisateur
    getLocalisationByUserId(userId: number): Observable<iLocalisation> {
        return new Observable(observer => {
            this.baseService.get<any[]>(`${this.apiUrl}/Localisation/?utilisateur=${userId}`)
                .subscribe({
                    next: (response) => {
                        console.log('Localisation API response:', response);
                        
                        if (Array.isArray(response) && response.length > 0) {
                            const loc = response[0];
                            observer.next({
                                pays: loc.pays || 'Côte d\'Ivoire',
                                ville: loc.ville || 'Grand-Bassam',
                                longitude: loc.longitude || 0,
                                latitude: loc.latitude || 0,
                                quartier: loc.quartier || ''
                            });
                        } else {
                            observer.next({
                                pays: 'Côte d\'Ivoire',
                                ville: 'Grand-Bassam',
                                longitude: 0,
                                latitude: 0,
                                quartier: ''
                            });
                        }
                        observer.complete();
                    },
                    error: (err) => {
                        console.error('Erreur localisation:', err);
                        observer.error(err);
                    }
                });
        });
    }
}