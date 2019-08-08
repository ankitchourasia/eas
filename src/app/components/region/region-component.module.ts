import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionAddComponent } from './region-add/region-add.component';
import { RegionViewComponent } from './region-view/region-view.component';
import { FormsModule } from '@angular/forms';
import { DirectiveModule } from '@eas-directives/directive.module';

@NgModule({
  declarations: [RegionAddComponent, RegionViewComponent],
  exports: [RegionAddComponent, RegionViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    DirectiveModule
  ]
})
export class RegionComponentModule { }
