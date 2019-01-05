import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { TelephonePipe } from './pipes/telephone.pipe';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
  declarations: [NavbarComponent, TelephonePipe, LoginPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  exports: [NavbarComponent, LoginPageComponent, TelephonePipe]
})
export class SharedModule { }
