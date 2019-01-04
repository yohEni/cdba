import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CommandeModule } from './commande/commande.module';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SyntheseCdeComponent } from './commande/components/synthese-cde/synthese-cde.component';
import { ContainerCdeComponent } from './commande/components/container-cde/container-cde.component';
import { AjouterCdeComponent } from './commande/components/ajouter-cde/ajouter-cde.component';
import { AjouterClientComponent } from './client/components/ajouter-client/ajouter-client.component';
import { AjouterColisComponent } from './commande/components/ajouter-colis/ajouter-colis.component';
import { DetailColisComponent } from './commande/components/detail-cde/detail-colis/detail-colis.component';
registerLocaleData(localeFr);

const appRoutes: Routes = [
  { path: 'synthese', component: SyntheseCdeComponent },
  { path: 'commande/last', component: ContainerCdeComponent },
  { path: 'commande/detail/:id', component: ContainerCdeComponent },
  { path: 'commande/ajouter', component: AjouterCdeComponent },
  { path: 'colis/detail/:id', component: DetailColisComponent },
  { path: 'colis/ajouter/:id', component: AjouterColisComponent },
  { path: 'client/ajouter', component: AjouterClientComponent },
  { path: '',
    redirectTo: 'commande/last',
    pathMatch: 'full'
  },
  { path: '**', component: SyntheseCdeComponent }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    SharedModule,
    CommandeModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
