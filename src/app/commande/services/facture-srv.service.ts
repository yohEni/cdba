import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FactureSrvService {

  constructor(private http: HttpClient) { }

  /**
    * Retourne la facture de la ligne commande passée en paramètre
    * @param idCommande id de la ligne commande
    */
   public getFacture(idLigneCommande: string): Observable<JSON> {
    return this.http.get<JSON>(`http://localhost:3000/facture/${idLigneCommande}`);
  }
}
