import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CommandeModule } from './commande/commande.module';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from './auth/auth.guard';
import { LoginPageComponent } from './login-page/login-page.component';
import { SyntheseCdeComponent } from './commande/components/synthese-cde/synthese-cde.component';
import { ContainerCdeComponent } from './commande/components/container-cde/container-cde.component';
import { AjouterCdeComponent } from './commande/components/ajouter-cde/ajouter-cde.component';
import { AjouterClientComponent } from './client/components/ajouter-client/ajouter-client.component';
import { AjouterColisComponent } from './commande/components/ajouter-colis/ajouter-colis.component';
import { DetailColisComponent } from './commande/components/detail-cde/detail-colis/detail-colis.component';
import { ContainerClientComponent } from './client/components/container-client/container-client.component';
import { ClientModule } from './client/client.module';
import { AuthService } from './auth/auth.service';
registerLocaleData(localeFr);

const appRoutes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'synthese', component: SyntheseCdeComponent, canActivate: [AuthGuard] },
  { path: 'commande/last', component: ContainerCdeComponent, canActivate: [AuthGuard] },
  { path: 'commande/detail/:id', component: ContainerCdeComponent, canActivate: [AuthGuard] },
  { path: 'commande/ajouter', component: AjouterCdeComponent, canActivate: [AuthGuard] },
  { path: 'colis/detail/:id', component: DetailColisComponent, canActivate: [AuthGuard] },
  { path: 'colis/ajouter/:id', component: AjouterColisComponent, canActivate: [AuthGuard] },
  { path: 'clients', component: ContainerClientComponent, canActivate: [AuthGuard] },
  { path: 'client/ajouter', component: AjouterClientComponent, canActivate: [AuthGuard] },
  { path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: '**', component: LoginPageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    SharedModule,
    CommandeModule,
    ClientModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
