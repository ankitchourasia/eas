import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZoneAddComponent } from './zone-add/zone-add.component';
import { ZoneViewComponent } from './zone-view/zone-view.component';
import { FormsModule } from '@angular/forms';
import { DirectiveModule } from '@eas-directives/directive.module';

@NgModule({
  declarations: [ZoneAddComponent, ZoneViewComponent],
  exports: [ZoneAddComponent, ZoneViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    DirectiveModule
  ]
})
export class ZoneComponentModule { }
