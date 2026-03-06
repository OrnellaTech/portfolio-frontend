import { inject } from "@angular/core";
import { BaseService } from "../base/BaseService";
import { Injectable } from "@angular/core";
import { iOffer } from "../models/IOffer";
import { Observable } from "rxjs";

@Injectable({
    providedIn:"root"
})

export class OfferService {

     private baseService = inject(BaseService);


     // Récupérer les services d'un utilisateur depuis l'API
    getAllOfferByUserId(userId: number): Observable<any[]> {
        return this.baseService.get<any[]>(`http://127.0.0.1:8000/api/Service/?utilisateur=${userId}`);
    }
      
}