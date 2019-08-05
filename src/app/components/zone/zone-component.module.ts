import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZoneAddComponent } from './zone-add/zone-add.component';
import { ZoneViewComponent } from './zone-view/zone-view.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ZoneAddComponent, ZoneViewComponent],
  exports: [ZoneAddComponent, ZoneViewComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ZoneComponentModule { }
