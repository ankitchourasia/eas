import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubstationAddComponent } from './substation-add/substation-add.component';
import { SubstationViewComponent } from './substation-view/substation-view.component';
import { FormsModule } from '@angular/forms';
import { ZoneServiceModule } from '@eas-services/zone/zone-service.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ZoneServiceModule
  ],
  declarations: [SubstationAddComponent, SubstationViewComponent],
  exports: [SubstationAddComponent, SubstationViewComponent]
})
export class SubstationModule { }
