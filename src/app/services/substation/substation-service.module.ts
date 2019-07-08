import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SubstationService } from './substation.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [SubstationService]
})
export class SubstationServiceModule { }
