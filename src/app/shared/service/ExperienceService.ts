import { inject } from "@angular/core";
import { BaseService } from "../base/BaseService";
import { iExperience } from "../models/IExperience";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:"root"
})

export class ExperienceService {


    private baseService = inject(BaseService);

    getAllExperienceByUserId(id:number): iExperience[]{
        return [] as iExperience[]
    }
      
}