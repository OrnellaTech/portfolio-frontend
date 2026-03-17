import { inject } from "@angular/core";
import { BaseService } from "../base/BaseService";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: "root" })
export class OfferService {
  private baseService = inject(BaseService);
  private apiUrl = environment.apiUrl;

  getAllOfferByUserId(userId: number): Observable<any[]> {
    return this.baseService.get<any[]>(`${this.apiUrl}/Service/?utilisateur=${userId}`);
  }
}