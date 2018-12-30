import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientSrvService {

  private client;
  private clients;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  /**
   * Retourne le client en fonction de l'id passé en paramètre
   * @param id: string
   */
  public getClient(id: string): Observable<JSON> {
    return this.http.get<JSON>(`http://localhost:3000/client/${id}`);
  }

  /**
   * Retourne les clients
   */
  public getClients(): Observable<JSON> {
    return this.http.get<JSON>('http://localhost:3000/client');
  }

  /**
   * Ajoute un client
   */
  public addClient(client: JSON): Observable<JSON> {
    // TODO : à tester
    return this.http.post<JSON>('http://localhost:3000/client', client, this.httpOptions);
  }
}
