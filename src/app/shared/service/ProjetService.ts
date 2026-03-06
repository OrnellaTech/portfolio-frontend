
import { BaseService } from "../base/BaseService";
import { inject, Injectable } from "@angular/core";
import { iProjet } from "../models/IProjet";

@Injectable({
    providedIn:"root"
})

export class ProjetService {

    private baseService = inject(BaseService);


    getAllProjetById(id:number): iProjet{
        return {} as iProjet
    }
      
}