import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { AjouterClientComponent } from './components/ajouter-client/ajouter-client.component';
import { ContainerClientComponent } from './components/container-client/container-client.component';
import { ListeClientComponent } from './components/liste-client/liste-client.component';
import { DetailClientComponent } from './components/detail-client/detail-client.component';

@NgModule({
  declarations: [AjouterClientComponent, ContainerClientComponent, ListeClientComponent, DetailClientComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    SharedModule
  ],
  exports: [
    AjouterClientComponent
  ]
})
export class ClientModule { }
