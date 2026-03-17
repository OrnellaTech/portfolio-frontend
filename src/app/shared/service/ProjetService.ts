
import { BaseService } from "../base/BaseService";
import { inject, Injectable } from "@angular/core";
import { iProjet } from "../models/IProjet";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class ProjetService {
  private baseService = inject(BaseService);
  private apiUrl = environment.apiUrl;

  getAllProjetById(id: number): Observable<iProjet[]> {
    return this.baseService.get<iProjet[]>(`${this.apiUrl}/Projet/?utilisateur=${id}`);
  }
}