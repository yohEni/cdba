import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PrixSrvService {

  constructor(private http: HttpClient) { }

  /**
    * Retourne le prix
    * @param idPrix id du prix
    */
   public getPrix(idPrix: string): Observable<JSON> {
    return this.http.get<JSON>(`http://localhost:3000/prix/${idPrix}`);
  }

  /**
    * Retourne le prix actif
    */
   public getPrixActif(): Observable<JSON> {
    return this.http.get<JSON>(`http://localhost:3000/prix/actif`);
  }

  /**
    * Retourne tous les prix
    */
   public getAllPrix(): Observable<JSON> {
    return this.http.get<JSON>(`http://localhost:3000/prix/`);
  }

}
