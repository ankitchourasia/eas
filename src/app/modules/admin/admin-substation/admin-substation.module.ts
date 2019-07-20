import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSubstationAddComponent } from './admin-substation-add/admin-substation-add.component';
import { AdminSubstationViewComponent } from './admin-substation-view/admin-substation-view.component';
import { SubstationComponentModule } from '@eas-components/substation/substation-component.module';

@NgModule({
  imports: [
    CommonModule,
    SubstationComponentModule,
  ],
  declarations: [
    AdminSubstationAddComponent,
    AdminSubstationViewComponent,
  ],
})
export class AdminSubstationModule { }
