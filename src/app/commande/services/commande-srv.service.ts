import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Clients {
  id: string;
  nom: string;
  prenom: string;
  adresse: string;
  codePostal: string;
  ville: string;
  telephone1: string;
  telephone2: string;
  mail: string;
  aboNewsletter: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommandeSrvService {

  private commande;
  private clients;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  constructor(private http: HttpClient) {

    // Bouchon commande
    this.commande = [{
      id: '1',
      idAnimal : '1',
      dateLivraisonEstimee : '15/01/2019',
      dateLivraisonReelle : null,
      idStatut : '1'
    }];

  }

  /**
   * Retourne la dernière commande crée
   */
  public getLastCommande(): Observable<JSON> {
    return this.http.get<JSON>('http://localhost:3000/commande/last/');
  }

  /**
   * Met à jour la commande
   */
  public updateCommande(commande: JSON): Observable<JSON> {
    return this.http.put<JSON>('http://localhost:3000/commande/', commande, this.httpOptions);
  }

  /**
   * Ajoute la commande
   * @param commande commande en JSON
   */
  public addCommande(commande: JSON): Observable<JSON> {
    return this.http.post<JSON>('http://localhost:3000/commande/', commande, this.httpOptions);
  }
}
