import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatutSrvService {

  private statut;

  constructor(private http: HttpClient) {}

/**
 * Retourne le statut en fonction de l'id passé en paramètre
 * @param id id du statut
 */
public getStatut(id: string): Observable<JSON> {
 // return of(this.statut);
 return this.http.get<JSON>(`http://localhost:3000/statut/${id}`);
}

/**
* Retourne les statuts
*/
public getStatuts(): Observable<JSON> {
  return this.http.get<JSON>(`http://localhost:3000/statut`);
}

/**
 * Bouchon
 */
private setBouchon(): void {
  this.statut = [{
    id: '1',
    titreStatut : 'En cours'
  }];
}

}
