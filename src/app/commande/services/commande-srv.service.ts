import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
    const cde = this.http.get<JSON>('http://localhost:3000/commande/2');
    return cde;
  }
}
