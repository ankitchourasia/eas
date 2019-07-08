import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZoneService } from './zone.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [ZoneService]
})
export class ZoneServiceModule { }
