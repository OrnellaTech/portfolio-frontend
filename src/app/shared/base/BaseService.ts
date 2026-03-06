import { HttpClient } from "@angular/common/http";  
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn:"root"
})
export class BaseService {

    constructor(private http: HttpClient) {}

    save<T>(url: string, data: any): Observable<T> {
        return this.http.post<T>(url, data);
    }

    get<T>(url: string): Observable<T> {
        return this.http.get<T>(url);
    }

    // PUT générique
    update<T>(url: string, data: any): Observable<T> {
        return this.http.put<T>(url, data);
    }

    // DELETE générique
    delete<T>(url: string): Observable<T> {
        return this.http.delete<T>(url);
    }
    
}
//  maniere de faire une injection soit par le constructeur soit par un attribut privé