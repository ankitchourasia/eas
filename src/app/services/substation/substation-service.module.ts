import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubstationService } from './substation.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [SubstationService]
})
export class SubstationServiceModule { }
