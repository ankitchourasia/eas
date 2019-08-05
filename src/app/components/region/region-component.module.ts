import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionAddComponent } from './region-add/region-add.component';
import { RegionViewComponent } from './region-view/region-view.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegionAddComponent, RegionViewComponent],
  exports: [RegionAddComponent, RegionViewComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class RegionComponentModule { }
