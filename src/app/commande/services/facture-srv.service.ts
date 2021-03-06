import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FactureSrvService {

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  /**
    * Retourne la facture de la ligne commande passée en paramètre
    * @param idCommande id de la ligne commande
    */
   public getFacture(idLigneCommande: string): Observable<JSON> {
    return this.http.get<JSON>(`http://localhost:3000/facture/${idLigneCommande}`);
  }

  /**
   * Ajoute la facture
   * @param ligneFacture ligneFacture
   */
  public addFacture(ligneFacture: JSON): Observable<JSON> {
    return this.http.post<JSON>(`http://localhost:3000/facture/`, ligneFacture, this.httpOptions);
  }

  /**
   * Modifie la facture existante
   * @param ligneFacture ligneFacture
   */
  public editFacture(ligneFacture: JSON): Observable<JSON> {
    return this.http.put<JSON>(`http://localhost:3000/facture/`, ligneFacture, this.httpOptions);
  }

  /**
   * Suppression de la facture
   * @param id id de la facture à supprimer
   */
  public removeFacture(id: string): Observable<JSON> {
    return this.http.delete<JSON>(`http://localhost:3000/facture/${id}`, this.httpOptions);
  }
}
