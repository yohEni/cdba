import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public user;

  constructor() { }

  ngOnInit() {
    this.user = {
      'login': undefined,
      'password': undefined
    };
  }

  /**
   * Validation du formulaire d'authentification
   */
  private onSubmit(): void {
    console.log(this.user);
  }

}
