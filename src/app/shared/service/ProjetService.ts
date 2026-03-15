
import { BaseService } from "../base/BaseService";
import { inject, Injectable } from "@angular/core";
import { iProjet } from "../models/IProjet";

@Injectable({
    providedIn:"root"
})

export class ProjetService {

    // Injection du BaseService pour faire les appels API
    private baseService = inject(BaseService);

    // Récupérer les projets d'un utilisateur
    getAllProjetById(id:number): iProjet{
        return {} as iProjet
    }
      
}