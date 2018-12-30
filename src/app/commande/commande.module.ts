import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { SyntheseCdeComponent } from './components/synthese-cde/synthese-cde.component';
import { DetailCdeComponent } from './components/detail-cde/detail-cde.component';
import { DetailColisComponent } from './components/detail-cde/detail-colis/detail-colis.component';
import { AjouterColisComponent } from './components/ajouter-colis/ajouter-colis.component';
import { AjouterCdeComponent } from './components/ajouter-cde/ajouter-cde.component';
import { HistoriqueCdeComponent } from './components/historique-cde/historique-cde.component';
import { CommandeSrvService } from './services/commande-srv.service';
import { AnimalSrvService } from './services/animal-srv.service';
import { LigneCommandeSrvService } from './services/ligne-commande-srv.service';
import { StatutSrvService } from './services/statut-srv.service';
import { ContainerCdeComponent } from './components/container-cde/container-cde.component';
import { ClientModule } from '../client/client.module';

@NgModule({
  declarations: [
    SyntheseCdeComponent,
    DetailCdeComponent,
    DetailColisComponent,
    AjouterColisComponent,
    AjouterCdeComponent,
    HistoriqueCdeComponent,
    ContainerCdeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    SharedModule,
    ClientModule
  ],
  providers: [CommandeSrvService, AnimalSrvService, LigneCommandeSrvService, StatutSrvService],
  exports: [ContainerCdeComponent]
})
export class CommandeModule { }
