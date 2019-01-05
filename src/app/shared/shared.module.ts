import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { TelephonePipe } from './pipes/telephone.pipe';

@NgModule({
  declarations: [NavbarComponent, TelephonePipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports: [
    NavbarComponent,
    TelephonePipe,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
