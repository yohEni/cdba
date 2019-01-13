import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  private formSubmitAttempt: boolean;
  private logObservable;
  private logSubscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnDestroy() {
    if (!!this.logSubscription) {
      this.logSubscription.unsubscribe();
    }
  }

  /**
   * Vérifie si un champ est invalide
   * @param field nom du champ
   */
  public isFieldInvalid(field: string) {
  return (
    (!this.form.get(field).valid && this.form.get(field).touched) ||
    (this.form.get(field).untouched && this.formSubmitAttempt)
  );
}

  /**
   * Validation du formulaire d'authentification
   */
  private onSubmit(): void {
    if (this.form.valid) {
      this.authService.login(this.form.value);
    }
    this.formSubmitAttempt = true;
  }

}
