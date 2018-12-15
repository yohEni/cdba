import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { TelephonePipe } from './pipes/telephone.pipe';

@NgModule({
  declarations: [NavbarComponent, TelephonePipe],
  imports: [
    CommonModule
  ],
  exports: [NavbarComponent, TelephonePipe]
})
export class SharedModule { }
