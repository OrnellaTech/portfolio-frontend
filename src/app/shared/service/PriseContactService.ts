import { inject } from "@angular/core";
import { BaseService } from "../base/BaseService";
import { iPriseContact } from "../models/IPriseContact";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: "root" })
export class PriseContactService {
  private baseService = inject(BaseService);
  private apiUrl = environment.apiUrl;

  savePriseContact(userId: number, contactData: iPriseContact): Observable<any> {
    const data = { ...contactData, utilisateur: userId };
    return this.baseService.save<any>(`${this.apiUrl}/PriseContact/`, data);
  }
}