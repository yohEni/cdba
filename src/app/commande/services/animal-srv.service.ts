import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Animal } from '../../shared/modeles/animal.model';

@Injectable({
  providedIn: 'root'
})
export class AnimalSrvService {

  private animal;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  constructor(private http: HttpClient) {

    // Bouchon animal
    this.animal = [{
      id: '1',
      numeroNational : '5612345678',
      poidsEstime : '300',
      poidsReel : null
    }];
  }

  /**
   * Retourne l'animal en fonction de l'id passé en paramètre
   * @param id: string
   */
  public getAnimal(id: string): Observable<Animal[]> {
    return this.http.get<Animal[]>(`http://localhost:3000/animal/${id}`);
  }

  /**
   * Met à jour l'animal
   * @param animal animal en JSON
   */
  public updateAnimal(animal: JSON): Observable<Animal[]> {
    return this.http.put<Animal[]>(`http://localhost:3000/animal/`, animal, this.httpOptions);
  }
}
