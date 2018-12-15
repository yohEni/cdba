import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TvaSrvService {

  constructor(private http: HttpClient) { }

  /**
    * Retourne la tva
    * @param idTva id de la tva
    */
   public getTva(idTva: string): Observable<JSON> {
    return this.http.get<JSON>(`http://localhost:3000/tva/${idTva}`);
  }

  /**
    * Retourne la tva active
    */
   public getTvaActive(): Observable<JSON> {
    return this.http.get<JSON>(`http://localhost:3000/tva/active`);
  }

  /**
    * Retourne toutes les tva
    */
   public getAllTva(): Observable<JSON> {
    return this.http.get<JSON>(`http://localhost:3000/tva/`);
  }

}
