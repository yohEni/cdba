import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { TelephonePipe } from './pipes/telephone.pipe';

@NgModule({
  declarations: [NavbarComponent, TelephonePipe],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports: [NavbarComponent, TelephonePipe]
})
export class SharedModule { }
