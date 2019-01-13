import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { User } from '../shared/modeles/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private router: Router, private http: HttpClient) { }

  /**
   * Appelle du back pour autoriser ou non la connexion
   * @param user login et mot de passe issu du formulaire d'authentification
   */
  login(user: User): void {
    if (user.login !== '' && user.password !== '' ) {
      /*
      this.http.post<JSON>('http://localhost:3000/login', {login, password}, this.httpOptions)
            // this is just the HTTP call,
            // we still need to handle the reception of the token
            , shareReplay(); // permet d'éviter les envois multiples
      */
      const loginResponse = this.http.post<JSON>('http://localhost:3000/login', user, this.httpOptions);
      loginResponse.subscribe(
        (l) => {
          console.log(l);
          if (!!l && l['idUser']) {
            // TODO : stocker dans localStorage ?
            // TODO : gérer l'erreur d'authent
            this.loggedIn.next(true);
            this.router.navigate(['/commande/last']);
          }
        }, (error) => {
          console.log(error);
        }
      );
    }
  }

  /**
   * Déconnexion
   */
  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
