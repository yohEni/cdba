import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { AjouterClientComponent } from './components/ajouter-client/ajouter-client.component';

@NgModule({
  declarations: [AjouterClientComponent],
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
