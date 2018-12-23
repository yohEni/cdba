import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LigneCommandeSrvService {

  private ligneCommande;

  constructor(private http: HttpClient) {

    // Bouchon ligneCommande
    this.ligneCommande = [{
      id: '1',
      idCommande : '1',
      idClient: '1',
      dateCommande : '28/11/2018 17:00',
      poidsColis : '12',
      poidsColisReel : null,
      cote : '1',
      bourguignonSteakHache : '80',
      bourguignonVrac : '20',
      potAuFeuSteakHache : '80',
      potAuFeuVrac : '20',
      idStatut : '1',
      messageClient : 'test message client',
      commentaire : 'test commentaire'
    }];
   }

   private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

   /**
    * Retourne les lignes de la commande passée en paramètre
    * @param idCommande id de la commande
    */
   public getLignesCommande(idCommande: string): Observable<JSON> {
     // return of(this.ligneCommande);
     return this.http.get<JSON>(`http://localhost:3000/ligneCommande/commande/${idCommande}`);
   }

   /**
    * Ajoute un colis à la commande
    */
   public addLigneCommande(ligneC: JSON): Observable<JSON> {
     return this.http.post<JSON>(`http://localhost:3000/ligneCommande/`, ligneC, this.httpOptions);
   }
}
