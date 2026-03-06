// shared/service/PriseContactService.ts
import { inject } from "@angular/core";
import { BaseService } from "../base/BaseService";
import { iPriseContact } from "../models/IPriseContact";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn:"root"
})
export class PriseContactService {
    private baseService = inject(BaseService);
    private apiUrl = 'http://127.0.0.1:8000/api';

    // Sauvegarder une prise de contact pour un utilisateur spécifique
    savePriseContact(userId: number, contactData: iPriseContact): Observable<any> {
        const data = {
            ...contactData,
            utilisateur: userId  // Associer le message à l'utilisateur
        };
        return this.baseService.save<any>(`${this.apiUrl}/PriseContact/`, data);
    }
}