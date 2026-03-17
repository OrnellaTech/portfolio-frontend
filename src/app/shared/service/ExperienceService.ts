import { inject } from "@angular/core";
import { BaseService } from "../base/BaseService";
import { iExperience } from "../models/IExperience";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: "root" })
export class ExperienceService {
  private baseService = inject(BaseService);
  private apiUrl = environment.apiUrl;

  getAllExperienceByUserId(id: number): Observable<iExperience[]> {
    return this.baseService.get<iExperience[]>(`${this.apiUrl}/Experience/?utilisateur=${id}`);
  }
}