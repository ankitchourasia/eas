import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionAddComponent } from './region-add/region-add.component';
import { RegionViewComponent } from './region-view/region-view.component';

@NgModule({
  declarations: [RegionAddComponent, RegionViewComponent],
  imports: [
    CommonModule
  ]
})
export class RegionComponentModule { }
